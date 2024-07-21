import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LabelInputTextGroup from '../LabelInputTextGroup';
import styles from './AutoClicker.module.sass';
import CONSTANTS from '../../../constants';
import {
  normalizeValueInRange,
  makeHandlerNameByHandleValue,
} from '../../../utils/utils';

const {
  MIN_COUNT_RANGE,
  INITIAL_STEP_VALUE,
  INITIAL_ISADD_FLAG_VALUE,
  AUTOCLICKER_WORK_TIME_MODIFIER,
  AUTOCLICK_LABEL_INPUT_TEXT_GROUPS,
  AUTOCLICK_BUTTONS,
  AUTOCLICKER_WORK_TIME_MODIFIER_MS,
  MIN_AUTOCLICKER_TIME_RANGE, // In seconds
  MAX_AUTOCLICKER_TIME_RANGE,
  MIN_AUTOCLICKER_FREQUENCY_RANGE, // In seconds
  MAX_AUTOCLICKER_FREQUENCY_RANGE,
  AUTOCLICKER_INITIAL_ZERO_TIME,
} = CONSTANTS;

class AutoClicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      autoClickMaxTime: 5,
      autoClickFrequency: MIN_AUTOCLICKER_FREQUENCY_RANGE,
      autoClickCurrentTime: AUTOCLICKER_INITIAL_ZERO_TIME,
      isAutoclickerNeedReset: false,
    };
    this.autoclickerFrequencyInterval = null;
    this.nextClickTime = AUTOCLICKER_INITIAL_ZERO_TIME;
  }

  componentDidMount() {
    this.handleAutoClickStart();
  }

  handleAutoClickMaxTime = ({ target: { value } }) => {
    this.setState({
      autoClickMaxTime: normalizeValueInRange(
        Number(value),
        MIN_AUTOCLICKER_TIME_RANGE,
        MAX_AUTOCLICKER_TIME_RANGE
      ),
    });
  };

  handleAutoClickFrequency = ({ target: { value } }) => {
    this.setState({
      autoClickFrequency: normalizeValueInRange(
        Number(value),
        MIN_AUTOCLICKER_FREQUENCY_RANGE,
        MAX_AUTOCLICKER_FREQUENCY_RANGE
      ),
    });
  };

  handleAutoClickStart = () => {
    // Виконуємо код обробника, тільки якщо автоклікер зараз зупинений ("stoped")!
    if (this.autoclickerFrequencyInterval === null) {
      const {
        autoClickCurrentTime,
        autoClickMaxTime,
        autoClickFrequency,
        isAutoclickerNeedReset,
      } = this.state;

      console.log(isAutoclickerNeedReset);

      let newAutoClickCurrentTime;

      if (isAutoclickerNeedReset) {
        newAutoClickCurrentTime = AUTOCLICKER_INITIAL_ZERO_TIME;
        this.setState((state, props) => ({
          autoClickCurrentTime: newAutoClickCurrentTime,
          isAutoclickerNeedReset: !isAutoclickerNeedReset,
        }));
        // Вираховуємо час до наступного кліку (відповідно від встановленої частоти кліків)
        this.nextClickTime = autoClickFrequency;
      } else {
        newAutoClickCurrentTime = autoClickCurrentTime;
      }

      console.log(autoClickCurrentTime);

      // Запускаємо інтервали автоклікеру, по-замовчуванню 1 інтервал - це 1 секунда
      this.autoclickerFrequencyInterval = setInterval(() => {
        // Збільшуємо поточний час роботи автоклікера
        newAutoClickCurrentTime += AUTOCLICKER_WORK_TIME_MODIFIER;
        this.setState((state, props) => ({
          autoClickCurrentTime: newAutoClickCurrentTime,
        }));

        console.log('newAutoClickCurrentTime', newAutoClickCurrentTime);
        console.log('nextClickTime', this.nextClickTime);

        // Код в умові виконується, якщо настав час зробити клік, згідно частоти кліків
        if (newAutoClickCurrentTime === this.nextClickTime) {
          // Розраховуємо час наступного кліку
          this.nextClickTime += autoClickFrequency;

          const { count, setCount, isAdd, step } = this.props;

          // Розраховуємо та оновлюємо значення лічильника
          const newCount = isAdd ? count + step : count - step;
          setCount(normalizeValueInRange(newCount));
        }

        // Перевіряємо чи потрібно запускати наступний часовий інтервал
        // Якщо ні, то оброблюємо цей випадок
        if (newAutoClickCurrentTime + 1 > autoClickMaxTime) {
          this.handleAutoClickStop();
          this.setState((state, props) => ({
            isRunning: false,
          }));
        }
      }, AUTOCLICKER_WORK_TIME_MODIFIER_MS); // End of newAutoclickerFrequencyInterval
    } // End of "if (autoclickerFrequencyInterval)"
  }; // End of handleAutoClickStart

  handleAutoClickStop = () => {
    clearInterval(this.autoclickerFrequencyInterval);
    this.autoclickerFrequencyInterval = null;
  };

  handleAutoClickReset = () => {
    this.handleAutoClickStop();
    this.setState({
      autoClickCurrentTime: AUTOCLICKER_INITIAL_ZERO_TIME,
      isRunning: false,
    });
    const { setCount } = this.props;
    setCount(MIN_COUNT_RANGE);
  };

  componentWillUnmount() {
    this.handleAutoClickStop();
  }

  showAutoclickLabelInputTextGroups = (ITEM, i) => (
    <LabelInputTextGroup
      key={i}
      blockName="auto-click"
      elementName={ITEM.ELEMENT_NAME}
      textContent={'Auto click ' + ITEM.TEXT_CONTENT + ':'}
      isContentBefore={true}
      inputTextType="number"
      inputValue={this.state[ITEM.VALUE_NAME]}
      // Значенням є коллбек обробника, назва якого формується за допомогою функції makeHandlerNameByHandleValue
      // Яка формує назву обробника, на основі назви оброблюємого значення
      inputOnChangeCallback={
        this[makeHandlerNameByHandleValue(ITEM.VALUE_NAME)]
      }
    />
  );

  showAutoclickButtons = (ACTION, i) => (
    <button
      key={i}
      className={
        styles['auto-click__button-auto-click--' + ACTION.toLowerCase()]
      }
      onClick={this['handleAutoClick' + ACTION]}
    >
      {ACTION}
    </button>
  );

  render() {
    const { autoClickCurrentTime } = this.state;

    return (
      <div className={styles['auto-click']}>
        {/* Autoclicker */}
        <span className={styles['auto-click__component-title']}>
          Autoclicker
        </span>

        {/* Auto click max time: (5) */}
        {/* Auto click frequency: (1) */}
        <form className={styles['auto-click__form-params']} action={'#'}>
          {AUTOCLICK_LABEL_INPUT_TEXT_GROUPS.map(
            this.showAutoclickLabelInputTextGroups
          )}
        </form>

        {/* Auto clicker current time: 0 */}
        <span className={styles['auto-click__span-current-time']}>
          Auto clicker current time: {autoClickCurrentTime}
        </span>

        {/* [ Start ] [ Stop ] [ Reset ] */}
        {AUTOCLICK_BUTTONS.map(this.showAutoclickButtons)}
      </div>
    );
  }
}

// Типификация пропсов
AutoClicker.propTypes = {
  count: PropTypes.number,
  setCount: PropTypes.func.isRequired,
  isAdd: PropTypes.bool,
  step: PropTypes.number,
};

// Пропсы по-умолчанию для классового компонента
AutoClicker.defaultProps = {
  count: MIN_COUNT_RANGE,
  step: INITIAL_STEP_VALUE,
  isAdd: INITIAL_ISADD_FLAG_VALUE,
};

export default AutoClicker;
