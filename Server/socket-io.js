
module.exports = function(io){

  var db = require('./mongodb').getConnection();

  let socketsURLMap = {};

  io.on('connection', (socket) => {

    socketsURLMap[socket.id] = {};

    var setIntervalForSocket = function (){

      return setInterval(function interval() {

        let status = socketsURLMap[socket.id].newUrlStatus;


        if(!status){
          find(socketsURLMap[socket.id].origin, (result)=>  socket.emit('url', result ? result.newUrl : ''));

        } else {
          socket.emit('url', socketsURLMap[socket.id].origin);
        }


        socketsURLMap[socket.id].newUrlStatus = !socketsURLMap[socket.id].newUrlStatus;
        return interval;
      }(), 5000);
    }

    socket.on('originURL', function(originURL) {

      socketsURLMap[socket.id].origin = originURL;

      socketsURLMap[socket.id].newUrlStatus = false;

      socketsURLMap[socket.id].intervalRef = setIntervalForSocket();

    });

    socket.on('disconnect',function(){
      console.log('socket closed');
      clearInterval( socketsURLMap[socket.id].intervalRef );
      delete socketsURLMap[socket.id];
    });

  });


  let find = function(value , cb){

      db.collection('urls').findOne({url : value},(err, result) => {
        cb(result);

    });
  }
}
