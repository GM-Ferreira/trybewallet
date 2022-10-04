// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
};

const crescentFunc = () => (a, b) => a.id - b.id;

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'FULL_CURRENCY_SUCESS':
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case 'DELETE_EXPENSE':
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.payload),
    };
  case 'EDIT_EXPENSE':
    return {
      ...state,
      editor: true,
      idToEdit: action.id,
    };
  case 'EDIT_EXPENSE_SUCCESS':
    return {
      ...state,
      editor: false,
      idToEdit: 0,
      expenses: [...state.expenses
        .filter((expense) => expense.id !== action.editedExpense.id),
      action.editedExpense].sort(crescentFunc()),
    };
  case 'RECEIVE_CURRENCY_SUCESS':
    return {
      ...state,
      currencies: action.currencies,
    };
  default:
    return state;
  }
};

export default walletReducer;
