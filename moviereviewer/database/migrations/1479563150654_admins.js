'use strict'

const Schema = use('Schema')

class AdminsTableSchema extends Schema {

  up () {
    this.create('admins', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.timestamps()
    })
  }

  down () {
    this.drop('admins')
  }

}

module.exports = AdminsTableSchema
