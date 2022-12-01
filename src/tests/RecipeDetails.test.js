import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import App from '../App';
import { renderWithRouter } from './renderWith';
// import RecipeDetails from '../components/RecipeDetails';

describe('Testa o componente detalhes', () => {
  test('Se o components meals details renderiza', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/meals/52771');
    });

    const Loading = screen.getByText(/loading/i);
    expect(Loading).toBeInTheDocument();
  });
});
