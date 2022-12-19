import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/Login.module.css';
import pageLogo from '../images/logoRecipesApp.svg';
import tomate from '../images/tomate.svg';

export default class Login extends Component {
  state = {
    email: '',
    password: '',
    buttonDisabled: true,
  };

  validation = () => {
    const { email, password } = this.state;
    const minLength = 7;
    const regex = /\S+@\S+\.\S+/;
    const testEmail = regex.test(email);
    return testEmail && password.length >= minLength;
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => {
      this.setState({ buttonDisabled: !this.validation() });
    });
  };

  handleClick = (event) => {
    event.preventDefault();
    const { history } = this.props;
    const { email } = this.state;
    const toStorange = {
      email,
    };
    localStorage.setItem('user', JSON.stringify(toStorange));
    history.push('/meals');
  };

  render() {
    const { email, password, buttonDisabled } = this.state;
    const { handleChange, handleClick } = this;
    return (
      <form
        style={ {
          display: 'flex',
          height: '100vh',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#41197F',
        } }
      >
        <div
          className={ styles.logo__div }
        >
          <img
            className={ styles.img__logo }
            src={ pageLogo }
            alt="page logo"
          />
        </div>
        <div
          style={ {
            width: '100%',
            maxWidth: '1024px',
            zIndex: '1',
          } }
        >
          <img
            className={ styles.img__tomato }
            src={ tomate }
            alt="três tomates e um alface"
          />
        </div>
        <div
          className={ styles.input__btn__div }
        >
          <p className={ styles.title }><em>Login</em></p>
          <input
            className={ styles.inputs }
            type="email"
            name="email"
            value={ email }
            id="email-input"
            placeholder="Digite seu email"
            data-testid="email-input"
            onChange={ handleChange }
          />
          <input
            className={ styles.inputs }
            type="password"
            name="password"
            value={ password }
            id="passoword-input"
            placeholder="Digite sua senha"
            data-testid="password-input"
            onChange={ handleChange }
          />
          <button
            className={ styles.submit__btn }
            data-testid="login-submit-btn"
            type="submit"
            onClick={ handleClick }
            disabled={ buttonDisabled }
          >
            Enter
          </button>
        </div>
      </form>

    );
  }
}
Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
