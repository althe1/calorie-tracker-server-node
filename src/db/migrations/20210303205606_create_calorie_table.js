exports.up = function(knex) {
    return knex.schema.createTable("calorie", t => {
        t.string("id", 21).primary();
        t.integer("value").notNullable();
        t.string("user_id", 21).notNullable().references("user.id");
        t.timestamps(false, true);
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("calorie");
};