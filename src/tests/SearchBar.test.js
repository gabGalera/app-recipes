import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from './renderWithRouterAndRedux';

describe('Testes para o componente SearchBar', () => {
  const textInputTID = 'search-input';
  const searchButtonID = 'search-top-btn';
  const FirstLetterLabel = 'First Letter';
  const lastRecipeID = '11-recipe-card';

  test('testa se o componente tem todos os inputs', () => {
    renderWithRouterAndRedux(<App />, '/meals');
    const ingredientInput = screen.getByLabelText('Ingredient');
    expect(ingredientInput).toBeInTheDocument();
    const nameInput = screen.getByLabelText('Name');
    expect(nameInput).toBeInTheDocument();
    const firstLetterInput = screen.getByLabelText(FirstLetterLabel);
    expect(firstLetterInput).toBeInTheDocument();
    const textInput = screen.getByTestId(textInputTID);
    expect(textInput).toBeInTheDocument();
  });
  test('testa se a requisição para API retorna 12 receitas', async () => {
    renderWithRouterAndRedux(<App />, '/meals');
    const firstLetterInput = screen.getByLabelText(FirstLetterLabel);
    userEvent.click(firstLetterInput);
    const textInput = screen.getByTestId(textInputTID);
    userEvent.type(textInput, 's');
    const searchButton = screen.getByTestId(searchButtonID);
    userEvent.click(searchButton);
    const lastRecipe = await screen.findByTestId(lastRecipeID);
    expect(lastRecipe).toBeInTheDocument();
  });
  test('testa se a requisição para API retorna 12 drinks', async () => {
    renderWithRouterAndRedux(<App />, '/drinks');
    const ingredientInput = screen.getByLabelText('Ingredient');
    userEvent.click(ingredientInput);
    const textInput = screen.getByTestId(textInputTID);
    userEvent.type(textInput, 'Vodka');
    const searchButton = screen.getByTestId(searchButtonID);
    userEvent.click(searchButton);
    const lastDrink = await screen.findByTestId(lastRecipeID);
    expect(lastDrink).toBeInTheDocument();
  });
  test('testa se caso não selecionar o tipo de busca, a busca deve ser feita por nome', async () => {
    renderWithRouterAndRedux(<App />, '/meals');
    const textInput = screen.getByTestId(textInputTID);
    userEvent.type(textInput, 's');
    const searchButton = screen.getByTestId(searchButtonID);
    userEvent.click(searchButton);
    const lastRecipe = await screen.findByTestId(lastRecipeID);
    expect(lastRecipe).toBeInTheDocument();
  });
});
