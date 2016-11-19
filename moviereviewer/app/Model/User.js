'use strict'

const Lucid = use('Lucid')

class User extends Lucid {

  static boot () {
    super.boot();

    this.addHook('beforeCreate','User.encryptPassword')
  }

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
  access () {
    return this.hasMany('App/Model/Admin')
  }


}

module.exports = User
