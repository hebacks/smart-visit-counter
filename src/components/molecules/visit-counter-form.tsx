import { ChangeEvent, FormEvent, useMemo, useState } from 'react';
import styled from 'styled-components';

import {
  orderByMostUniqueVisits,
  orderByMostVisits,
  PageVisitCount,
  PageVisitsMap,
  parseLogFile,
} from '../../utils';
import { Button, TextareaField, FormError } from '../atoms';
import { WebpageViewCount } from './webpage-view-count';

const Description = styled.p`
  margin-bottom: 20px;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const SubmitButton = styled(Button)`
  align-self: flex-end;
`;

export const VisitCounterForm: React.FC = () => {
  const [logValue, setLogValue] = useState<string>('');
  const [isTouched, setTouched] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [invalidLogEntries, setInvalidLogEntries] = useState<string[]>([]);
  const [pageVisits, setPageVisits] = useState<PageVisitsMap>(new Map());
  const [pagesByMostTotalVisits, setPagesByMostTotalVisits] = useState<
    PageVisitCount[]
  >([]);
  const [pagesByMostUniqueVisits, setPagesByMostUniqueVisits] = useState<
    PageVisitCount[]
  >([]);

  const isInvalid = useMemo(
    () => isTouched && (!logValue || !!invalidLogEntries.length),
    [isTouched, invalidLogEntries, logValue]
  );

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setLogValue(event.target.value);
    const result = parseLogFile(event.target.value);
    setInvalidLogEntries(result.invalidEntries);
    setPageVisits(result.pageVisitsMap);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTouched(true);

    if (!logValue || !!invalidLogEntries.length) return;

    setSubmitted(true);
    setPagesByMostTotalVisits(orderByMostVisits(pageVisits));
    setPagesByMostUniqueVisits(orderByMostUniqueVisits(pageVisits));
  };

  return (
    <section>
      <Description>
        Fill out the field below and press submit to get started!
      </Description>
      <StyledForm onSubmit={handleSubmit}>
        <TextareaField
          value={logValue}
          onChange={handleChange}
          id="logContents"
          placeholder="Enter log contents"
          isValid={!isInvalid}
          label="Log contents"
        />
        {isInvalid && (
          <FormError isEmpty={!logValue} invalidLines={invalidLogEntries} />
        )}
        <SubmitButton type="submit">Calculate</SubmitButton>
      </StyledForm>
      {submitted && !isInvalid && (
        <>
          <WebpageViewCount pageVisitCount={pagesByMostTotalVisits}>
            The most visited pages (total visits no. in a descending order)
          </WebpageViewCount>
          <WebpageViewCount pageVisitCount={pagesByMostUniqueVisits}>
            Pages with most unique visits (in a descending order)
          </WebpageViewCount>
        </>
      )}
    </section>
  );
};
