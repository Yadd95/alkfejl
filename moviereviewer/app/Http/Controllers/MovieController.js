'use strict'
const Database = use('Database')
const Movie = use('App/Model/Movie')
const Category = use('App/Model/Category')
const Review = use('App/Model/Review')
const Validator = use('Validator')
const User = use('App/Model/User')

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

    yield movie.delete()
    res.redirect('/movies')
  }

}

module.exports = MovieController
