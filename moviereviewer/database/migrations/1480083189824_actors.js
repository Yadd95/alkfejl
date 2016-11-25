'use strict'

const Schema = use('Schema')

class ActorsTableSchema extends Schema {

  up () {
    this.create('actors', (table) => {
      table.increments()
      table.string('first_name').notNullable()
      table.text('middle_name')
      table.string('origin')
      table.string('last_name').notNullable()
      table.integer('age').unsigned()
      table.timestamps()
    })
  }

  down () {
    this.drop('actors')
  }

}

module.exports = ActorsTableSchema
