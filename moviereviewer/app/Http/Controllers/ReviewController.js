'use strict'
const Database = use('Database')
const Movie = use('App/Model/Movie')
const Category = use('App/Model/Category')
const Review = use('App/Model/Review')
const Validator = use('Validator')
const User = use('App/Model/User')

class ReviewController {

    * store (req, res) {
      const reviewData = req.only('title','movie_id','content'/*,'urating'*/) 
      const validation = yield Validator.validate(reviewData, Review.rules)
      if (validation.fails()) {
            yield req.withOnly('title','movie_id','content'/*,'urating'*/).andWith({errors: validation.messages()}).flash()
            res.redirect('back')
            return
      }
      reviewData.user_id = req.currentUser.id;
      reviewData.urating = 5;
      const savedReview = yield Review.create(reviewData);
      const movie = yield savedReview.movie().fetch();
      movie.sum = +movie.sum + +reviewData.urating;
      movie.count = movie.count + 1;
      movie.rating = movie.sum/movie.count;

      yield movie.save()
      yield savedReview.save()
      res.redirect('/reviews')

    }

    * create (req, res) {
    const movies = yield Movie.all()
    yield res.sendView('createReview', {
      movies: movies.toJSON()
    });
  }

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
    * delete (req, res) {
    const id = req.param('id');
    const review = yield Review.find(id);

    if (req.currentUser.id !== review.user_id) {
      res.unauthorized('Access denied.')
      return
    }
    yield review.delete()
    res.redirect('/reviews')
    }
}

module.exports = ReviewController
