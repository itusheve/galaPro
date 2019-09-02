const express = require('express');
const app = express();
const mongodb = require('./mongodb');
const server = require('http').Server(app);
const io = require('socket.io')(server, {origins:'*:*'});

const urlController = require('./url-controller')
const cors = require('cors');
app.use(cors());

const port = 3000;
mongodb.connect(function(error){
  if(error) throw error;
});



app.get('/', (req,res) => {
  urlController(req,res);
});


io.on('connection', (socket) => {
  console.log('socket connected');
  var interval = setInterval(() => {
    socket.emit('url',{url:'https://test'});
  }, 5000);

  socket.on('disconnect',function(){
    console.log('socket closed');
    clearInterval(interval);
  });

});

//Serve ionic static files
app.use(express.static('../www'));

server.listen(port,()=>{
  console.log('Server is listening at port ' + port + ' ...');
});
