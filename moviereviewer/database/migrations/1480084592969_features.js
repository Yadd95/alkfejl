'use strict'

const Schema = use('Schema')

class FeaturesTableSchema extends Schema {

  up () {
    this.create('features', (table) => {
      table.increments()
      table.integer('movie_id').unsigned().references('id').inTable('movies')       
      table.integer('actor_id').unsigned().references('id').inTable('actors')
      table.timestamps()
    })
  }

  down () {
    this.drop('features')
  }

}

module.exports = FeaturesTableSchema
