const IDENTIFIER_REGEX = /^(\d{1,3}\.){3}\d{1,3}$/;

export const isValidIdentifier = (input: string): boolean =>
  IDENTIFIER_REGEX.test(input);
