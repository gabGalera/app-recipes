import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  const history = useHistory();
  return (
    <footer className="footer" data-testid="footer">
      <input
        src={ drinkIcon }
        type="image"
        alt="Drink Icon"
        data-testid="drinks-bottom-btn"
        onClick={ () => history.push('/drinks') }
      />
      <input
        src={ mealIcon }
        type="image"
        alt="Meals Icon"
        data-testid="meals-bottom-btn"
        onClick={ () => history.push('/meals') }
      />
    </footer>
  );
}

// Footer.propTypes = {
//   history: PropTypes.shape().isRequired,
// };

export default Footer;
