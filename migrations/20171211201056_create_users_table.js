exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', function(table) {
      table.increments();
      table.string('email').unique();
      table.string('password');
      table.string('firstName');
      table.string('lastName');
      table.timestamps();
    })
  ]);
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
