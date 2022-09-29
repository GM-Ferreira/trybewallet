export const loginRequest = (email) => ({
  type: 'LOGIN_REQUEST',
  email,
});

export const walletRequest = () => ({
  type: 'WALLET_REQUEST',
});
