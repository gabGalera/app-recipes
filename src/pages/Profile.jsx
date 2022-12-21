import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import styles from '../styles/Profile.module.css';
import Header from '../components/Header';
import check from '../images/check.svg';
import shareHeart from '../images/shareHeart.svg';
import logout from '../images/logout.svg';
import profile from '../images/perfil.svg';

function Profile() {
  const userLocalStorageEmail = JSON.parse(localStorage.getItem('user'));
  return (
    <div
      style={ {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: 'gray',
      } }
    >
      <div
        style={ {
          width: '100%',
          maxWidth: '1024px',
          backgroundColor: 'white',
        } }
      >
        <Header
          title="Profile"
          search={ false }
          image={ <img
            className={ styles.profile__img }
            src={ profile }
            alt="profile icon"
          /> }
        />
      </div>
      <div
        style={ {
          width: '100%',
          maxWidth: '1024px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: 'white',
          height: '100%',
        } }
      >
        <p
          data-testid="profile-email"
        >
          {userLocalStorageEmail ? userLocalStorageEmail.email : 'Não achamos seu email'}
        </p>
        <Link to="/done-recipes" style={ { textDecoration: 'none', color: 'black' } }>
          <div
            style={ {
              display: 'flex',
              alignItems: 'center',
              height: '100%',
              justifyContent: 'flex-start',
              width: '250px',
              margin: '0 0 20% 0',
            } }
          >
            <img style={ { width: '45px' } } src={ check } alt="done recipes" />
            <p
              style={ { margin: '0 0 0 25px' } }
              data-testid="profile-done-btn"
            >
              Done Recipes
            </p>
          </div>
        </Link>
        <hr
          style={ {
            width: '50%',
            borderBottom: 'solid 1px',
          } }
        />
        <Link to="/favorite-recipes" style={ { textDecoration: 'none', color: 'black' } }>
          <div
            style={ {
              display: 'flex',
              alignItems: 'center',
              height: '100%',
              justifyContent: 'flex-start',
              width: '250px',
              margin: '0 0 20% 0',
            } }
          >
            <img
              src={ shareHeart }
              alt="Favorite recipes"
              style={ { width: '45px' } }
            />
            <p
              style={ { margin: '0 0 0 25px' } }
              data-testid="profile-favorite-btn"
            >
              Favorite Recipes
            </p>
          </div>
        </Link>
        <hr
          style={ {
            width: '50%',
            borderBottom: 'solid 1px',
          } }
        />
        <Link to="/" style={ { textDecoration: 'none', color: 'black' } }>
          <div
            style={ {
              display: 'flex',
              alignItems: 'center',
              height: '100%',
              justifyContent: 'flex-start',
              width: '250px',
              margin: '0 0 20% 0',
            } }
            data-testid="profile-logout-btn"
          >
            <input
              style={ { width: '45px' } }
              src={ logout }
              alt="logout icon"
              type="image"
            />
            <p style={ { margin: '0 0 0 25px' } }>
              Logout
            </p>
          </div>
        </Link>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
