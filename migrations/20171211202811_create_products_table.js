exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('products', function(table) {
      table.increments();
      table.string('name').notNullable();
      table.string('description');
      table.string('barcode').unique();
      table.string('thumbnail_url');
      table.dateTime('expiry');
      table.string('productType');
      table.timestamps();
    })
  ]);
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('products');
};
