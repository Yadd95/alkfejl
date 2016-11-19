'use strict'

const Schema = use('Schema')

class RatingsTableSchema extends Schema {

  up () {
    this.create('ratings', (table) => {
      table.increments()
      table.integer('movieid').unsigned().references('id').inTable('movies')

      table.timestamps()
    })
  }

  down () {
    this.drop('ratings')
  }

}

module.exports = RatingsTableSchema
