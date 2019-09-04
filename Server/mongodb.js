const MongoClient = require('mongodb').MongoClient;

var _db;

module.exports = {
  connect : function(error_cb, success_cb){
    MongoClient.connect("mongodb://itamar:itamar1234@ds215988.mlab.com:15988/heroku_6mn0vpvz", function(err,client){
      if(err) error_cb(err);
      _db = client.db();
      success_cb();
      console.log('Connected To MongoDB');
    });

  },

  getConnection: () => {
    return _db;
  }

}

