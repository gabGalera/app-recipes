import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from './renderWithRouterAndRedux';

describe('Testes para pagina Login', () => {
  const dataTestIdEmail = 'email-input';
  const dataTestIdPassword = 'password-input';
  const emailTest = 'test@test.com';

  test('testa se a pagina Login esta na rota /', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const { pathname } = history.location;
    expect(pathname).toEqual('/');
  });
  test('testa se a pagina contem os inputs de Email e Senha', () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId(dataTestIdEmail);
    const passowordInput = screen.getByTestId(dataTestIdPassword);
    expect(passowordInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
  });
  test('testa se o botão esta desativado caso a validação de email não seja correspondente', () => {
    renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByTestId(dataTestIdEmail);
    const inputSenha = screen.getByTestId(dataTestIdPassword);
    userEvent.type(inputEmail, 'test@a');
    userEvent.type(inputSenha, 'AWSD');
    const loginButton = screen.getByRole('button', { name: 'Enter' });
    expect(loginButton).toBeDisabled();
  });
  test('testa se as validações de senha e email estão funcionando', () => {
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
