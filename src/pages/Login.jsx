import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAPIQuest, fetchAPIToken, userInfo } from '../redux/actions';

class Login extends Component {
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
    const { name, email } = this.state;
    const getToken = await fetchAPIToken();
    const { history, dispatch } = this.props;
    localStorage.setItem('token', getToken.token);
    dispatch(userInfo({ name, email }));
    await fetchAPIQuest();
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

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (globalState) => ({
  email: globalState.player.email,
  name: globalState.player.name,
});

export default connect(mapStateToProps)(Login);
