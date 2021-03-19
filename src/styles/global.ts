import { createGlobalStyle } from 'styled-components';
import { reset } from './reset';
import { cssVariables } from './css-variables';

export const GlobalStyles = createGlobalStyle`
  ${reset}

  ${cssVariables}

  html {
    box-sizing: border-box;
  }

  *, *::before, *::after {
    box-sizing: inherit;
    -webkit-font-smoothing: antialiased;
  }

  body {
    margin: 0;
    font-family: var(--font-family);
    font-size: 14px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;
