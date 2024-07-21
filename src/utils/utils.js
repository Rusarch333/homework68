/**
 * Утиліта створює БЕМ назву, на основі вхідних параметрів
 * @param {string} blockName - назва блоку із БЕМ
 * @param {string} tagName - назва тегу, складова назви елементу із БЕМ
 * @param {string} elementEntityName - назва сутності елементу, складова назви елементу із БЕМ
 * @param {string} modifierName  - назва модифікатору із БЕМ
 * @returns {string} БЕМ назва створена на основі вхідних параметрів
 */
export const createElementBEMNameByTag = (
  blockName,
  tagName,
  elementEntityName,
  modifierName
) => {
  const blockElementName = blockName + '__' + tagName + '-' + elementEntityName;
  return modifierName === null
    ? blockElementName
    : blockElementName + '--' + modifierName;
};

/**
 * Утиліта приймає слово, та повертає його з великої літери
 * @param {string} word - вхідне слово
 * @returns {string} - вхідне слово з великої літери
 */
export const makeFirstLetterUppercase = (word) =>
  word.charAt(0).toUpperCase() + word.slice(1);

/**
 * Утиліта, яка виконує задану дію, якщо передане значення знаходиться у заданому діапазоні
 * @param {number} value - значення, яке треба перевірити, щодо відповідності до діапазону
 * @param {function} doAction - дія, яку треба виконати при виконанні умови
 * @param {number} minValueRange - мінімальне значення діапазону
 * @param {number} maxValueRange - максимальне значення діапазону
 */
export const doActionIfValueInRange = (
  value,
  doAction,
  minValueRange,
  maxValueRange
) => {
  if (value >= minValueRange && value <= maxValueRange) {
    doAction(value);
  }
};

/**
 * Утиліта, яка нормалізує вхідне значення, якщо воно виходить за заданий діапазон
 * @param {number} value - значення, яке треба перевірити, щодо відповідності до діапазону
 * @param {number} minValueRange - мінімальне значення діапазону
 * @param {number} maxValueRange - максимальне значення діапазону
 * @returns {number} minValueRange - при умові, що: (value <= minValueRange)
 * @returns {number} maxValueRange - при умові, що: (value >= maxValueRange)
 * @returns {number} value - при умові, що значення у заданому діапазоні
 */
export const normalizeValueInRange = (value, minValueRange, maxValueRange) => {
  if (value <= minValueRange) {
    return minValueRange;
  }
  if (value >= maxValueRange) {
    return maxValueRange;
  } else {
    return value;
  }
};
