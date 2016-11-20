'use strict'
const Database = use('Database')
const Movie = use('App/Model/Movie')
const Category = use('App/Model/Category')
const Review = use('App/Model/Review')
const Validator = use('Validator')
const User = use('App/Model/User')
const Score = use('App/Model/Score')

class MovieController {

    * store (req, res) {
      const movieData = req.only('title','director','origin','category_id','plot') 
      const validation = yield Validator.validate(movieData, Movie.rules)
      if (validation.fails()) {
            yield req.withOnly('title','director','origin','category_id','plot').andWith({errors: validation.messages()}).flash()
            res.redirect('back')
            return
      }
      movieData.sum=0;
      movieData.count=0;
      movieData.rating=0;
      const movie = yield Movie.create(movieData);

      yield movie.save()
      res.redirect('/movies')

    }

    * create (req, res) {
    const categories = yield Category.all()
    yield res.sendView('createMovie', {
      categories: categories.toJSON()
    });
    }


  * delete (req, res) {
    const id = req.param('id');
    const movie = yield Movie.find(id);
    const reviews = yield movie.reviews().fetch();
    var count=0; 
    var idx=[];
    reviews.forEach( function (review)
    {    
     idx[count] = +review.id;
     count+=1;
    });
    var curr;
    for (var i=0; i<count; i++){
      curr = yield Review.find(idx[i]);
      yield curr.delete();
    }
    yield movie.delete()
    res.redirect('/movies')
  }
  * showReviews(req,res){
    const id = req.param('id');
    const movie = yield Movie.find(id);
    const reviews = yield movie.reviews().fetch();
    const users = yield User.all();
    const scores = yield movie.scores().fetch();
    yield res.sendView('showreviews', {
        reviews: reviews.toJSON(),
        movie: movie.toJSON(),
        users: users.toJSON(),
        scores: scores.toJSON()

        });
  }

}

module.exports = MovieController
