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
        <object
          className="userIcon"
          type="image/svg+xml"
          data={ userIcon }
          data-testid="profile-top-btn"
        >
          userIcon
        </object>
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
