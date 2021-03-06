import React, { useState } from 'react';
import socket from '../socketConfig';

const StartBtn = ({ player, gameID }) => {
  const [showBtn, setShowBtn] = useState(true);
  const { isPartyLeader } = player;

  const onClickHandler = (e) => {
    socket.emit('timer', { playerID: player._id, gameID });
    setShowBtn(false);
  };

  return isPartyLeader && showBtn ? (
    <button type='button' className='btn btn-primary' onClick={onClickHandler}>
      Start Game
    </button>
  ) : null;
};

export default StartBtn;
