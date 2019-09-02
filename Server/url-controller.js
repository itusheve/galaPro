const url = require('url');
const url_validator = require('./url-validator');
const DEFAULT_URL = 'http://google.com';
const API_PARAMS = {
  REDIRECT : 'REDIRECT',
  URL : 'URL'
}

module.exports = function(req,res){
  let queryData = url.parse(req.url, true).query;

  if(queryData[API_PARAMS.REDIRECT] == 'true') {

    if(url_validator(queryData[API_PARAMS.URL])){
      res.send({message: 'Redirecting...'});

    } else if(DEFAULT_URL){
      res.send({message: 'Redirecting...',defaultURL: DEFAULT_URL});
    } else {
      res.status(500).send(({error : 'No Default URL'}));
    }

  } else {
    queryData[API_PARAMS.URL] ? res.status(500).send(({error : 'Please check redirect when sending a URL'})) : res.send();
  }
}
