import { isValidIdentifier } from './is-valid-identifier';

describe('isValidIdentifier()', () => {
  it('should return true for a string containing 4 dot-delimited parts, each up to 3 digits long', () => {
    expect(isValidIdentifier('722.247.931.582')).toBe(true);
    expect(isValidIdentifier('1.247.931.582')).toBe(true);
    expect(isValidIdentifier('722.0.931.582')).toBe(true);
    expect(isValidIdentifier('722.247.99.582')).toBe(true);
    expect(isValidIdentifier('722.247.931.1')).toBe(true);
  });

  it('should return false if a string does not contain dot delimiters', () => {
    expect(isValidIdentifier('722-247-931-582')).toBe(false);
    expect(isValidIdentifier('722,247,931,582')).toBe(false);
    expect(isValidIdentifier('722:247:931:582')).toBe(false);
  });

  it('should return false if any part contains anything else than a digit', () => {
    expect(isValidIdentifier('aaa.247.931.1')).toBe(false);
    expect(isValidIdentifier('999.-.931.1')).toBe(false);
  });

  it('should return false if any part contains more than 3 digits', () => {
    expect(isValidIdentifier('1111.247.931.1')).toBe(false);
    expect(isValidIdentifier('999.0000.931.1')).toBe(false);
  });
});
