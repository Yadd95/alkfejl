'use strict'

const Lucid = use('Lucid')

class Movie extends Lucid {

  static get rules () {
        return  {
           title: 'required|unique:users', 
           director: 'required',
           origin: 'required',
           category_id: 'required',
           plot: 'required',
           writer: 'required',
           stars: 'required',
           release: 'required'
    }     
   }

  category () {
    return this.belongsTo('App/Model/Category')
  }

  reviews () {
    return this.hasMany('App/Model/Review')
  }

  scores () {
    return this.hasMany('App/Model/Score')
  }
  
  stars () {
    return this.hasMany('App/Model/Feature')
  }
}

module.exports = Movie
