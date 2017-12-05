const Product = require('../models').Product;

module.exports = {
  create(req, res) {
    return Product
      .create({
        item: "Product list",
        barcode: "1234"
      })
      .then(todo => res.status(201).send(todo))
      .catch(error => res.status(400).send(error));
  },
};
