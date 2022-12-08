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
  test('testa se ao fazer uma busca uma imagem da receita é renderizada', async () => {
    renderWithRouterAndRedux(<App />, '/meals');
    const ingredientInput = screen.getByLabelText('Ingredient');
    userEvent.click(ingredientInput);
    const textInput = screen.getByTestId(textInputTID);
    userEvent.type(textInput, 'carrot');
    const searchButton = screen.getByTestId(searchButtonID);
    userEvent.click(searchButton);
    const recipe = await screen.findByAltText('French Lentils With Garlic and Thyme');
    expect(recipe).toBeInTheDocument();
  });
  test('teste se apenas digitando e pesquisando é direcionado para pagina do drink', async () => {
    const { history } = renderWithRouterAndRedux(<App />, '/drinks');
    const textInput = screen.getByTestId(textInputTID);
    userEvent.type(textInput, 'Smut');
    const searchButton = screen.getByTestId(searchButtonID);
    userEvent.click(searchButton);
    const drinkImage = await screen.findByTestId('recipe-photo');
    expect(drinkImage).toBeInTheDocument();
    expect(history.location.pathname).toEqual('/drinks/17141');
  });
  test('testa se ao fazer uma busca e clicar na receita, é direcionado a pagina dela', async () => {
    const { history } = renderWithRouterAndRedux(<App />, '/meals');
    const ingredientInput = screen.getByLabelText('Name');
    userEvent.click(ingredientInput);
    const textInput = screen.getByTestId(textInputTID);
    userEvent.type(textInput, 'Corba');
    const searchButton = screen.getByTestId(searchButtonID);
    userEvent.click(searchButton);
    const recipe = await screen.findByAltText('Corba');
    userEvent.click(recipe);
    expect(history.location.pathname).toEqual('/meals/52977');
  });
  test('teste busca de drinks pela primeira letra', () => {
    const { history } = renderWithRouterAndRedux(<App />, '/meals');
    const drinkBtn = screen.getByTestId('drinks-bottom-btn');
    userEvent.click(drinkBtn);
    expect(history.location.pathname).toEqual('/drinks');
    const textInput = screen.getByTestId(textInputTID);
    userEvent.type(textInput, 's');
    const firstLetterInput = screen.getByLabelText('First Letter');
    userEvent.click(firstLetterInput);
    const searchButton = screen.getByTestId(searchButtonID);
    userEvent.click(searchButton);
    expect(history.location.pathname).toEqual('/drinks');
  });
});
