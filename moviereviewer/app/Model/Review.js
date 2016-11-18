'use strict'

const Lucid = use('Lucid')

class Review extends Lucid {
    user () {
    return this.belongsTo('App/Model/User')
  }

    movie () {
    return this.belongsTo('App/Model/Movie')
  }
}

module.exports = Review
