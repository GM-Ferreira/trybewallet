import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpense, editExpense } from '../redux/actions';

class Table extends Component {
  handleRemove = (expense) => {
    const { dispatch } = this.props;
    dispatch(deleteExpense(expense.id));
  };

  handleEdit = (expense) => {
    const { dispatch } = this.props;
    dispatch(editExpense(expense.id));
  };

  render() {
    const { expenses } = this.props;
    const removeIcon = (
      <svg
        className="remove-icon"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0
          01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
        />

      </svg>
    );
    const editIcon = (
      <svg
        className="edit-icon"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2
          2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
        />

      </svg>
    );
    return (
      <div>
        <table className="table-general">
          <thead>
            <tr>
              <th scope="col">Descrição</th>
              <th scope="col">Tag</th>
              <th scope="col">Método de pagamento</th>
              <th scope="col">Valor</th>
              <th scope="col">Moeda</th>
              <th scope="col">Câmbio utilizado</th>
              <th scope="col">Valor convertido</th>
              <th scope="col">Moeda de conversão</th>
              <th scope="col">Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            { expenses.map((expense) => (
              <tr key={ expense.id }>
                <td>{ expense.description }</td>
                <td>{ expense.tag }</td>
                <td>{ expense.method }</td>
                <td>{ Number(expense.value).toFixed(2) }</td>
                <td>{ expense.exchangeRates[expense.currency].name }</td>
                <td>
                  { Math.round(expense.exchangeRates[expense.currency].ask
                  * 100) / 100 }
                </td>
                <td>
                  { Math.round(expense.exchangeRates[expense.currency].ask
                  * expense.value * 100) / 100 }
                </td>
                <td>Real</td>
                <td>
                  <button
                    type="button"
                    className="delete-btn"
                    data-testid="delete-btn"
                    onClick={ () => this.handleRemove(expense) }
                  >
                    { removeIcon }
                  </button>
                  <button
                    type="button"
                    className="edit-btn"
                    data-testid="edit-btn"
                    onClick={ () => this.handleEdit(expense) }
                  >
                    {editIcon}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.arrayOf,
}.isRequired;

export default connect(mapStateToProps)(Table);
