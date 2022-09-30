import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { requestAPI } from '../redux/actions';

class WalletForm extends Component {
  componentDidMount() {
    const { currencies } = this.props;
    currencies();
  }

  render() {
    const { currenciesList } = this.props;
    return (
      <div>
        <label htmlFor="valor">
          Valor:
          <input type="text" id="valor" data-testid="value-input" />
        </label>
        <label htmlFor="description">
          Descrição da despesa:
          <input type="text" id="description" data-testid="description-input" />
        </label>
        <label htmlFor="currencies">
          Moeda:
          <select name="currencies" id="currencies" data-testid="currency-input">
            {currenciesList.map((currency) => (
              <option key={ currency } value={ currency }>{ currency}</option>
            ))}
          </select>
        </label>
        <label htmlFor="method">
          Método de pagamento:
          <select name="method" id="method" data-testid="method-input">
            <option value="dinheiro">Dinheiro</option>
            <option value="credito">Cartão de crédito</option>
            <option value="debito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Tipo de despesa:
          <select name="tag" id="tag" data-testid="tag-input">
            <option value="alimentação">Alimentação</option>
            <option value="lazer">Lazer</option>
            <option value="trabalho">Trabalho</option>
            <option value="transporte">Transporte</option>
            <option value="saúde">Saúde</option>
          </select>
        </label>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currenciesList: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  currencies: () => dispatch(requestAPI()),
});

WalletForm.propTypes = {
  currencies: PropTypes.func.isRequired,
  currenciesList: PropTypes.arrayOf.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
