import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import copy from 'clipboard-copy';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import Header from '../components/Header';
import styles from '../styles/DoneRecipes.module.css';
import { JSONDoneRecipesReader } from '../helpers/JSONReaders';
import shareIcon from '../images/shareIcon.svg';
import allButton from '../images/allButton.svg';
import foodIcon from '../images/foodIcon.svg';
import beverageIcon from '../images/beverageIcon.svg';

function DoneRecipes() {
  const [filterParameters, setFilterParameters] = useState('all');
  const doneRecipes = JSONDoneRecipesReader;
  const filtering = filterParameters === 'meal' ? (
    doneRecipes
      .filter((recipe) => recipe.type === 'meal')
  ) : (
    doneRecipes
      .filter((recipe) => recipe.type === 'drink'));
  return (
    <div
      style={ {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'rgba(65, 25, 127, 1)',
        width: '100%',
      } }
    >
      <div
        className={ styles.main__div }
      >
        <Header
          title="Done Recipes"
          search={ false }
          image={ <IoMdCheckmarkCircleOutline
            style={ {
              display: 'flex',
              textAlign: 'center',
              height: '15%',
              width: '15%',
              color: 'rgba(252, 196, 54, 1)',
              justifyContent: 'center',
              // marginTop: '20%',
            } }
          /> }
        />
        <div
          className={ styles.btn__div }
        >
          <input
            className={ styles.input__images }
            src={ allButton }
            alt="all button"
            type="image"
            data-testid="filter-by-all-btn"
            onClick={ () => setFilterParameters('all') }
          />
          <input
            className={ styles.input__images }
            src={ foodIcon }
            alt="food icon"
            type="image"
            data-testid="filter-by-meal-btn"
            onClick={ () => setFilterParameters('meal') }
          />
          <input
            className={ styles.input__images }
            src={ beverageIcon }
            alt="beverage icon"
            type="image"
            data-testid="filter-by-drink-btn"
            onClick={ () => setFilterParameters('drink') }
          />
        </div>
        {(filterParameters === 'all' ? (doneRecipes) : (filtering))
          .map((recipe, index) => (
            <div
              key={ index }
              className={ styles.recipe__container }
            >
              <Link
                to={ `/${recipe.type}s/${recipe.id}` }
                style={ { width: '30%', height: '100%' } }
              >
                <img
                  className={ styles.recipe__image }
                  src={ recipe.image }
                  alt={ recipe.name }
                  data-testid={ `${index}-horizontal-image` }
                />
              </Link>
              <div className={ styles.text__div }>
                <Link
                  style={ {
                    textDecoration: 'none',
                    color: 'black',
                  } }
                  to={ `/${recipe.type}s/${recipe.id}` }
                >
                  <p
                    data-testid={ `${index}-horizontal-name` }
                    className={ styles.recipe__name }
                  >
                    {recipe.name}
                  </p>
                </Link>
                {recipe.type === 'meal' ? (
                  <p
                    data-testid={ `${index}-horizontal-top-text` }
                    className={ styles.recipe__type }
                  >
                    {`${recipe.nationality} - ${recipe.category}`}
                  </p>
                ) : (
                  <p
                    data-testid={ `${index}-horizontal-top-text` }
                    className={ styles.recipe__type }
                  >
                    {`${recipe.alcoholicOrNot} - ${recipe.category}`}
                  </p>
                )}
                <p
                  style={ { height: '0px', width: '0px', color: 'transparent' } }
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  {recipe.category}
                </p>
                <p
                  data-testid={ `${index}-horizontal-done-date` }
                  className={ styles.done__date }
                >
                  {`${recipe.doneDate}`}
                </p>
                <div className={ styles.tag }>
                  {
                    recipe.tags.map((tag, tagIndex) => (
                      <div
                        key={ tagIndex }
                        data-testid={ `${index}-${tag}-horizontal-tag` }
                        className={ styles.tag__container }
                      >
                        {tag}
                      </div>
                    ))
                  }
                </div>
              </div>
              <div className={ styles.divDone }>
                <input
                  className={ styles.share__btn }
                  src={ shareIcon }
                  alt="share icon"
                  type="image"
                  data-testid={ `${index}-horizontal-share-btn` }
                  onClick={ () => {
                    copy(`http://localhost:3000/${recipe.type}s/${recipe.id}`);
                    const messageElement = document
                      .getElementById(`${index}-share-message`);
                    messageElement.innerText = 'Link copied!';
                  } }
                />
                <p id={ `${index}-share-message` } className={ styles.p_divDone } />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default DoneRecipes;
