import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import  Feedback  from '../pages/Feedback';
import App from '../App';
import {renderWithRouterAndRedux} from './helpers/renderWithRouterAndRedux';
import Ranking from '../pages/Ranking';

describe('Teste se o componente Feedback', () => {
    test('ao fazer três acertos', () => {
        const initialState = {
            player: {
              name: 'teste',
              email: 'teste@teste.com',
              score: 100,
              assertions: 3,
            },
          };
      renderWithRouterAndRedux(<Feedback />,initialState);
      const name = screen.getByTestId('header-player-name');
      expect(name).toBeInTheDocument();
      expect(name).toHaveTextContent('test');
      const image = screen.getByRole('img', {name: /ffff/i})
      expect(image).toBeInTheDocument();
      const score = screen.getByTestId('header-score');
      expect(score).toBeInTheDocument();
      expect(score).toHaveTextContent('100');
      const correctAnswer = screen.getByRole('heading', {name: /well done!/i})
      expect(correctAnswer).toBeInTheDocument();
      const totalScore = screen.getByTestId('feedback-total-score');
      expect(totalScore).toBeInTheDocument();
      expect(totalScore).toHaveTextContent('100');
      const totalHits = screen.getByTestId('feedback-total-question');
      expect(totalHits).toBeInTheDocument();
      expect(totalHits).toHaveTextContent('3');
      const btnPlayAgain = screen.getByRole('button', {name: /play again/i})
      expect(btnPlayAgain).toBeInTheDocument();
      const btnRanking = screen.getByRole('button', {name: /ranking/i})
      expect(btnRanking).toBeInTheDocument();
    },
    test('teste se a rota altera ao clicar no botão', () => {
        const {history} = renderWithRouterAndRedux(<Feedback />);
        const btnPlayAgain = screen.getByRole('button', {name: /play again/i})

        userEvent.click(btnPlayAgain)
        const {pathname} = history.location;
        expect(pathname).toBe('/');

    }),
    test('teste se a rota altera ao clicar no botão',  () => {
        const {history} = renderWithRouterAndRedux(<Feedback />);
        const btnRanking = screen.getByRole('button', {name: /ranking/i})

        userEvent.click(btnRanking)
        const {pathname} = history.location;
        renderWithRouterAndRedux(<Ranking />)
        expect(pathname).toBe('/Ranking');
        

    })
    )});