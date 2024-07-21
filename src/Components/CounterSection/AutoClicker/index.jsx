import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LabeledInput from '../LabeledInput';
import styles from './AutoClicker.module.sass';
import CONSTANTS from '../../../constants';
import CONSTANTS_AUTOCLICKER from './constants';
import {
  makeFirstLetterUppercase,
  normalizeValueInRange,
} from '../../../utils/utils';

const {
  MIN_COUNT_RANGE,
  MAX_COUNT_RANGE,
  INITIAL_STEP_VALUE,
  INITIAL_ISADD_FLAG_VALUE,
} = CONSTANTS;

const {
  MIN_AUTOCLICKER_TIME_RANGE, // In seconds
  MAX_AUTOCLICKER_TIME_RANGE,
  MIN_AUTOCLICKER_FREQUENCY_RANGE, // In seconds
  MAX_AUTOCLICKER_FREQUENCY_RANGE,
  AUTOCLICKER_INITIAL_ZERO_TIME,
  AUTOCLICK_LABEL_INPUT_TEXT_GROUPS,
  AUTOCLICK_BUTTONS,
  AUTOCLICKER_WORK_TIME_MODIFIER,
  AUTOCLICKER_WORK_TIME_MODIFIER_MS,
} = CONSTANTS_AUTOCLICKER;

class AutoClicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      autoClickMaxTime: 5,
      autoClickFrequency: MIN_AUTOCLICKER_FREQUENCY_RANGE,
      autoClickCurrentTime: AUTOCLICKER_INITIAL_ZERO_TIME,
      isAutoclickerReseted: true,
    };
    this.autoclickerFrequencyInterval = null;
    this.nextClickTime = AUTOCLICKER_INITIAL_ZERO_TIME;
  }

  componentDidMount() {
    this.handleAutoClickStart();
  }

  handleChangeAutoClickMaxTime = ({ target: { value } }) => {
    this.setState({
      autoClickMaxTime: normalizeValueInRange(
        Number(value),
        MIN_AUTOCLICKER_TIME_RANGE,
        MAX_AUTOCLICKER_TIME_RANGE
      ),
    });
  };

  handleChangeAutoClickFrequency = ({ target: { value } }) => {
    this.setState({
      autoClickFrequency: normalizeValueInRange(
        Number(value),
        MIN_AUTOCLICKER_FREQUENCY_RANGE,
        MAX_AUTOCLICKER_FREQUENCY_RANGE
      ),
    });
  };

  handleAutoClickStart = () => {
    // Виконуємо код обробника, тільки якщо автоклікер зараз зупинений!
    if (this.autoclickerFrequencyInterval === null) {
      const {
        autoClickCurrentTime,
        autoClickMaxTime,
        autoClickFrequency,
        isAutoclickerReseted,
      } = this.state;

      let newAutoClickCurrentTime;

      if (isAutoclickerReseted) {
        newAutoClickCurrentTime = AUTOCLICKER_INITIAL_ZERO_TIME;
        this.setState((state, props) => ({
          autoClickCurrentTime: newAutoClickCurrentTime,
          isAutoclickerReseted: !isAutoclickerReseted,
        }));
        // Вираховуємо час до наступного кліку (відповідно від встановленої частоти кліків)
        this.nextClickTime = autoClickFrequency;
      } else {
        newAutoClickCurrentTime = autoClickCurrentTime;
      }

      // Запускаємо інтервали автоклікеру, по-замовчуванню 1 інтервал - це 1 секунда
      this.autoclickerFrequencyInterval = setInterval(() => {
        // Збільшуємо поточний час роботи автоклікера
        newAutoClickCurrentTime += AUTOCLICKER_WORK_TIME_MODIFIER;
        this.setState((state, props) => ({
          autoClickCurrentTime: newAutoClickCurrentTime,
        }));

        // Код в умові виконується, якщо настав час зробити клік, згідно частоти кліків
        if (newAutoClickCurrentTime === this.nextClickTime) {
          // Розраховуємо час наступного кліку
          this.nextClickTime += autoClickFrequency;

          const { count, setCount, isAdd, step } = this.props;

          // Розраховуємо та оновлюємо значення лічильника
          const newCount = isAdd ? count + step : count - step;
          setCount(
            normalizeValueInRange(newCount, MIN_COUNT_RANGE, MAX_COUNT_RANGE)
          );
        }

        // Перевіряємо чи потрібно запускати наступний часовий інтервал
        // Якщо ні, то оброблюємо цей випадок
        if (newAutoClickCurrentTime + 1 > autoClickMaxTime) {
          this.handleAutoClickStop();
          this.setState((state, props) => ({
            isAutoclickerReseted: true,
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
      isAutoclickerReseted: true,
    });
    const { setCount } = this.props;
    setCount(MIN_COUNT_RANGE);
  };

  componentWillUnmount() {
    this.handleAutoClickStop();
  }

  showAutoclickLabelInputTextGroups = (ITEM, i) => (
    <LabeledInput
      key={i}
      blockName="auto-click"
      elementName={ITEM.ELEMENT_NAME}
      type="number"
      textContent={'Auto click ' + ITEM.TEXT_CONTENT + ':'}
      isContentBefore={true}
      value={this.state[ITEM.VALUE_NAME]}
      onChange={
        this['handleChange' + makeFirstLetterUppercase(ITEM.VALUE_NAME)]
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
