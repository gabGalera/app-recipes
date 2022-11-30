import PropTypes from 'prop-types';
import React from 'react';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

class Footer extends React.Component {
  render() {
    const { history } = this.props;
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
          ata-testid="meals-bottom-btn"
          onClick={ () => history.push('/meals') }
        />
      </footer>
    );
  }
}

Footer.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default Footer;
