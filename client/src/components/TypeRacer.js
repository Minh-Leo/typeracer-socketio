import React from 'react';
import { Redirect } from 'react-router-dom';
import CountDown from './CountDown';
import StartBtn from './StartBtn';
import socket from '../socketConfig';

const findPlayer = (players) =>
  players.find((player) => player.socketID === socket.id);

const TypeRacer = ({ gameState }) => {
  const { _id, players } = gameState;
  const player = findPlayer(players);
  if (_id === '') return <Redirect to='/' />;

  return (
    <div className='text-center'>
      <CountDown />
      <StartBtn player={player} gameID={_id} />
    </div>
  );
};

export default TypeRacer;
