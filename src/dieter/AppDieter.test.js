import { render, screen } from '@testing-library/react';
import AppDieter from './AppDieter';

test('renders learn react link', () => {
  render(<AppDieter />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
