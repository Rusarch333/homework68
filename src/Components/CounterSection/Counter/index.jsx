import React from 'react';
import PropTypes from 'prop-types';
import LabeledInput from '../LabeledInput';
import styles from './Counter.module.sass';
import { normalizeValueInRange } from '../../../utils/utils';
import CONSTANTS from '../../../constants';

const { MIN_COUNT_RANGE, INITIAL_STEP_VALUE, INITIAL_ISADD_FLAG_VALUE } =
  CONSTANTS;

const Counter = ({
  count = MIN_COUNT_RANGE,
  setCount,
  isAdd = INITIAL_ISADD_FLAG_VALUE,
  setIsAdd,
  step = INITIAL_STEP_VALUE,
}) => {
  const handleClickOperationButton = () => {
    const newCount = isAdd ? count + step : count - step;
    setCount(normalizeValueInRange(newCount));
  };

  const handleClickChangeMode = () => {
    setIsAdd(!isAdd);
  };

  return (
    <article className={styles['counter']}>
      {/* 1 */}
      <h2 className={styles['counter__heading']}>{count}</h2>

      {/* [ Add/Sub ] */}
      <button
        className={styles['counter__button-operation']}
        onClick={handleClickOperationButton}
      >
        {isAdd ? 'Add' : 'Sub'}
      </button>

      {/* [V] Change mode*/}
      <LabeledInput
        blockName="counter"
        elementName={'change-mode'}
        type="checkbox"
        textContent={'Change mode'}
        isContentBefore={false}
        checked={isAdd}
        onChange={handleClickChangeMode}
      />
    </article>
  );
};

Counter.propTypes = {
  count: PropTypes.number,
  setCount: PropTypes.func.isRequired,
  isAdd: PropTypes.bool,
  setIsAdd: PropTypes.func.isRequired,
  step: PropTypes.number,
};

export default Counter;
