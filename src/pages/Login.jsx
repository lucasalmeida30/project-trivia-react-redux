import React, { Component } from 'react';
import PropTypes from 'prop-types';
import fetchAPIToken from '../redux/actions';

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

  handleClick = async () => {
    const getToken = await fetchAPIToken();
    const { history } = this.props;
    localStorage.setItem('token', getToken.token);
    history.push('/Game');
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
          onClick={ this.handleClick }
        >
          Play
        </button>

      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
