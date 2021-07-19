import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import Home from './Home';

describe('home component', () => {
  const data = [
    {
      id: 1,
      name: 'Cathy Lee',
      email: 'catchy_lee@gmail.com',
    },
    {
      id: 2,
      name: 'Katy Lee',
      email: 'katy_lee@gmail.com',
    },
    {
      id: 3,
      name: 'Bruce Scolt',
      email: 'bruce_scolt@gmail.com',
    },
  ];

  test('should render 3 kitties into card list', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(data));
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );
    const kittyCards = await screen.findAllByTestId('kitty-card');
    expect(kittyCards.length).toBe(3);
  });

  test('should handle onSearchChange', async () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );
    fireEvent.change(screen.getByTestId('search-field'), {
      target: { value: 'Lee' },
    });
    const kittyCards = await screen.findAllByTestId('kitty-card');
    expect(kittyCards.length).toBe(2);
  });
});
