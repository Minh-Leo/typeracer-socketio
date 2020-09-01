import React from 'react';

const getScoreBoard = (players) => {
  const scoreBoard = players.filter((player) => player.WPM !== -1);
  return scoreBoard.sort((a, b) =>
    a.WPM > b.WPM ? -1 : b.WPM > a.WPM ? 1 : 0
  );
};

const ScoreBoard = ({ players }) => {
  const scoreBoard = getScoreBoard(players);
  console.log(scoreBoard);

  if (scoreBoard.length === 0) return null;
  return (
    <table className='table table-striped my-3'>
      <thead>
        <tr>
          <th scope='col'>#</th>
          <th scope='col'>User</th>
          <th scope='col'>WPM</th>
        </tr>
      </thead>
      <tbody>
        {scoreBoard.map((player, index) => {
          return (
            <tr key={index}>
              <th scope='row'>{index + 1}</th>
              <th>{player.nickName}</th>
              <th>{player.WPM}</th>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default ScoreBoard;
