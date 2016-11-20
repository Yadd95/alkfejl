'use strict'

const Schema = use('Schema')

class ScoresTableSchema extends Schema {

  up () {
    this.create('scores', (table) => {
      table.increments()
      table.integer('movie_id').unsigned().references('id').inTable('movies')
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.integer('review_id').unsigned().references('id').inTable('reviews')
      table.integer('rating_1').unsigned()
      table.integer('rating_2').unsigned()
      table.integer('rating_3').unsigned()
      table.integer('rating_4').unsigned()
      table.integer('rating_5').unsigned()
      table.integer('rating_6').unsigned()
      table.integer('rating_overall').unsigned()

      table.timestamps()
    })
  }

  down () {
    this.drop('scores')
  }

}

module.exports = ScoresTableSchema
