export interface VisitsCount {
  totalVisits: number;
  uniqueVisits: number;
  visitors: Set<string>;
}

export type PageVisitsMap = Map<string, VisitsCount>;

export const parseLogFile = (text: string): PageVisitsMap => {
  const pageVisitsMap: PageVisitsMap = new Map();

  const lines = text.split('\n');

  lines.forEach((line) => {
    if (!line.trim()) return;

    const [page, visitorId] = line.trim().split(' ');

    if (!pageVisitsMap.has(page)) {
      // @todo: add validation
      if (!visitorId) return;

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

  return pageVisitsMap;
};
