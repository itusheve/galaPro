const express = require('express');
const app = express();
const mongodb = require('./mongodb');
const socket_io = require('./socket-io');
const path = require('path');
const server = require('http').Server(app);
const io = require('socket.io')(server, {origins:'*:*'});

const urlController = require('./url-controller');

const cors = require('cors');

app.use(cors());

const port = 3000;

mongodb.connect(function(error){
  if(error) throw error;

}, function(){
  //Initalize SocketIO after MongoDB connection achieved.
  socket_io(io);
});


app.get('/getUrl', (req,res) => {
  urlController(req,res);
});

app.get('/', (req,res) => {
  res.redirect('/index.html');
});



//Serve ionic static files
app.use(express.static('www'));

server.listen(port,()=>{
  console.log('Server is listening at port ' + port + ' ...');
});
