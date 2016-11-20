'use strict'

const Schema = use('Schema')

class MoviesTableSchema extends Schema {

  up () {
    this.create('movies', (table) => {
      table.increments()
      table.string('title').notNullable().unique()
      table.string('director').notNullable()
      table.string('origin',2).notNullable()
      table.integer('category_id').unsigned().references('id').inTable('categories') 
      table.text('plot') 
      table.integer('sum')
      table.integer('count')
      table.integer('rating')
      table.timestamps()
    })
  }

  down () {
    this.drop('movies')
  }

}

module.exports = MoviesTableSchema
