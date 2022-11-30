import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
      <form>
        <input
          type="email"
          name="email"
          value={ email }
          id="email-input"
          placeholder="Digite seu email"
          data-testid="email-input"
          onChange={ handleChange }
        />
        <input
          type="password"
          name="password"
          value={ password }
          id="passoword-input"
          placeholder="Digite sua senha"
          data-testid="password-input"
          onChange={ handleChange }
        />
        <button
          data-testid="login-submit-btn"
          type="submit"
          onClick={ handleClick }
          disabled={ buttonDisabled }
        >
          Enter
        </button>
      </form>
    );
  }
}
Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
