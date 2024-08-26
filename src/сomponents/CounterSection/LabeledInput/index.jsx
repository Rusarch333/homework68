import React from 'react';
import PropTypes from 'prop-types';
import styles from './LabeledInput.module.sass';
import { createElementBEMNameByTag } from '../../../utils/utils';

const LabeledInput = ({
  blockName,
  elementName,
  modifierName = null,
  textContent = '',
  isContentBefore = true,
  ...props
}) => {
  const LABEL_TAG_NAME = 'label';
  const INPUT_TAG_NAME = 'input';
  const labelBEMName = createElementBEMNameByTag(
    blockName,
    LABEL_TAG_NAME,
    elementName,
    modifierName
  );
  const inputBEMName = createElementBEMNameByTag(
    blockName,
    INPUT_TAG_NAME,
    elementName,
    modifierName
  );
  return (
    <label className={styles[labelBEMName]} htmlFor={inputBEMName}>
      {isContentBefore ? textContent : null}
      <input
        className={styles[inputBEMName]}
        id={inputBEMName}
        name={inputBEMName}
        {...props}
      />
      {isContentBefore ? null : textContent}
    </label>
  );
};

LabeledInput.propTypes = {
  blockName: PropTypes.string.isRequired,
  elementName: PropTypes.string.isRequired,
  modifierName: PropTypes.string,
  textContent: PropTypes.string,
  isContentBefore: PropTypes.bool,
};

export default LabeledInput;
