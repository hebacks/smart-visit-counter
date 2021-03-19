import styled from 'styled-components';
import { PageVisitCount } from '../../utils';

const ListWrapper = styled.div`
  margin-bottom: 20px;
`;

const ListHeading = styled.p`
  margin-bottom: 10px;
  color: var(--primary);
  font-weight: 600;
`;

const ColumnHeading = styled.span`
  display: inline-block;
  min-width: 100px;
  font-weight: 600;
  margin-bottom: 10px;
`;

const Cell = styled.span`
  display: inline-block;
  min-width: 100px;
`;

export const WebpageViewCount: React.FC<{
  pageVisitCount: PageVisitCount[];
}> = ({ pageVisitCount, children }) => (
  <ListWrapper>
    <ListHeading>{children}</ListHeading>
    <ColumnHeading>Page</ColumnHeading>
    <ColumnHeading>Visits</ColumnHeading>
    <ul>
      {pageVisitCount.map(({ page, visits }) => (
        <li key={page}>
          <Cell>{page}</Cell>
          <Cell>{visits} visits</Cell>
        </li>
      ))}
    </ul>
  </ListWrapper>
);
