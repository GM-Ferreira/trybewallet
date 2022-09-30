import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { requestListAPI, requestExpensesAPI } from '../redux/actions';

class WalletForm extends Component {
  state = {
    valor: '',
    description: '',
    currencies: 'USD',
    method: 'dinheiro',
    tag: 'alimentação',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(requestListAPI());
  }

  handleChange = ({ value, name }) => {
    this.setState({ [name]: value });
  };

  handleClick = () => {
    const { dispatch, expenses } = this.props;
    const id = expenses.length;
    const { valor, description, currencies, method, tag } = this.state;
    const data = {
      id,
      value: valor,
      description,
      currency: currencies,
      method,
      tag,
    };
    dispatch(requestExpensesAPI(data));
    this.setState({
      valor: '',
      description: '',
      currencies: 'USD',
      method: 'dinheiro',
      tag: 'alimentação',
    });
  };

  render() {
    const { currenciesList } = this.props;
    const { valor, description, currencies, method, tag } = this.state;
    return (
      <div>
        <label htmlFor="valor">
          Valor:
          <input
            type="text"
            name="valor"
            id="valor"
            value={ valor }
            data-testid="value-input"
            onChange={ (e) => this.handleChange(e.target) }
          />
        </label>
        <label htmlFor="description">
          Descrição da despesa:
          <input
            type="text"
            name="description"
            id="description"
            value={ description }
            data-testid="description-input"
            onChange={ (e) => this.handleChange(e.target) }
          />
        </label>
        <label htmlFor="currencies">
          Moeda:
          <select
            onChange={ (e) => this.handleChange(e.target) }
            name="currencies"
            id="currencies"
            data-testid="currency-input"
            value={ currencies }
          >
            {currenciesList.map((currency) => (
              <option
                key={ currency }
                value={ currency }
                name="currencies"
              >
                { currency}

              </option>
            ))}
          </select>
        </label>
        <label htmlFor="method">
          Método de pagamento:
          <select
            onChange={ (e) => this.handleChange(e.target) }
            name="method"
            id="method"
            data-testid="method-input"
            value={ method }
          >
            <option
              value="Dinheiro"
              name="method"
            >
              Dinheiro
            </option>
            <option
              value="Cartão de crédito"
              name="method"
            >
              Cartão de crédito
            </option>
            <option
              value="Cartão de débito"
              name="method"
            >
              Cartão de débito
            </option>
          </select>
        </label>
        <label htmlFor="tag">
          Tipo de despesa:
          <select
            onChange={ (e) => this.handleChange(e.target) }
            name="tag"
            id="tag"
            data-testid="tag-input"
            value={ tag }
          >
            <option
              value="Alimentação"
            >
              Alimentação
            </option>
            <option
              value="Lazer"
            >
              Lazer
            </option>
            <option
              value="Trabalho"
            >
              Trabalho
            </option>
            <option
              value="Transporte"
            >
              Transporte
            </option>
            <option
              value="Saúde"
            >
              Saúde

            </option>
          </select>
        </label>
        <button onClick={ this.handleClick } type="button">Adicionar despesa</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currenciesList: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf.isRequired,
  currenciesList: PropTypes.arrayOf.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
