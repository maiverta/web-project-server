const express = require('express'); 
const mongoose = require('mongoose');
const router = require ('./router');
const socket = require ('./socket');
const api = require ('./api');


const config = require('./config');
const bodyParser = require('body-parser');
const app = express(); 
const path = require('path');
const server = require('http').createServer(app);
const cors = require("cors")
app.use(cors())


//app.js


//after creating your server etc

const ConnectionString = config.mongoConnectionString;

mongoose.connect(ConnectionString,{useNewUrlParser:true, useUnifiedTopology: true },async (err)=>{
  if(err) {
      console.log(err.message)
  }else{
      console.log("Successfully Connected to mongodb");
      await api.getApiData()
  }
})

//middleware to make sure ContentType header is matching the type option, and to parse query strings with the queryStrings library
app.use(bodyParser.urlencoded({extended: false})); 

//middleware to parse body requests to json object
app.use(bodyParser.json());

//middleware to handle cors and preflight requests
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  if (req.method === 'OPTIONS') {
      res.header("Access-Control-Allow-Methods", "PUT, POST, DELETE, GET");
      return res.status(200).json({});
  }
  next();
});

//sets the router
app.use(router);

const socketIO  = socket.createIo(server);
console.log('ffff')

  socketIO.on('connection', (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`)  
    socket.on("message", data => {
      socketIO.emit("messageResponse", data)
    })

    socket.on("typing", data => (
      socket.broadcast.emit("typingResponse", data)
    ))

    socket.on("newUser", data => {
      users.push(data)
      socketIO.emit("newUserResponse", users)
    })
 
    socket.on('disconnect', () => {
      console.log('🔥: A user disconnected');
      // users = users.filter(user => user.socketID !== socket.id)
      // socketIO.emit("newUserResponse", users)
      socket.disconnect()
    });
});

// server listen on port in config
server.listen(config.port, () => {

  console.log(`Listening on port ${config.port}`)})



