import React from 'react';
import { useHistory } from 'react-router-dom';
import propTypes from 'prop-types';
import styles from '../styles/Header.module.css';
import userIcon from '../images/profileIcon.svg';
import SearchBar from './SearchBar';
import bellWithHeart from '../images/bellWithHeart.svg';

function Header({ title, search, image }) {
  const history = useHistory();
  return (
    <div
      style={ {
        width: '100%',
      } }
    >
      <div
        className={ styles.main__container }
      >
        <img
          src={ bellWithHeart }
          alt="bell with heart"
          className={ styles.bell__hearth }
        />
        <h2
          className={ styles.first__part__title }
        >
          <em>
            Cozinhando com
          </em>
          {' '}
          <span style={ { color: 'rgba(65, 25, 127, 1)' } }>Trybers</span>
        </h2>
        <input
          data-testid="profile-top-btn"
          className={ styles.user__icon }
          src={ userIcon }
          alt="profile"
          type="image"
          onClick={ () => history.push('/profile') }
        />
      </div>
      <div
        className={ styles.search__bar__img__title__div }
      >
        { image }
        <h1
          data-testid="page-title"
          style={ {
            color: 'rgba(65, 25, 127, 1)',
          } }
        >
          <em>
            {title}
          </em>
        </h1>
        {search && <SearchBar />}
      </div>

    </div>
  );
}
Header.propTypes = {
  title: propTypes.string.isRequired,
  search: propTypes.bool.isRequired,
  image: propTypes.element.isRequired,
};

export default Header;
