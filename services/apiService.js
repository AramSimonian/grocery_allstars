var request = require('request');


(function(exports) {
  var ApiService = function() {

    return {
      getTest: () => {
        request('http://www.google.com', function (error, response, body) {
          if (!error && response.statusCode == 200) {
            console.log(body) // Print the google web page.
          }
        })
      }
    }
  };

  exports.ApiService = ApiService;
})(this);git 