import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from './renderWithRouterAndRedux';

describe('Testes para pagina Profile', () => {
  test('testa se existe o botão de Profile esta na tela', () => {
    const dataTestIdEmail = 'email-input';
    const dataTestIdPassword = 'password-input';
    const emailTest = 'test@test.com';
    const { history } = renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByTestId(dataTestIdEmail);
    const inputSenha = screen.getByTestId(dataTestIdPassword);
    const loginButton = screen.getByRole('button', { name: 'Enter' });
    userEvent.type(inputEmail, emailTest);
    userEvent.type(inputSenha, '1234567');
    expect(loginButton).toBeEnabled();
    userEvent.click(loginButton);
    expect(history.location.pathname).toEqual('/meals');
    const profileButton = screen.getByAltText('profile');
    expect(profileButton).toBeInTheDocument();
  });
  test('testa se ao clicar no botão é direcionado a rota /profile', () => {
    const { history } = renderWithRouterAndRedux(<App />, '/meals');
    const profileButton = screen.getByAltText('profile');
    userEvent.click(profileButton);
    expect(history.location.pathname).toEqual('/profile');
  });
  test('Testa se o a pagina Profile tem um titulo', () => {
    renderWithRouterAndRedux(<App />, '/profile');
    const title = screen.getByTestId('page-title');
    expect(title).toBeInTheDocument();
  });
  test('testa ao clicar em Done Recipes é direcionado para rota /done-recipes ', () => {
    const { history } = renderWithRouterAndRedux(<App />, '/profile');
    const doneRecipesButton = screen.getByTestId('profile-done-btn');
    userEvent.click(doneRecipesButton);
    expect(history.location.pathname).toEqual('/done-recipes');
  });
  test('testa ao clicar em Favorite Recipes é direcionado para rota /favorite-recipes', () => {
    const { history } = renderWithRouterAndRedux(<App />, '/profile');
    const favoriteRecipesButton = screen.getByTestId('profile-favorite-btn');
    userEvent.click(favoriteRecipesButton);
    expect(history.location.pathname).toEqual('/favorite-recipes');
  });
  test('testa se ao clicar em Logout os dados no localStorange são limpo e é dicionado para roda /', async () => {
    localStorage.setItem('user', JSON.stringify({ email: 'teste@test.com' }));
    const { history } = renderWithRouterAndRedux(<App />, '/profile');
    const test = await screen.findByText('teste@test.com');
    expect(test).toBeInTheDocument();
    const logoutButton = screen.getByTestId('profile-logout-btn');
    userEvent.click(logoutButton);
    expect(localStorage.getItem('user')).toEqual(null);
    expect(history.location.pathname).toEqual('/');
  });
  test('', () => {
    const { getByTestId } = renderWithRouterAndRedux(<App />, '/profile');
    const email = getByTestId('profile-email');
    expect(email).toHaveTextContent('Não achamos seu email');
  });
});
