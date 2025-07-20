import { fireEvent, render, screen } from '@testing-library/react';
import Body from '../Body';
import { BrowserRouter, json } from 'react-router-dom';
import MOCKDATA from '../Mocks/mockRestData.json';
import { act } from 'react';
import '@testing-library/jest-dom';
global.fetch = jest.fn(() => {
  return Promise.resolve({
    json: () => {
      return Promise.resolve(MOCKDATA);
    },
  });
});
it('Should Search ResList for burger text input', async () => {
  render(
    <BrowserRouter>
      <Body />
    </BrowserRouter>
  );

  const searchBtn = await screen.findByRole('button', { name: 'Search' });

  //   const searchBtn = screen.getByRole('button', { name: 'Search' });
  const searchInput = screen.getByTestId('searchInput');
  fireEvent.change(searchInput, { target: { value: 'burger' } });
  fireEvent.click(searchBtn);
  const cards = screen.getAllByTestId('resCard');
  expect(cards.length).toBe(1);
});
it('Should filter Top Rated Restaurants', async () => {
  render(
    <BrowserRouter>
      <Body />
    </BrowserRouter>
  );
  const cardsBeforeFilter = await screen.findAllByTestId('resCard');
  expect(cardsBeforeFilter.length).toBe(8);
  const topRatedBtn = await screen.findByRole('button', {
    name: 'Top Rated Restaurants',
  });
  fireEvent.click(topRatedBtn);
  const cardsAfterFilter = await screen.findAllByTestId('resCard');
  expect(cardsAfterFilter.length).toBe(4);
});
