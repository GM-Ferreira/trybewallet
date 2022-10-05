import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    const profile = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={ 1.5 }
        stroke="currentColor"
        className="profile-icon"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488
          0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966
          8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    );
    return (
      <div className="email-value-header">
        <div className="total-fiel-general">
          <span className="total-field-title"> Total de despesas: </span>
          <span className="total-field-value" data-testid="total-field">
            { Number(expenses.map((e) => e.value
            * e.exchangeRates[e.currency].ask).reduce((pr, cur) => pr
            + cur, 0)).toFixed(2)}
          </span>
          <span
            className="total-field-value"
            data-testid="header-currency-field"
          >
            BRL
          </span>
        </div>
        <div className="email-field" data-testid="email-field">
          { profile }
          { email }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Header);
