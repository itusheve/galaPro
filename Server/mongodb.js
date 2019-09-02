const MongoClient = require('mongodb').MongoClient;

var _db;

module.exports = {
  connect : function(errorcb){
    MongoClient.connect("mongodb://itamar:itamar1234@ds215988.mlab.com:15988/heroku_6mn0vpvz", function(err,db){
      if(err) errorcb(err);
      _db = db;
      console.log('Connected');
    });

  },

  getConnection: function(){
    return _db;
  }

}

