import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Login extends Component {
  state = {
    name: '',
    email: '',
    isButtonDisabled: true,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.validButton());
  };

  validButton = () => {
    const minNumber = 0;
    const regexEmail = /\S+@\S+\.\S+/;
    const { name, email } = this.state;
    if (regexEmail.test(email) && name.length > minNumber) {
      this.setState({
        isButtonDisabled: false,
      });
    }
  };

  render() {
    const { name, email, isButtonDisabled } = this.state;
    return (
      <div>
        <input
          type="text"
          name="name"
          data-testid="input-player-name"
          onChange={ this.handleChange }
          value={ name }
          placeholder="Nome"
        />
        <input
          type="email"
          name="email"
          data-testid="input-gravatar-email"
          onChange={ this.handleChange }
          value={ email }
          placeholder="E-mail"
        />
        <button
          type="button"
          disabled={ isButtonDisabled }
          data-testid="btn-play"
        >
          Play
        </button>
        <Link to="/Settings">
          <button
            type="button"
            data-testid="btn-settings"
          >
            Settings
          </button>
        </Link>

      </div>
    );
  }
}
