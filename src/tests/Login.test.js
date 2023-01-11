import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
describe('Teste se na página de login:', () => {
  test('Existe um input de email', () => {
    renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByTestId('input-gravatar-email');
    expect(inputEmail).toBeInTheDocument();
  });
  test('Existe um input de nome', () => {
    renderWithRouterAndRedux(<App />);
    const inputName = screen.getByTestId('input-player-name');
    expect(inputName).toBeInTheDocument();
  });
  test('Existe um botão de Play', () => {
    renderWithRouterAndRedux(<App />);
    const inputBtn = screen.getByRole('button', { name: /play/i });
    expect(inputBtn).toBeInTheDocument();
  });
  test('Ao entrar com um nome que tenha menos de 1 caracteres o botão de entrar fica desabilitado', () => {
    renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByTestId('input-gravatar-email');
    const inputName = screen.getByTestId('input-player-name');
    const inputBtn = screen.getByRole('button', { name: /play/i });
    userEvent.type(inputEmail, 'teste@teste.com');
    userEvent.type(inputName, '');
    expect(inputBtn.disabled).toBe(true);
    userEvent.type(inputName, 'Lucas');
    userEvent.click(inputBtn);
    expect(inputBtn.disabled).toBe(false);
  });
  test('Se email fica salvo na store', async () => {
    const { history} = renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByTestId('input-gravatar-email');
    const inputName = screen.getByTestId('input-player-name');
    const inputBtn = screen.getByRole('button', { name: /play/i });
    userEvent.type(inputEmail, 'lucas@gmail.com');
    userEvent.type(inputName, 'lucas');
    userEvent.click(inputBtn);
    await waitForElementToBeRemoved(() => screen.getByRole('button', { name: /play/i }));
    const { pathname } = history.location;
    expect(pathname).toBe('/Game');
  })
});