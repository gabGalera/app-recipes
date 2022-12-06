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
});
