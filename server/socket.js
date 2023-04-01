const express = require('express'); 

const app = express(); 



// const server = require('http').createServer(app);

let io;
module.exports = class socket{
   static createIo(server){
    io = require('socket.io')(server, 
      {
        cors:
        {
          origin: "*",
          methods: ["GET", "POST"]
        }
      });
      return io;
  }

  static updateStatistics(){
    console.log('ssstttaaattt')
    io.emit('stat');
  }
}