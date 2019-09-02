
const validateUrl = function(URL){

  var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;

  var regex = new RegExp(expression);

  if(URL.match(regex)){
    return true;
  }

  return false;
}

module.exports = validateUrl;
