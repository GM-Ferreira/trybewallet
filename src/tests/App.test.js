import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';

import App from '../App';

describe('Testing Login', () => {
  it('texto "Wallet" aparece na página de Login', () => {
    renderWithRouterAndRedux(<App />);

    const title = screen.getByText(/allet/i);
    expect(title).toBeInTheDocument();
  });

  it('campo input de email aparece na página de Login', () => {
    renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByPlaceholderText(/e-mail/i);
    expect(inputEmail).toBeInTheDocument();
  });

  it('campo input de senha aparece na página de Login e é digitável', () => {
    renderWithRouterAndRedux(<App />);

    const inputPassword = screen.getByPlaceholderText(/senha/i);
    expect(inputPassword).toBeInTheDocument();
  });

  it('botão "Entrar" aparece na página de Login', () => {
    renderWithRouterAndRedux(<App />);

    const entrarBtn = screen.getByRole('button', { name: /entrar/i });
    expect(entrarBtn).toBeInTheDocument();
  });

  it('botão "Entrar" é liberado apos digitar email e senha', () => {
    renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByPlaceholderText(/e-mail/i);
    const inputPassword = screen.getByPlaceholderText(/senha/i);
    const entrarBtn = screen.getByRole('button', { name: /entrar/i });

    expect(entrarBtn).toHaveAttribute('disabled');

    userEvent.type(inputEmail, 'teste@teste.com');
    userEvent.type(inputPassword, '1234567');
    userEvent.type(inputPassword, '{backspace}good');

    expect(entrarBtn).not.toHaveAttribute('disabled');

    userEvent.click(entrarBtn);
  });
});
