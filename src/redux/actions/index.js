export const loginRequest = (email) => ({
  type: 'LOGIN_REQUEST',
  email,
});

export const walletRequest = (payload) => ({
  type: 'FULL_CURRENCY_SUCESS',
  payload,
});

export const receiveCurrency = (response) => ({
  type: 'RECEIVE_CURRENCY_SUCESS',
  currencies: response,
});

export const deleteExpense = (payload) => ({
  type: 'DELETE_EXPENSE',
  payload,
});

export const editExpense = (id) => ({
  type: 'EDIT_EXPENSE',
  id,
});

export const attExpense = (editedExpense) => ({
  type: 'EDIT_EXPENSE_SUCCESS',
  editedExpense,
});

export const requestListAPI = () => async (dispatch) => {
  const endpoint = 'https://economia.awesomeapi.com.br/json/all';
  const data = await fetch(endpoint);
  const response = await data.json();
  const objtToArray = Object.keys(response);
  const finalListCurrency = objtToArray.filter((moeda) => moeda !== 'USDT');
  dispatch(receiveCurrency(finalListCurrency));
};

export const requestExpensesAPI = (payload) => async (dispatch) => {
  const endpoint = 'https://economia.awesomeapi.com.br/json/all';
  const data = await fetch(endpoint);
  const response = await data.json();
  payload.exchangeRates = response;
  dispatch(walletRequest(payload));
};
