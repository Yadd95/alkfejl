'use strict'

const Lucid = use('Lucid')

class Movie extends Lucid {

  static get rules () {
        return  {
           title: 'required|unique:users', 
           director: 'required',
           origin: 'required',
           category_id: 'required',
           plot: 'required'
    }     
   }

  category () {
    return this.belongsTo('App/Model/Category')
  }

  reviews () {
    return this.hasMany('App/Model/Review')
  }
}

module.exports = Movie
