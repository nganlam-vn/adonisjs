'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserTasksSchema extends Schema {
  up () {
    this.create('user_tasks', (table) => {
      table.increments()
      table.string('task_name', 80).notNullable()
      table.string('task_description', 254)
      table.date('create_date').notNullable()
      table.date('completed_date')
      table.boolean('is_completed').defaultTo(false)
      table.integer('user_id').unsigned().notNullable()
      table.foreign('user_id').references('id').inTable('users').onDelete('cascade')
      table.timestamps()
    })
  }

  down () {
    this.drop('user_tasks')
  }
}

module.exports = UserTasksSchema
