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

app.set( 'port', ( process.env.PORT || 3000 ));

mongodb.connect(function(error){
  if(error) throw error;

}, function(){
  //Initalize SocketIO after MongoDB connection achieved.
  socket_io(io);
});


app.get('/getUrl', (req,res) => {
  urlController(req,res);
});


app.get('*', (req,res) => {
  res.sendFile(path.join(__dirname,'www','index.html'));
});
//Serve ionic static files
app.use(express.static(path.join(__dirname,'www')));

server.listen(app.get('port'),()=>{
  console.log('Server is listening at port ' + app.get('port') + ' ...');
});
