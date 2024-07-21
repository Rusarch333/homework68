import React from 'react';
import PropTypes from 'prop-types';
import LabelInputTextGroup from '../LabelInputTextGroup';
import styles from './CounterControl.module.sass';
import { doActionIfValueInRange } from '../../../utils/utils';
import CONSTANTS from '../../../constants';

const { INITIAL_STEP_VALUE } = CONSTANTS;

const ControlCounter = ({ step = INITIAL_STEP_VALUE, setStep }) => {
  const handleStep = ({ target: { value } }) => {
    doActionIfValueInRange(Number(value), setStep);
  };

  const COMPONENT_NAME = 'control-counter';

  return (
    <div className={styles[COMPONENT_NAME]}>
      {/* Step: 1 (1) */}
      <LabelInputTextGroup
        blockName={COMPONENT_NAME}
        elementName="step"
        textContent={'Step: ' + step}
        isContentBefore={true}
        inputTextType="number"
        inputValue={step}
        inputOnChangeCallback={handleStep}
      />
    </div>
  );
};

ControlCounter.propTypes = {
  step: PropTypes.number,
  setStep: PropTypes.func.isRequired,
};

export default ControlCounter;
