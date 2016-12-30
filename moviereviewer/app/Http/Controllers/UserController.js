'use strict'
const Database = use('Database')
const Validator = use('Validator')
const User = use('App/Model/User')
const Movie = use('App/Model/Movie')
const Category = use('App/Model/Category')
const Review = use('App/Model/Review')

class UserController {
    * profile(req,res){
        const id = req.param('id');
        const user = yield User.find(id);
        const reviews = yield user.reviews().fetch();
        const rev = reviews.toJSON();
        var n=rev.length;
        
        yield res.sendView('profile', {user: user, number: n});

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
            yield req.withOnly('username', 'password').andWith({errors: true}).flash()
            res.redirect('/login')
        }
    }

    *  logout(req,res){
        yield req.auth.logout()
        res.redirect('/')
    }

    * register (req, res){
         yield res.sendView('register');
    }
    * showlogin(req, res){
         yield res.sendView('login');
    }

    * store (req, res){

        const userData = req.all()
        const validation = yield Validator.validate(userData, User.rules)

        if (validation.fails()) {
            yield req.withAll().andWith({errors: validation.messages()}).flash()
            res.redirect('back')
            return
        }
        const reqData = req.only('username', 'email', 'password')
        const savedUser = yield User.create(reqData);// a hashelést egy hook csinálja
        yield req.withAll().andWith({regmessage: true}).flash()
        res.redirect('/')
    }
    
    * checkUserExists(req, resp) {

    let user;
    if (req.input('username')) {
      user = yield User.findBy('username', req.input('username'))
    }
    else {
      user = yield User.findBy('email', req.input('email'))
    }

    if (user) {
      resp.status(400).send('exists')
    }
    else {
      resp.send('ok')
    }
  }
  * ajaxLogin(req, res) {
    const username = req.input('username')
    const password = req.input('password')


     try {
        const login = yield req.auth.attempt(username, password) 
             res.ok('ok')
             
        } catch(error){
             res.status(403).send('denied')
        }
  }
}

module.exports = UserController
