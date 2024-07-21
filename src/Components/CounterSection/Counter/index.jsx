import React from 'react';
import PropTypes from 'prop-types';
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
  const handleCount = () => {
    const newCount = isAdd ? count + step : count - step;
    setCount(normalizeValueInRange(newCount));
  };

  const handleChangeMode = () => {
    setIsAdd(!isAdd);
  };

  const INPUT_CHANGE_MODE_NAME = 'change-mode';

  return (
    <article className={styles['counter']}>
      {/* 1 */}
      <h2 className={styles['counter__heading']}>{count}</h2>

      {/* [ Add/Sub ] */}
      <button
        className={styles['counter__button-operation']}
        onClick={handleCount}
      >
        {isAdd ? 'Add' : 'Sub'}
      </button>

      {/* [V] Change mode*/}
      <label
        className={styles['counter__label-change-mode']}
        htmlFor={INPUT_CHANGE_MODE_NAME}
      >
        <input
          id={INPUT_CHANGE_MODE_NAME}
          name={INPUT_CHANGE_MODE_NAME}
          type="checkbox"
          checked={isAdd}
          onChange={handleChangeMode}
        />
        Change mode
      </label>
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
