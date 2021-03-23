const axios = require('axios');

const connectedUsers = [];

const socket = (http, server) => {
  const io = require('socket.io')(http);
  io.listen(server);

  io.on('connection', (socket) => {
    let handshake = socket.handshake;
    console.log(handshake.headers.referer);
    console.log(`a user has connected from ${handshake.address}`);
    socket.on('userflip', (user) => {
      let userFound = false;
      for (var i = 0; i < connectedUsers.length; i++) {
        if (connectedUsers[i].id === socket.id) {
          userFound = true;
          break;
        }
      }
      if (!userFound) {
        connectedUsers.push({
          name: user.name,
          id: socket.id,
          addr: handshake.address,
        });
        console.log(connectedUsers);
      }
      console.log(`${user.name} is flipping the coin.`);
      axios
        .get('http://localhost:3000/api/v1/coin/')
        .then((response) => {
          console.log(response.data);
          io.emit('announcement', {
            status: 'success',
            name: user.name,
            result: response.data.data.result,
          });
        })
        .catch((err) => {
          io.emit('announcement', {
            status: 'error',
            message: `${user.name} dropped the coin on the floor.`,
          });
          console.log(err);
        });
    });
    socket.on('disconnect', () => {
      for (var i = 0; i < connectedUsers.length; i++) {
        if (connectedUsers[i].id === socket.id) {
          const name = connectedUsers[i].name;
          connectedUsers.splice(i, 1);
          console.log(connectedUsers);
          return console.log(`${name} has disconnected.`);
        }
      }
      console.log(connectedUsers);
      return console.log(`A user has disconnected`);
    });
  });
};

module.exports = socket;
