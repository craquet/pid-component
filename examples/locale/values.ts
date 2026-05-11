export const LOCALE_examples = {
  VALID: 'en-US',
  VALID_ALT: 'de-DE',
  EN_US: 'en-US',
  DE_DE: 'de-DE',
  EN_GB: 'en-GB',
  FR_FR: 'fr-FR',
  INVALID_FREE_TEXT: 'english',
  INVALID_NUMERIC: '123',
  INVALID_EMPTY: '',
} as const;

export type LOCALE_example = typeof LOCALE_examples[keyof typeof LOCALE_examples];
