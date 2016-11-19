'use strict'
const Database = use('Database')
const Movie = use('App/Model/Movie')
const Category = use('App/Model/Category')
const Review = use('App/Model/Review')
const Validator = use('Validator')
const User = use('App/Model/User')

class ReviewController {
    
    * index (req, res) {
    yield res.sendView('main');
    
  }
    * movies(req,res){
        const categories = yield Category.all()
        const movies = yield Movie.all()
        const id = req.currentUser.id;
        if (id){
        const user = yield User.find(id);
        const adminaccess = yield user.access().fetch();
        var access = false;
         if(adminaccess.isEmpty())
         {
          access = false;
         }else{
          access = true;
         }
        }else {
          const user = null;
          var access= false;
        }

       

        yield res.sendView('movies', {
        categories: categories.toJSON(),
        movies: movies.toJSON(),
        adminaccess: access
        });

 
        




    }
}

module.exports = ReviewController
