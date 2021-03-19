import { parseLogFile } from './parse-log-file';

describe('parseLogFile()', () => {
  it('should extract number of unique and total visits per page from a valid log file', () => {
    const mockLogFile = `
      /help_page/1 126.318.035.038
      /help_page/1 929.398.951.889
      /help_page/1 929.398.951.889
      /contact 184.123.665.067
      /contact 184.123.665.067
      /home 184.123.665.067
      /home 929.398.951.889
    `;

    const expected = new Map([
      [
        '/help_page/1',
        {
          totalVisits: 3,
          uniqueVisits: 2,
          visitors: new Set(['126.318.035.038', '929.398.951.889']),
        },
      ],
      [
        '/contact',
        {
          totalVisits: 2,
          uniqueVisits: 1,
          visitors: new Set(['184.123.665.067']),
        },
      ],
      [
        '/home',
        {
          totalVisits: 2,
          uniqueVisits: 2,
          visitors: new Set(['184.123.665.067', '929.398.951.889']),
        },
      ],
    ]);

    expect(parseLogFile(mockLogFile)).toEqual(expected);
  });

  it('should return an empty Map for an invalid log file', () => {
    expect(parseLogFile('abcdefgh')).toEqual(new Map());
  });
});
