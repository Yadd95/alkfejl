'use strict'

const Lucid = use('Lucid')

class User extends Lucid {
  static get rules () {
        return {
            username: 'required|unique:users',
            email: 'required|email|unique:users',
            password: 'required',
        }        
   }

  apiTokens () {
    return this.hasMany('App/Model/Token')
  }

  reviews () {
    return this.hasMany('App/Model/Review')
  }


}

module.exports = User
