'use strict'
const Database = use('Database')
const Movie = use('App/Model/Movie')
const Category = use('App/Model/Category')
const Review = use('App/Model/Review')
const Validator = use('Validator')

class ReviewController {
    
    * index (req, res) {
    yield res.sendView('main');
  }
}

module.exports = ReviewController
