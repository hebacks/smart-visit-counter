export interface PageVisitCount {
  page: string;
  visits: number;
}

export interface VisitsCount {
  totalVisits: number;
  uniqueVisits: number;
  visitors: Set<string>;
}

export type PageVisitsMap = Map<string, VisitsCount>;
