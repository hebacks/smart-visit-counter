import React from 'react';
import { render, screen } from '@testing-library/react';
import { App } from './App';

test('renders dummy text', () => {
  render(<App />);
  const text = screen.getByText(/Hello/i);
  expect(text).toBeInTheDocument();
});
