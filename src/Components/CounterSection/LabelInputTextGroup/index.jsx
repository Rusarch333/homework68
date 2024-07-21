import React from 'react';
import PropTypes from 'prop-types';
import styles from './LabelInputTextGroup.module.sass';
import { createElementBEMNameByTag } from '../../../utils/utils';

const LabelInputTextGroup = ({
  blockName,
  elementName,
  modifierName,
  textContent = '',
  isContentBefore = true,
  inputTextType = 'number',
  inputValue,
  inputOnChangeCallback,
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
        type={inputTextType}
        value={inputValue}
        onChange={inputOnChangeCallback}
      />
      {isContentBefore ? null : textContent}
    </label>
  );
};

LabelInputTextGroup.propTypes = {
  blockName: PropTypes.string.isRequired,
  elementName: PropTypes.string.isRequired,
  modifierName: PropTypes.string,
  textContent: PropTypes.string,
  isContentBefore: PropTypes.bool,
  inputTextType: PropTypes.string,
  inputValue: PropTypes.number.isRequired,
  inputOnChangeCallback: PropTypes.func.isRequired,
};

export default LabelInputTextGroup;
