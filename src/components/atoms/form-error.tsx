import styled from 'styled-components';

interface FormErrorProps {
  isEmpty: boolean;
  invalidLines: string[];
}

export const Error = styled.div`
  margin-top: -14px;
  color: var(--error);
  font-size: var(--font-size-s);
`;

export const FormError: React.FC<FormErrorProps> = ({
  isEmpty,
  invalidLines,
}) => {
  if (isEmpty) return <Error>Field cannot be empty</Error>;

  return (
    <Error>
      The provided data doesn't seem to match the required format (see above).
      Please correct the following log entries:
      <ul>
        {invalidLines.map((line, index) => (
          <li key={`${line}-${index}`}>{line}</li>
        ))}
      </ul>
    </Error>
  );
};
