import React from 'react';
import { useHistory } from 'react-router-dom';
import propTypes from 'prop-types';
import userIcon from '../images/profileIcon.svg';
import SearchBar from './searchBar';

function Header({ title, search }) {
  const history = useHistory();
  return (
    <div>
      <button
        type="button"
        onClick={ () => history.push('/profile') }
      >
        <img src={ userIcon } alt="profile" data-testid="profile-top-btn" />

      </button>
      {search && <SearchBar />}
      <h1 data-testid="page-title">{title}</h1>
    </div>
  );
}

Header.propTypes = {
  title: propTypes.string.isRequired,
  search: propTypes.bool.isRequired,
};

export default Header;
