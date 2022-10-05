import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { loginRequest } from '../redux/actions';
import './login.css';

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
    const icone = (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={ 1.5 } stroke="currentColor" className="money-icon">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198
          1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013
          6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25
          6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621
          0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125
          1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0
          0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75
          0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3
          0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
        />
      </svg>
    );

    return (
      <div className="loggin-page">
        <div className="login-header">
          {icone}
          <span className="trybe-title">
            Trybe
          </span>
          <span className="wallet-title">
            Wallet
          </span>
        </div>
        <div className="login-form">
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
