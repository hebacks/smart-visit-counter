import { PageVisitsMap, VisitsCount } from '../types';
import { isValidIdentifier } from './is-valid-identifier';
import { isValidWebpage } from './is-valid-webpage';

interface ParseLogFileResult {
  pageVisitsMap: PageVisitsMap;
  invalidEntries: string[];
}

export const parseLogFile = (text: string): ParseLogFileResult => {
  const pageVisitsMap: PageVisitsMap = new Map();
  const invalidEntries: string[] = [];

  const lines = text.split('\n');

  lines.forEach((line) => {
    const sanitizedLine = line.trim();
    if (!sanitizedLine) return;

    const [page, visitorId] = sanitizedLine.split(' ');

    if (!isValidWebpage(page) || !isValidIdentifier(visitorId)) {
      invalidEntries.push(sanitizedLine);
      return;
    }

    if (!pageVisitsMap.has(page)) {
      const initialVisitsCount = {
        totalVisits: 1,
        uniqueVisits: 1,
        visitors: new Set([visitorId]),
      };

      pageVisitsMap.set(page, initialVisitsCount);
      return;
    }

    const visitsCount = pageVisitsMap.get(page)!;
    const { totalVisits, uniqueVisits, visitors } = visitsCount;

    const updatedVisitsCount: VisitsCount = {
      totalVisits: totalVisits + 1,
      uniqueVisits: visitors.has(visitorId) ? uniqueVisits : uniqueVisits + 1,
      visitors: visitors.add(visitorId),
    };

    pageVisitsMap.set(page, updatedVisitsCount);
  });

  return {
    pageVisitsMap,
    invalidEntries,
  };
};
