'use strict'

const Lucid = use('Lucid')

class Review extends Lucid {
    static get rules () {
        return  {
           title: 'required', //kotelezo
           movie_id: 'required',
           content: 'required'/*,
           rating_1: 'required',
           rating_2: 'required',
           rating_3: 'required',
           rating_4: 'required', 
           rating_5: 'required',
           rating_6: 'required'*/
    }     
   }

    user () {
    return this.belongsTo('App/Model/User')
  }

    movie () {
    return this.belongsTo('App/Model/Movie')
  }
    scores () {
    return this.hasOne('App/Model/Score')
  }
}

module.exports = Review
