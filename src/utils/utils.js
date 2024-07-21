import CONSTANTS from '../constants';

const { MIN_COUNT_RANGE, MAX_COUNT_RANGE } = CONSTANTS;

const handle_PREFIX = `handle`;

export const createElementBEMNameByTag = (
  blockName,
  tagName,
  elementName,
  modifierName
) => {
  const blockElementName = blockName + '__' + tagName + '-' + elementName;
  return modifierName === null
    ? blockElementName
    : blockElementName + '--' + modifierName;
};

export const makeFirstLetterUppercase = (word) =>
  word.charAt(0).toUpperCase() + word.slice(1);

export const makeHandlerNameByHandleValue = (value) =>
  handle_PREFIX + makeFirstLetterUppercase(value);

export const doActionIfValueInRange = (
  value,
  doAction,
  minCountRange = MIN_COUNT_RANGE,
  maxCountRange = MAX_COUNT_RANGE
) => {
  if (value >= minCountRange && value <= maxCountRange) {
    doAction(value);
  }
};

export const normalizeValueInRange = (
  value,
  minCountRange = MIN_COUNT_RANGE,
  maxCountRange = MAX_COUNT_RANGE
) => {
  if (value <= minCountRange) {
    return minCountRange;
  }
  if (value >= maxCountRange) {
    return maxCountRange;
  } else {
    return value;
  }
};
