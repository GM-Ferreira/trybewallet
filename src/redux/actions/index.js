export const loginRequest = (email) => ({
  type: 'LOGIN_REQUEST',
  email,
});

export const walletRequest = () => ({
  type: 'WALLET_REQUEST',
});

export const receiveCurrency = (response) => ({
  type: 'RECEIVE_CURRENCY_SUCESS',
  currencies: response,
});

export const requestAPI = () => async (dispatch) => {
  const endpoint = 'https://economia.awesomeapi.com.br/json/all';
  const data = await fetch(endpoint);
  const response = await data.json();
  const objtToArray = Object.keys(response);
  const finalListCurrency = objtToArray.filter((moeda) => moeda !== 'USDT');
  dispatch(receiveCurrency(finalListCurrency));
};
