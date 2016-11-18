'use strict'

const Lucid = use('Lucid')

class Movie extends Lucid {
  category () {
    return this.belongsTo('App/Model/Category')
  }

  reviews () {
    return this.hasMany('App/Model/Review')
  }
}

module.exports = Movie
