import { isValidWebpage } from './is-valid-webpage';

describe('isValidWebpage()', () => {
  it('should return true for a matching string starting with "/"', () => {
    expect(isValidWebpage('/page')).toBe(true);
    expect(isValidWebpage('/some_page')).toBe(true);
    expect(isValidWebpage('/some-page')).toBe(true);
    expect(isValidWebpage('/page2')).toBe(true);
  });

  it('should return true for a matching string containing subpages', () => {
    expect(isValidWebpage('/page/subpage')).toBe(true);
  });

  it('should return false for a string starting with an invalid character', () => {
    expect(isValidWebpage('/-page')).toBe(false);
    expect(isValidWebpage('page')).toBe(false);
  });

  it('should return false for a string containing invalid character', () => {
    expect(isValidWebpage('/-page')).toBe(false);
    expect(isValidWebpage('page')).toBe(false);
  });
});
