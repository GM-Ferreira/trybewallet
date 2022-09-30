import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    return (
      <div>
        <div>
          <span> Total de despesas: </span>
          <span data-testid="total-field">
            { Math.round(expenses.map((e) => e.value
            * e.exchangeRates[e.currency].ask).reduce((pr, cur) => pr + cur, 0)
            * 100) / 100 }
          </span>
          <span data-testid="header-currency-field">BRL</span>
        </div>
        <div data-testid="email-field">
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
