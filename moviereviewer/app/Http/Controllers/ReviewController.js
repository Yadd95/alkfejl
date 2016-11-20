'use strict'
const Database = use('Database')
const Movie = use('App/Model/Movie')
const Category = use('App/Model/Category')
const Review = use('App/Model/Review')
const Validator = use('Validator')
const User = use('App/Model/User')
const Score = use('App/Model/Score')

class ReviewController {

    * store (req, res) {
      const reviewData = req.only('title','movie_id','content')
      const reviewScores = req.only('rating_1', 'rating_2', 'rating_3', 'rating_4', 'rating_5', 'rating_6') 
      const validation = yield Validator.validate(reviewData, Review.rules)
      const scoreValidaton = yield Validator.validate(reviewScores, Score.rules)
 
      if (validation.fails()) {
            yield req.withOnly('title','movie_id','content').andWith({errors: validation.messages()}).flash()
            res.redirect('back')
            return
      }
      if (scoreValidaton.fails()) {
            yield req.withOnly('rating_1', 'rating_2', 'rating_3', 'rating_4', 'rating_5', 'rating_6').andWith({scoreError: [{message: 'Invalid scores'}]}).flash()
            res.redirect('back')
            return
      }
      var urating = 0;
      for (var key in reviewScores) {
        if (reviewScores.hasOwnProperty(key)) {
          urating = +urating + +reviewScores[key];
        }
      }

      urating = ((urating/60)*100).toFixed(0);
      reviewData.user_id = req.currentUser.id;
      reviewScores.user_id=req.currentUser.id;
      reviewData.urating = urating;
      reviewScores.rating_overall = urating;
      reviewScores.movie_id = reviewData.movie_id;
      const savedReview = yield Review.create(reviewData);
      reviewScores.review_id = savedReview.id;
      const savedScore = yield Score.create(reviewScores);
      const movie = yield savedReview.movie().fetch();
      movie.sum = +movie.sum + +reviewData.urating;
      movie.count = movie.count + 1;
      movie.rating = (movie.sum/movie.count).toFixed(0);
      yield movie.save()
      yield savedReview.save()
      yield savedScore.save()
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
    const movie = yield review.movie().fetch();
    movie.sum = +movie.sum - +review.urating | 0;
    movie.count = movie.count - 1 | 0;
    movie.rating = (movie.sum/movie.count).toFixed(0) | 0;
    yield movie.save()
    yield review.delete()
    res.redirect('/reviews')
    }
}

module.exports = ReviewController
