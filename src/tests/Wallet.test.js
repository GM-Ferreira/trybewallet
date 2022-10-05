import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';

import Wallet from '../pages/Wallet';

const inputValurTest = 'value-input';
const inputDescrptTest = 'description-input';
const inputMethTest = 'method-input';

describe('Testing Wallet page', () => {
  it('Title text "Wallet" aparece na página', () => {
    renderWithRouterAndRedux(<Wallet />);

    const title = screen.getByText(/Wallet/i);
    expect(title).toBeInTheDocument();
  });

  it('Header text aparece na página', () => {
    renderWithRouterAndRedux(<Wallet />);

    const despesas = screen.getByText(/Total de despesas/i);

    expect(despesas).toBeInTheDocument();
  });

  it('campos de input aparecem na página', () => {
    renderWithRouterAndRedux(<Wallet />);

    const inputValue = screen.getByTestId(inputValurTest);
    const inputDescription = screen.getByTestId(inputDescrptTest);
    const inputCurrency = screen.getByTestId('currency-input');
    const inputMethod = screen.getByTestId(inputMethTest);
    const inputTag = screen.getByText(/Tipo de despesa/i);

    expect(inputValue).toBeInTheDocument();
    expect(inputDescription).toBeInTheDocument();
    expect(inputCurrency).toBeInTheDocument();
    expect(inputMethod).toBeInTheDocument();
    expect(inputTag).toBeInTheDocument();
  });

  it('campos de input aparecem na página e são funcionais', async () => {
    renderWithRouterAndRedux(<Wallet />);

    const inputValue = screen.getByTestId(inputValurTest);
    const inputDescription = screen.getByTestId(inputDescrptTest);
    const inputCurrency = await screen.findByDisplayValue('USD');
    const inputMethod = screen.getByTestId(inputMethTest);
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

    const removeButton = await screen.findByTestId('delete-btn');
    expect(removeButton).toBeInTheDocument();

    const despesasTotais = await screen.findByTestId('total-field');
    const moedaDespesas = screen.getByTestId('header-currency-field');

    expect(despesasTotais.innerHTML).toBeTruthy();
    expect(moedaDespesas.innerHTML).toBe('BRL');

    userEvent.click(removeButton);
    expect(removeButton).not.toBeInTheDocument();
  });

  it('função de editar despesa funciona', async () => {
    renderWithRouterAndRedux(<Wallet />);

    const inputValue = screen.getByTestId(inputValurTest);
    const inputDescription = screen.getByTestId(inputDescrptTest);
    const inputCurrency = await screen.findByDisplayValue('USD');
    const inputMethod = screen.getByTestId(inputMethTest);
    const inputTag = screen.getByDisplayValue(/alimentação/i);
    const enviarButton = screen.getByRole('button', { name: /Adicionar despesa/i });

    userEvent.type(inputValue, '100');
    userEvent.type(inputDescription, 'testando');
    userEvent.selectOptions(inputCurrency, 'USD');
    userEvent.selectOptions(inputMethod, 'Dinheiro');
    userEvent.selectOptions(inputTag, 'Trabalho');

    userEvent.click(enviarButton);

    userEvent.type(inputValue, '300');
    userEvent.type(inputDescription, 'testando3');
    userEvent.selectOptions(inputCurrency, 'USD');

    userEvent.click(enviarButton);

    userEvent.type(inputValue, '200');
    userEvent.type(inputDescription, 'testando2');

    userEvent.click(enviarButton);

    const editButton = await screen.findByTestId('edit-btn');

    expect(editButton).toBeInTheDocument();

    userEvent.click(editButton);

    const editForm = await screen.findByRole('button', { name: /editar despesa/i });

    expect(editForm).toBeInTheDocument();

    userEvent.type(inputValue, '10000');
    userEvent.type(inputDescription, 'testando edit');

    userEvent.click(editForm);

    expect(enviarButton).toBeInTheDocument();
  });
});
