import React, { Component } from 'react';

export default class Login extends Component {
  render() {
    return (
      <form>
        <label htmlFor="login-form">
          <input
            type="email"
            name="email"
            placeholder="Digite seu email"
            data-testid="email-input"
          />
          <input
            type="password"
            name="password"
            placeholder="Digite sua senha"
            data-testid="password-input"
          />
          <button
            data-testid="login-submit-btn"
            type="submit"
          >
            Entrar
          </button>
        </label>
      </form>
    );
  }
}
