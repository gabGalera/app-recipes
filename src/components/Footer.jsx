import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from '../styles/Recipes.module.css';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  const history = useHistory();
  return (
    <footer
      className={ styles.footer__container }
      data-testid="footer"
    >
      <input
        className={ styles.footer__input }
        src={ drinkIcon }
        type="image"
        alt="Drink Icon"
        data-testid="drinks-bottom-btn"
        onClick={ () => history.push('/drinks') }
      />
      <input
        className={ styles.footer__input }
        src={ mealIcon }
        type="image"
        alt="Meals Icon"
        data-testid="meals-bottom-btn"
        onClick={ () => history.push('/meals') }
      />
    </footer>
  );
}

export default Footer;
