exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', function(table) {
      table.increments();
      table.string('uName');
      table.string('uTel');
      table.string('uImg');
      table.timestamps();
    }),
    knex.schema.createTable('timelab', function(table) {
      table.increments();
      table.string('name');
      table.time('checkTime')
      table.boolean('success');
      table.boolean('late');
      table.boolean('fail');
      table.string('studyDay');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users'),
    knex.schema.dropTable('timelab')
  ]);
};