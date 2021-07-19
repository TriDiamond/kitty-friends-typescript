import { store } from '../../app/store';
import kittyReducer, { getKittiesAsync } from './kittySlice';

describe('kitty reducer', () => {
  test('should handle initial state', () => {
    expect(kittyReducer(undefined, { type: 'unknow' })).toEqual({
      isPending: false,
      kitties: [],
      error: '',
    });
  });

  test('should successfully fetch kitty API', async () => {
    const payload = [
      {
        id: 1,
        name: 'Test',
        email: 'test.@gmail.com',
      },
    ];

    fetchMock.mockResponseOnce(JSON.stringify(payload));
    const response = await store.dispatch(getKittiesAsync());
    expect(response.payload).toEqual(payload);
  });

  test('should fail to fetch kitty API', async () => {
    fetchMock.mockReject();
    const response = await store.dispatch(getKittiesAsync());
    expect(response.payload).toEqual('Something went wrong.');
  });
});
