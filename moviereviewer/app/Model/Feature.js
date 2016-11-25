'use strict'

const Lucid = use('Lucid')

class Feature extends Lucid {
    movie () {
      return this.belongsTo('App/Model/Movie')
    }    
    star () {
    return this.belongsTo('App/Model/Actor')
    }
}

module.exports = Feature
