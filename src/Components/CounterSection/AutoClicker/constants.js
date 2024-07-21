const CONSTANTS = {
  MIN_AUTOCLICKER_TIME_RANGE: 1, // In seconds
  MAX_AUTOCLICKER_TIME_RANGE: 1000,
  MIN_AUTOCLICKER_FREQUENCY_RANGE: 1, // In seconds
  MAX_AUTOCLICKER_FREQUENCY_RANGE: 1000,
  AUTOCLICKER_INITIAL_ZERO_TIME: 0,
  AUTOCLICK_LABEL_INPUT_TEXT_GROUPS: [
    {
      ELEMENT_NAME: 'max-time',
      TEXT_CONTENT: 'max time',
      VALUE_NAME: 'autoClickMaxTime',
    },
    {
      ELEMENT_NAME: 'frequency',
      TEXT_CONTENT: 'frequency',
      VALUE_NAME: 'autoClickFrequency',
    },
  ],
  AUTOCLICK_BUTTONS: ['Start', 'Stop', 'Reset'],
  AUTOCLICKER_WORK_TIME_MODIFIER: 1,
};

CONSTANTS.AUTOCLICKER_WORK_TIME_MODIFIER_MS =
  CONSTANTS.AUTOCLICKER_WORK_TIME_MODIFIER * 1000;

export default CONSTANTS;
