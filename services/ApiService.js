const yaml = require('js-yaml');
const fs = require('fs');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

(function(exports){

  function ApiService(config = getYamlConfig(__dirname + '/../.secret.yml')) {
    this.config = config
  }

  ApiService.prototype.getProductData = (callback) => {

    var anHttpRequest = new XMLHttpRequest();

    anHttpRequest.onreadystatechange = function() {
       if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
         callback(anHttpRequest.responseText);
     }

     anHttpRequest.open( "GET", this.config["tesco"]["productUrl"], true );
     anHttpRequest.setRequestHeader("Ocp-Apim-Subscription-Key",this.config["tesco"]["key"]);
     anHttpRequest.send( null );
   };

   exports.ApiService = ApiService;
})(this);


function getYamlConfig(filename) {
  try {
    this.config = yaml.safeLoad(fs.readFileSync(filename, 'utf8'));
    const indentedJson = JSON.stringify(config, null, 4);
    // console.log(indentedJson);
  } catch (e) {
    console.log(e);
  }

}


function getGroceryData() {
  fetch(config['tesco']['groceriesUrl']).then(function(data) {
    let product = data.results;
    return product.map(function(author) {
      let li = createNode('li'),
        img = createNode('img'),
        span = createNode('span');
      img.src = author.picture.medium;
      span.innerHTML = `${author.name.first} ${author.name.last}`;
      append(li, img);
      append(li, span);
      append(ul, li);
    })
  })
    .catch(function(error) {
      console.log(error);
    });
};
