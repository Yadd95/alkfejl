'use strict'
const Database = use('Database')

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
        res.send(user)
    }

}

module.exports = UserController
