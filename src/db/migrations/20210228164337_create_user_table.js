exports.up = function(knex) {
    return knex.schema.createTable("user", t => {
        t.string("id", 21).primary();
        t.string("username").notNullable().unique();
        t.string("password").notNullable();
        t.timestamps(false, true);
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("user");
};