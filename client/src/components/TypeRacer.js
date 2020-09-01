import React from 'react';
import { Redirect } from 'react-router-dom';

import CountDown from './CountDown';
import StartBtn from './StartBtn';
import DisplayWords from './DisplayWords';
import Form from './Form';
import socket from '../socketConfig';

const findPlayer = (players) =>
  players.find((player) => player.socketID === socket.id);

const TypeRacer = ({ gameState }) => {
  const { _id, players, words, isOpen, isOver } = gameState;
  const player = findPlayer(players);
  if (_id === '') return <Redirect to='/' />;

  return (
    <div className='text-center'>
      <DisplayWords words={words} player={player} />
      <Form isOpen={isOpen} isOver={isOver} gameID={_id} />
      <CountDown />
      <StartBtn player={player} gameID={_id} />
    </div>
  );
};

export default TypeRacer;
