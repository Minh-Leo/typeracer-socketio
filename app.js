const express = require('express');
const socketio = require('socket.io');
const mongoose = require('mongoose');

const app = express();

const expressServer = app.listen(3001);
const io = socketio(expressServer);

const Game = require('./model/Game');
const QuotableAPI = require('./QuotableAPI');

mongoose.connect(
  'mongodb://localhost:27017/typeracerGame',
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log('successfully connected to db');
  }
);

io.on('connect', (socket) => {
  socket.on('create-game', async (nickName) => {
    try {
      const quotableData = await QuotableAPI();
      let game = new Game();
      game.words = quotableData;

      let player = {
        socketID: socket.id,
        isPartyLeader: true,
        nickName,
      };
      game.players.push(player);
      game = await game.save();

      const gameID = game._id.toString();
      socket.join(gameID);

      // send updated game to all sockets within game
      io.to(gameID).emit('update-game', game);
    } catch (err) {
      console.log(err);
    }
  });

  socket.on('join-game', async ({ gameID: _id, nickName }) => {
    try {
      let game = await Game.findById(_id);
      if (game.isOpen) {
        const gameID = (await game)._id.toString();
        socket.join(gameID);

        let player = {
          socketID: socket.id,
          nickName,
        };
        game.players.push(player);
        game = await game.save();

        io.to(gameID).emit('update-game', game);
      }
    } catch (err) {
      console.log(err);
    }
  });
});
