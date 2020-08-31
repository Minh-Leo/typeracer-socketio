import React, { useState } from 'react';
import socket from '../socketConfig';

const CreateGame = (props) => {
  const [nickName, setNickName] = useState('');

  const onChange = (e) => {
    setNickName(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(nickName);
    socket.emit('create-game', nickName);
  };

  return (
    <div className='row'>
      <div className='col-sm'></div>
      <div className='col-sm-8'>
        <h1 className='text-center'>Create Game</h1>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <label htmlFor='nickName'>Enter Nick name</label>
            <input
              type='text'
              name='nickName'
              value={nickName}
              onChange={onChange}
              placeholder='Enter nick name'
              className='form-control'
            />
          </div>
          <button className='btn btn-primary' type='submit'>
            Submit
          </button>
        </form>
      </div>
      <div className='col-sm'></div>
    </div>
  );
};

export default CreateGame;
