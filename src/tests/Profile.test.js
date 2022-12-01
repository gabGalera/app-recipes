import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from './renderWithRouterAndRedux';

describe('Testes para pagina Profile', () => {
  test('', () => {
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
  });
});
