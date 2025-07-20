import { render, screen } from '@testing-library/react';
import Contact from '../Contact';
import '@testing-library/jest-dom';
describe('Contact Us Page Test cases', () => {
  it('Should load contact us component', () => {
    render(<Contact />);
    const heading = screen.getByRole('heading');
    expect(heading).toBeInTheDocument();
  });
  it('Should load button inside Contact Component', () => {
    render(<Contact />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });
  it('Should load input name inside Contact component', () => {
    render(<Contact />);
    const InputName = screen.getByPlaceholderText('name');
    expect(InputName).toBeInTheDocument();
  });
  it('Should load 2 input boxes on the Contact component', () => {
    render(<Contact />);
    const inputBoxes = screen.getAllByRole('textbox');
    expect(inputBoxes.length).toBe(2);
  });
});
