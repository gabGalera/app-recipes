import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Profile() {
  return (
    <div>
      <Header title="Profile" search={ false } />
      <body>
        <p
          data-testid="profile-email"
        >
          Email
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
      </body>
      <Footer />
    </div>
  );
}

export default Profile;
