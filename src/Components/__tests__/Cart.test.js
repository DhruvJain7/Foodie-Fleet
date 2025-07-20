import RestaurantMenu from '../RestaurantMenu';
import MOCK_DATA from '../Mocks/mockRestMenu.json';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import appStore from '../../../util/appStore';
import Header from '../Header';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import Cart from '../Cart';
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(MOCK_DATA),
  })
);

it('should load Restaurant Menu Component', async () => {
  render(
    <BrowserRouter>
      <Provider store={appStore}>
        <Header />
        <RestaurantMenu />
        <Cart />
      </Provider>
    </BrowserRouter>
  );
  const accordionHeader = await screen.findByText('Recommended (20)');
  fireEvent.click(accordionHeader);
  const menuItems = await screen.findAllByTestId('foodItems');
  expect(menuItems.length).toBe(20);
  const addBtns = await screen.findAllByRole('button', { name: 'Add +' });
  fireEvent.click(addBtns[0]);
  const cartItem = await screen.findByText('Cart(1)');
  expect(cartItem).toBeInTheDocument();
  fireEvent.click(addBtns[0]);
  const menuItem = await screen.findAllByTestId('foodItems');
  expect(menuItem.length).toBe(22);
  const clear = await screen.findByRole('button', { name: 'ClearCart' });
  fireEvent.click(clear);
  const items = await screen.findAllByTestId('foodItems');
  expect(items.length).toBe(20);
});
