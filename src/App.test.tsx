import React from 'react';
import { render, screen } from '@testing-library/react';
import { App } from './App';

it('renders sample valid input', () => {
  render(<App />);
  const text = screen.getByText(
    /An example valid input could look like below/i
  );
  expect(text).toBeInTheDocument();
});
