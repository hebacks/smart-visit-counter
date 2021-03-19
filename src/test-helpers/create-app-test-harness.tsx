import { fireEvent, render, screen } from '@testing-library/react';
import { App } from '../App';

export const createAppTestHarness = () => ({
  render: () => {
    render(<App />);
  },

  get validLogExample() {
    return screen.getByText(/An example valid input could look like this/i);
  },

  get expectedFormatGuidelines() {
    const [element] = screen.getAllByText("/[page] [visitor's id]");
    return element;
  },

  get logContentsField() {
    return screen.getByLabelText(/^Log contents$/i);
  },

  get submitButton() {
    return screen.getByText(/^calculate$/i);
  },

  get errorMessage() {
    return screen.getByText(/Please correct the following log entries/i);
  },

  get successMessage() {
    // @todo: to be replaced
    return screen.getByText(/^success$/i);
  },

  fillLogContents(value: string) {
    fireEvent.change(this.logContentsField, { target: { value } });
  },

  submitForm() {
    fireEvent.click(this.submitButton);
  },
});
