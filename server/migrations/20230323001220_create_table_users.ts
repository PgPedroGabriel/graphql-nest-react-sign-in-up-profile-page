exports.up = function (knex) {
  return knex.schema.createTable('users', function (table) {
    table.string('id', 36).notNullable();
    table.string('email', 255).notNullable();
    table.string('name', 255).notNullable();
    table.string('password', 255).notNullable();
    table.timestamps();
    table.primary('id');
    table.unique('id');
    table.unique('email');
  });
};

exports.down = function (knex) {
  knex.schema.dropTable('users');
};
