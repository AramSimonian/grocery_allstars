const yaml = require('js-yaml');
const fs = require('fs');

(function(exports){

  function ApiService(config = getYamlConfig(__dirname + '/../.secret.yml')) {
    this.config = config
  }

  ApiService.prototype.getProductData = () => {
    fetch(config['tesco']['productUrl']).then(function(data) {
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
    }).catch(function(error) {
      console.log(error);
    });
  };

  module.exports = ApiService;
})(this);


function getYamlConfig(filename) {
  try {
    this.config = yaml.safeLoad(fs.readFileSync(filename, 'utf8'));
    const indentedJson = JSON.stringify(config, null, 4);
    console.log(indentedJson);
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

