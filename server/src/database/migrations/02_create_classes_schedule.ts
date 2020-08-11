import Knex from 'knex';
import { table } from 'console';

export async function up(knex:Knex){
  return knex.schema.createTable('classes_schedule', table => {
    
    table.increments('id').primary();

    table.integer('week_day').notNullable();
    table.integer('from').notNullable();
    table.integer('to').notNullable();

    table.integer('class_id')
      .notNullable()
      .references('id')
      .inTable('classses')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

  });
}


export async function down(knex:Knex){
  return knex.schema.dropSchema('classes_schedule');
}