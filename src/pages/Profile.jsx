import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Profile() {
  const localStorageEmail = JSON.parse(localStorage.getItem('user')).email;
  return (
    <div>
      <Header title="Profile" search={ false } />
      <div>
        <p
          data-testid="profile-email"
        >
          {localStorageEmail}
        </p>
        <button
          type="button"
          data-testid="profile-done-btn"
        >
          Done Recipes
        </button>
        <button
          type="button"
          data-testid="profile-favorite-btn"
        >
          Favorite Recipes
        </button>
        <button
          type="button"
          data-testid="profile-logout-btn"
        >
          Logout
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
