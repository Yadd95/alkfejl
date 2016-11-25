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
            password_confirm: 'required|same:password'
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
  scores () {
    return this.hasMany('App/Model/Score')
  }

}

module.exports = User
