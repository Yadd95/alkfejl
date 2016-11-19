'use strict'
const Database = use('Database')
const Validator = use('Validator')
const User = use('App/Model/User')
const Movie = use('App/Model/Movie')
const Category = use('App/Model/Category')
const Review = use('App/Model/Review')

class UserController {
    * profile(req,res){
        const id = req.currentUser.id;
        const user = yield User.find(id);
        const reviews = yield user.reviews().fetch();
        const rev = reviews.toJSON();
        var n=rev.length;
        
        yield res.sendView('profile', {number: n});

    }

    * reviews(req, res){
        const categories = yield Category.all()
        const movies = yield Movie.all()
        const id = req.currentUser.id;
        const user = yield User.find(id);
        const reviews = yield user.reviews().fetch();
        yield res.sendView('reviews', {
        reviews: reviews.toJSON(),
        user: user.toJSON(),
        categories: categories.toJSON(),
        movies: movies.toJSON()
        });
    }

    * login (req, res){
        //const userData = req.all()
        const user = req.input('username')
        const password = req.input('password')

        try {
        const login = yield req.auth.attempt(user, password) 
            if (login) {
                res.redirect('/')
                return
            }
        } catch(error){
            yield req.withOnly('email', 'password').andWith({errors: true}).flash()
            res.redirect('/')
        }
    }

    *  logout(req,res){
        yield req.auth.logout()
        res.redirect('/')
    }

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
