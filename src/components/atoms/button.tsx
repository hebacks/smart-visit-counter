import styled from 'styled-components';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  block?: boolean;
}

const StyledButton = styled.button`
  padding: 12px 32px;
  background: var(--primary);
  color: var(--white);
  text-transform: uppercase;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  appearance: none;
  transition: 0.3s ease all;

  &:hover,
  &:active,
  &:focus {
    outline: none;
    background: var(--primary-focused);
  }

  &[disabled] {
    background: var(--disabled);

    &:hover,
    &:active,
    &:focus {
      background: var(--disabled);
    }
  }
`;

export const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return <StyledButton {...props}>{children}</StyledButton>;
};
