import '@testing-library/jest-dom';
import capitalize from './capitalize';

describe('capitalize', () => {
  it('capitalize a string', () => {
    expect(capitalize('test')).toEqual('Test');
  });
});
