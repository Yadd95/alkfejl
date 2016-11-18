'use strict'
const Database = use('Database')
const Validator = use('Validator')
const User = use('App/Model/User')

class UserController {
    * register (req, res){
         yield res.sendView('register');
    }
    * store (req, res){

        const userData = req.all()
        const validation = yield Validator.validate(userData, User.rules)

        if (validation.fails()) {
            res.json(validation.messages())
            return
        }
        
        const savedUser = yield User.create(userData);

        res.send(savedUser)
    }

}

module.exports = UserController
