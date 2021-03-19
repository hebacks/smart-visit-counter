const WEBPAGE_REGEX = /^\/[a-zA-Z\d][a-zA-Z\d-_?=&+#]*/;

export const isValidWebpage = (input: string): boolean =>
  WEBPAGE_REGEX.test(input);
