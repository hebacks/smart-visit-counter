import {
  createAppTestHarness,
  mockValidLog,
  mockInvalidLog,
} from './test-helpers';

describe('App', () => {
  const app = createAppTestHarness();

  beforeEach(() => {
    app.render();
  });

  it('should render expected format guidelines', () => {
    expect(app.expectedFormatGuidelines).toBeInTheDocument();
  });

  it('should render sample valid input', () => {
    expect(app.validLogExample).toBeInTheDocument();
  });

  describe('with valid data filled in', () => {
    beforeEach(() => {
      app.fillLogContents(mockValidLog);
      app.submitForm();
    });

    it('should display list of pages with most visits', () => {
      expect(app.mostVisitsTitle).toBeInTheDocument();
    });

    it('should display list of pages with most unique visits', () => {
      expect(app.mostUniqueVisitsTitle).toBeInTheDocument();
    });

    it('should not display error message', () => {
      expect(() => app.errorMessage).toThrowError(
        /^Unable to find an element/i
      );
    });
  });

  describe('with invalid data filled in', () => {
    beforeEach(() => {
      app.fillLogContents(mockInvalidLog);
      app.submitForm();
    });

    it('should display error message', () => {
      expect(app.errorMessage).toBeInTheDocument();
    });

    it('should not display pages with most visits', () => {
      expect(() => app.mostVisitsTitle).toThrowError(
        /^Unable to find an element/i
      );
    });

    it('should not display pages with most unique visits', () => {
      expect(() => app.mostUniqueVisitsTitle).toThrowError(
        /^Unable to find an element/i
      );
    });
  });
});
