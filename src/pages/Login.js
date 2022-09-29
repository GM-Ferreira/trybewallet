import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { loginRequest } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    isDisable: true,
  };

  handleClick = () => {
    const { history, dispatch } = this.props;
    const { email } = this.state;
    dispatch(loginRequest(email));
    history.push('/carteira');
  };

  handleChange = ({ value, name }) => {
    this.setState({ [name]: value });
    const { email, password } = this.state;
    const valid = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const minValue = 5;
    if (email.match(valid) && password.length >= minValue) {
      this.setState({ isDisable: '' });
    } else { this.setState({ isDisable: true }); }
  };

  render() {
    const { email, password, isDisable } = this.state;
    return (
      <div>
        Trybe Wallet
        <input
          type="email"
          placeholder="E-mail"
          data-testid="email-input"
          name="email"
          value={ email }
          onChange={ (e) => this.handleChange(e.target) }
        />
        <input
          type="password"
          placeholder="Senha"
          data-testid="password-input"
          name="password"
          value={ password }
          onChange={ (e) => this.handleChange(e.target) }
        />
        <button
          type="button"
          disabled={ isDisable }
          onClick={ this.handleClick }
        >
          Entrar
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default connect()(withRouter(Login));
