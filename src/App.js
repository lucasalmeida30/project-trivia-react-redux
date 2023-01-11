import React from 'react';
import { Switch, Route } from 'react-router-dom';
// import logo from './trivia.png';
import Login from './pages/Login';
import Game from './pages/Game';
import Settings from './pages/Settings';
import './App.css';

export default function App() {
  return (
    <div>
      <Switch>
        <Route path="/Settings" component={ Settings } />
        <Route exact path="/" component={ Login } />
        <Route exact path="/Game" component={ Game } />
      </Switch>
    </div>
  );
}
