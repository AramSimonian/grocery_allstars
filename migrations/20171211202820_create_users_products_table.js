exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users_products', function(table) {
      table.integer('user_id').references('users.id');
      table.integer('product_id').references('products.id');
      table.string('barcode').unique();
      table.timestamps();
    })
  ]);
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users_products');
};

