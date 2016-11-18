'use strict'

const Schema = use('Schema')

class ReviewsTableSchema extends Schema {

  up () {
    this.create('reviews', (table) => {
      table.increments()
      table.string('title').notNullable().unique()
      table.integer('movie_id').unsigned().references('id').inTable('movies')
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.text('content')
      table.integer('urating')
      table.timestamps()
    })
  }

  down () {
    this.drop('reviews')
  }

}

module.exports = ReviewsTableSchema
