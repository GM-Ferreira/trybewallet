import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';

import Wallet from '../pages/Wallet';

describe('Testing Wallet page', () => {
  it('Title text "TrybeWallet" aparece na página', () => {
    renderWithRouterAndRedux(<Wallet />);

    const title = screen.getByText(/TrybeWallet/i);
    expect(title).toBeInTheDocument();
  });

  it('Header text aparece na página', () => {
    renderWithRouterAndRedux(<Wallet />);

    const despesas = screen.getByText(/Total de despesas/i);

    expect(despesas).toBeInTheDocument();
  });

  it('campos de input aparecem na página', () => {
    renderWithRouterAndRedux(<Wallet />);

    const inputValue = screen.getByText(/Valor/i);
    const inputDescription = screen.getByText(/Descrição da despesa/i);
    const inputCurrency = screen.getByText(/Moeda/i);
    const inputMethod = screen.getByText(/Método de pagamento/i);
    const inputTag = screen.getByText(/Tipo de despesa/i);

    expect(inputValue).toBeInTheDocument();
    expect(inputDescription).toBeInTheDocument();
    expect(inputCurrency).toBeInTheDocument();
    expect(inputMethod).toBeInTheDocument();
    expect(inputTag).toBeInTheDocument();
  });

  it('campos de input aparecem na página e são funcionais', async () => {
    renderWithRouterAndRedux(<Wallet />);

    const inputValue = screen.getByTestId('value-input');
    const inputDescription = screen.getByTestId('description-input');
    const inputCurrency = await screen.findByDisplayValue('USD');
    const inputMethod = screen.getByDisplayValue(/Dinheiro/i);
    const inputTag = screen.getByDisplayValue(/alimentação/i);
    const enviarButton = screen.getByRole('button', { name: /Adicionar despesa/i });

    userEvent.type(inputValue, '100');
    userEvent.type(inputDescription, 'testando');
    userEvent.selectOptions(inputCurrency, 'USD');
    userEvent.selectOptions(inputMethod, 'Dinheiro');
    userEvent.selectOptions(inputTag, 'Trabalho');

    expect(inputValue).toHaveValue('100');
    expect(inputDescription).toHaveValue('testando');
    expect(inputCurrency).toHaveValue('USD');
    expect(inputMethod).toHaveValue('Dinheiro');
    expect(inputTag).toHaveValue('Trabalho');
    expect(enviarButton).toBeInTheDocument();

    userEvent.click(enviarButton);

    const despesasTotais = await screen.findByText(/516/i);
    const moedaDespesas = screen.getByTestId('header-currency-field');

    expect(despesasTotais.innerHTML).toBe('516.88');
    expect(moedaDespesas.innerHTML).toBe('BRL');
  });
});
