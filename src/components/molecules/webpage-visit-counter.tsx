import { ChangeEvent, FormEvent, useMemo, useState } from 'react';
import { Button } from '../atoms/button';
import { TextareaField } from '../atoms';
import styled from 'styled-components';
import { parseLogFile } from '../../utils';

const Description = styled.p`
  margin-bottom: 20px;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const ErrorList = styled.ul`
  margin-top: -14px;
  color: var(--error);
  font-size: var(--font-size-s);
`;

const SubmitButton = styled(Button)`
  align-self: flex-end;
`;

export const WebpageVisitCounterForm: React.FC = () => {
  const [logValue, setLogValue] = useState<string>('');
  const [isTouched, setTouched] = useState<boolean>(false);
  const [invalidLogEntries, setInvalidLogEntries] = useState<string[]>([]);

  const isInvalid = useMemo(
    () => isTouched && (!logValue || !!invalidLogEntries.length),
    [isTouched, invalidLogEntries, logValue]
  );

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setLogValue(event.target.value);
    const result = parseLogFile(event.target.value);
    setInvalidLogEntries(result.invalidEntries);
  };

  const handleBlur = () => {
    if (logValue) {
      setTouched(true);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTouched(true);
    console.log('hey!');
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
          onBlur={handleBlur}
        />
        {invalidLogEntries.length > 0 && (
          <ErrorList>
            The provided data doesn't seem to match the required format (see
            above). Please correct the following log entries:
            {invalidLogEntries.map((invalidLine, index) => (
              <li key={`${invalidLine}-${index}`}>{invalidLine}</li>
            ))}
          </ErrorList>
        )}
        <SubmitButton type="submit">Calculate</SubmitButton>
      </StyledForm>
    </section>
  );
};
