import { parseLogFile } from './parse-log-file';

describe('parseLogFile()', () => {
  describe('with a valid log file', () => {
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

    it('should return a number of unique and total visits per page', () => {
      const result = parseLogFile(mockLogFile);
      expect(result.pageVisitsMap).toEqual(expected);
    });

    it('should return an empty invalidEntries array', () => {
      const result = parseLogFile(mockLogFile);
      expect(result.invalidEntries).toEqual([]);
    });
  });

  describe('with an invalid log file', () => {
    const invalidLog = `
      abcdefgh
      /home 99999999
      home 123.123.123.123
    `;

    it('should return an empty page visit Map', () => {
      const result = parseLogFile(invalidLog);
      expect(result.pageVisitsMap).toEqual(new Map());
    });

    it('should return all invalid lines inside invalidEntry array', () => {
      const result = parseLogFile(invalidLog);
      expect(result.invalidEntries).toEqual([
        'abcdefgh',
        '/home 99999999',
        'home 123.123.123.123',
      ]);
    });
  });

  describe('with a partially valid log file', () => {
    const partiallyValidLog = `
      /help_page/1 126.318.035.038
      /help_page/1 929.398.951.889
      /help_page/1 929.398.951.889
      /home 99999999
    `;

    it('should return a page visit Map containing all valid information', () => {
      const result = parseLogFile(partiallyValidLog);
      const expected = new Map([
        [
          '/help_page/1',
          {
            totalVisits: 3,
            uniqueVisits: 2,
            visitors: new Set(['126.318.035.038', '929.398.951.889']),
          },
        ],
      ]);
      expect(result.pageVisitsMap).toEqual(expected);
    });

    it('should return all invalid lines inside invalidEntry array', () => {
      const result = parseLogFile(partiallyValidLog);
      expect(result.invalidEntries).toEqual(['/home 99999999']);
    });
  });
});
