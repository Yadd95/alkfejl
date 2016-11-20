'use strict'

const Lucid = use('Lucid')

class Score extends Lucid {
    static get rules () {
        return  {
           rating_1: 'required',
           rating_2: 'required',
           rating_3: 'required',
           rating_4: 'required', 
           rating_5: 'required',
           rating_6: 'required'
    }     
   }

    user () {
    return this.belongsTo('App/Model/User')
  }

    movie () {
    return this.belongsTo('App/Model/Movie')
  }

    review () {
    return this.belongsTo('App/Model/Review')
  }
}

module.exports = Score
