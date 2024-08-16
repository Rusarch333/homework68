import React from 'react';
import PropTypes from 'prop-types';
import styles from './CounterControl.module.sass';
import { doActionIfValueInRange } from '../../../utils/utils';
import LabeledInput from '../LabeledInput';
import CONSTANTS from '../../../constants';

const { MIN_COUNT_RANGE, MAX_COUNT_RANGE, INITIAL_STEP_VALUE } = CONSTANTS;

const ControlCounter = ({ step = INITIAL_STEP_VALUE, setStep }) => {
  const handleChangeStep = ({ target: { value } }) => {
    doActionIfValueInRange(
      Number(value),
      setStep,
      MIN_COUNT_RANGE,
      MAX_COUNT_RANGE
    );
  };

  const COMPONENT_NAME = 'control-counter';

  return (
    <div className={styles[COMPONENT_NAME]}>
      {/* Step: 1 (1) */}
      <LabeledInput
        blockName={COMPONENT_NAME}
        elementName="step"
        type="number"
        textContent={'Step: ' + step}
        isContentBefore={true}
        value={step}
        onChange={handleChangeStep}
      />
    </div>
  );
};

ControlCounter.propTypes = {
  step: PropTypes.number,
  setStep: PropTypes.func.isRequired,
};

export default ControlCounter;
