// Esse reducer será responsável por tratar as informações da pessoa usuária

const INITIAL_STATE = {
  email: '', // string que armazena o email da pessoa usuária
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'LOGIN_REQUEST':
    return {
      ...state,
      email: action.email,
    };
  default:
    return state;
  }
};

export default userReducer;
