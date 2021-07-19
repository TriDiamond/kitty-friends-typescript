import searchReducer, { SearchState, setSearchField } from './searchSlice';

describe('search reducer', () => {
  const initialState: SearchState = {
    searchField: '',
  };

  test('should handle inital state', () => {
    expect(searchReducer(undefined, { type: 'unknown' })).toEqual({
      searchField: '',
    });
  });

  test('should handle setSearchField', () => {
    const actual = searchReducer(initialState, setSearchField('hello'));
    expect(actual.searchField).toEqual('hello');
  });
});
