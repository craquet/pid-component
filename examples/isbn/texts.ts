import { ISBN_examples } from './values';

export const isbn_texts = {
  BASIC: `Book ISBN ${ISBN_examples.VALID_13_HYPHENATED}`,
  IN_CONTEXT: `A recommended reference is ${ISBN_examples.VALID_13_HYPHENATED} for distributed systems.`,
  PREFIXED: `Catalog entry: ${ISBN_examples.VALID_13_PREFIXED}.`,
  ISBN10: `Legacy record uses ISBN ${ISBN_examples.VALID_10}.`,
  INVALID_TEXT: `Invalid ISBN sample: ${ISBN_examples.INVALID_13_CHECKSUM}.`,
} as const;

export type isbn_text = typeof isbn_texts[keyof typeof isbn_texts];
