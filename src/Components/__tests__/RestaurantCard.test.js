import { render, screen } from '@testing-library/react';
import RestaurantCard from '../RestaurantCard';
import mockdata from '../Mocks/mockdata.json';
import '@testing-library/jest-dom';
it('Should render Restaurant Card component with props data', () => {
  render(<RestaurantCard {...mockdata} />);
  const name = screen.getByText('Pizza Hut');
  expect(name).toBeInTheDocument();
});
