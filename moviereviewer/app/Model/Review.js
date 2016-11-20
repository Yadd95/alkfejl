'use strict'

const Lucid = use('Lucid')

class Review extends Lucid {
    static get rules () {
        return  {
           title: 'required', //kotelezo
           movie_id: 'required',
           content: 'required'/*,
           urating: 'required'*/
    }     
   }

    user () {
    return this.belongsTo('App/Model/User')
  }

    movie () {
    return this.belongsTo('App/Model/Movie')
  }
}

module.exports = Review
