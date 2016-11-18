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
            yield req.withAll().andWith({errors: validation.messages()}).flash()
            res.redirect('back')
            return
        }
        
        const savedUser = yield User.create(userData);
        yield req.withAll().andWith({regmessage: true}).flash()
        res.redirect('/')
    }

}

module.exports = UserController
