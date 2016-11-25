'use strict'

const Lucid = use('Lucid')

class Actor extends Lucid {
    roles () {
      return this.hasMany('App/Model/Feature')
    }    
}

module.exports = Actor
