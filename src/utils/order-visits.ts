import { PageVisitsMap } from './parse-log-file';

export interface PageVisitCount {
  page: string;
  visits: number;
}

export const orderByMostVisits = (
  pageVisits: PageVisitsMap
): PageVisitCount[] => {
  return [...pageVisits.entries()]
    .sort((a, b) => b[1].totalVisits - a[1].totalVisits)
    .map(([page, { totalVisits }]) => ({ page, visits: totalVisits }));
};

export const orderByMostUniqueVisits = (
  pageVisits: PageVisitsMap
): PageVisitCount[] =>
  [...pageVisits.entries()]
    .sort((a, b) => b[1].uniqueVisits - a[1].uniqueVisits)
    .map(([page, { uniqueVisits }]) => ({ page, visits: uniqueVisits }));
