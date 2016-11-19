'use strict'

const Lucid = use('Lucid')

class Admin extends Lucid {
   user () {
    return this.belongsTo('App/Model/User')
  }

}

module.exports = Admin
