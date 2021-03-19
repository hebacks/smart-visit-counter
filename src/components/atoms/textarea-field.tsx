import styled from 'styled-components';

interface TextareaFieldProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  isValid: boolean;
}

const StyledTextarea = styled.textarea<{ isValid: boolean }>`
  max-width: 100%;
  min-height: 100px;
  margin-bottom: 20px;
  padding: 10px;
  font-family: var(--font-family);
  font-size: var(--font-size-m);
  background: var(--background-light);
  border: ${({ isValid }) =>
    `2px solid ${isValid ? 'transparent' : 'var(--error)'}`};
  border-radius: 4px;
  resize: vertical;
  transition: 0.3s ease all;

  &:focus {
    border: 2px solid var(--primary);
    outline: none;
    box-shadow: none;
    transition: 0.3s ease all;
  }
`;

const StyledLabel = styled.label<{ isValid: boolean }>`
  display: block;
  margin-bottom: 10px;
  color: ${({ isValid }) => (isValid ? 'var(--black)' : 'var(--error)')};
  font-weight: 600;
`;

export const TextareaField: React.FC<TextareaFieldProps> = ({
  label,
  isValid,
  id,
  ...props
}) => (
  <>
    <StyledLabel htmlFor={id} isValid={isValid}>
      {label}
    </StyledLabel>
    <StyledTextarea isValid={isValid} id={id} {...props} />
  </>
);
