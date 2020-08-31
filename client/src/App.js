import React, { useEffect, useState } from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import history from './history';
import socket from './socketConfig';
import GameMenu from './components/GameMenu';
import CreateGame from './components/CreateGame';
import JoinGame from './components/JoinGame';
import './App.css';

function App() {
  const [gameState, setGameState] = useState({
    _id: '',
    isOpen: false,
    players: [],
    words: [],
  });

  useEffect(() => {
    socket.on('update-game', (game) => {
      console.log(game);
      setGameState(game);
    });

    return () => {
      socket.removeAllListeners();
    };
  }, []);

  useEffect(() => {
    if (gameState._id !== '') history.push(`/game/${gameState._id}`);
  }, [gameState._id]);

  return (
    <Router history={history}>
      <Switch>
        <Route exact path='/' component={GameMenu} />
        <Route path='/game/create' component={CreateGame} />
        <Route path='/game/join' component={JoinGame} />
      </Switch>
    </Router>
  );
}

export default App;
