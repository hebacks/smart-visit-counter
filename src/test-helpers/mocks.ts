export const mockValidLog = `
  /help_page/1 126.318.035.038
  /help_page/1 929.398.951.889
  /help_page/1 929.398.951.889
  /contact 184.123.665.067
  /contact 184.123.665.067
  /home 184.123.665.067
  /home 929.398.951.889
`;

export const mockInvalidLog = `
  abcdefgh
  /home 99999999
  home 123.123.123.123
`;

export const mockPartiallyValidLog = `
/help_page/1 126.318.035.038
/help_page/1 929.398.951.889
/help_page/1 929.398.951.889
/home 99999999
`;
