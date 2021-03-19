import {
  mockInvalidLog,
  mockValidLog,
  mockPartiallyValidLog,
} from '../test-helpers';
import { parseLogFile } from './parse-log-file';

describe('parseLogFile()', () => {
  describe('with a valid log file', () => {
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
      const result = parseLogFile(mockValidLog);
      expect(result.pageVisitsMap).toEqual(expected);
    });

    it('should return an empty invalidEntries array', () => {
      const result = parseLogFile(mockValidLog);
      expect(result.invalidEntries).toEqual([]);
    });
  });

  describe('with an invalid log file', () => {
    it('should return an empty page visit Map', () => {
      const result = parseLogFile(mockInvalidLog);
      expect(result.pageVisitsMap).toEqual(new Map());
    });

    it('should return all invalid lines inside invalidEntry array', () => {
      const result = parseLogFile(mockInvalidLog);
      expect(result.invalidEntries).toEqual([
        'abcdefgh',
        '/home 99999999',
        'home 123.123.123.123',
      ]);
    });
  });

  describe('with a partially valid log file', () => {
    it('should return a page visit Map containing all valid information', () => {
      const result = parseLogFile(mockPartiallyValidLog);
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
      const result = parseLogFile(mockPartiallyValidLog);
      expect(result.invalidEntries).toEqual(['/home 99999999']);
    });
  });
});
