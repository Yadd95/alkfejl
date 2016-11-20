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
    const uid = req.currentUser.id;
        if (uid){
        const user = yield User.find(uid);
           const admin = yield user.access().fetch();
        var access = false;
        var adminaccess;
        admin.forEach( function (a)
        {
          adminaccess=a;
        });
        
  
          if(adminaccess)
          {
            access = true;

          }else{
          
             access = false;
        }
        }else {
          const user = null;
          var access= false;
        }
    
    yield res.sendView('showreviews', {
        reviews: reviews.toJSON(),
        movie: movie.toJSON(),
        users: users.toJSON(),
        scores: scores.toJSON(),
        adminaccess: access

        });
  }
  * showMovie(req,res){
    const id = req.param('id');
    const movie = yield Movie.find(id);
    const uid = req.currentUser.id;
    if (uid){
    const user = yield User.find(uid);
            const admin = yield user.access().fetch();
        var access = false;
        var adminaccess;
        admin.forEach( function (a)
        {
          adminaccess=a;
        });
         
          if(adminaccess)
          {
            access = true;
          
          }else{
          access = false;
        }
    }else {
      var access= false;
    }
      yield res.sendView('showmovie',{
      movie: movie.toJSON(),
      adminaccess: access
    });

  }
  * modify(req,res){
    const categories = yield Category.all()
    const id = req.param('id');
    const movie = yield Movie.find(id);
    yield res.sendView('modifyMovie', {
      categories: categories.toJSON(),
      movie: movie.toJSON()
    });

  }
  * edit (req, res){
    const movieData = req.only('title', 'director','origin', 'category_id','plot')
    const validation = yield Validator.validate(movieData, Movie.rules);
    const id = req.param('id');
    if (validation.fails()) {
            yield req.withOnly('title','director','origin','category_id','plot').andWith({errors: validation.messages()}).flash()
            res.redirect('back')
            return
    }
    const oldmovie = yield Movie.find(id);
    oldmovie.title = movieData.title;
    oldmovie.director = movieData.director;
    oldmovie.origin = movieData.origin;
    oldmovie.category_id = movieData.category_id;
    oldmovie.plot = movieData.plot;

    yield oldmovie.save();
    res.redirect('/movie/' + id  + '/show')
  }
  * filter(req,res) {
        const cid = req.only('category_id');
        const category = yield Category.find(cid.category_id);
        var movies;        
        if(cid.category_id==0){
         movies = yield Movie.all()
        }else{
         movies = yield category.movies().fetch();
        }
        const categories = yield Category.all();
        const id = req.currentUser.id;
        if (id){
        const user = yield User.find(id);
        const admin = yield user.access().fetch();
        var access = false;
        var adminaccess;
        admin.forEach( function (a)
        {
          adminaccess=a;
        });

  
          if(adminaccess)
          {
          access = true;
          }else{
          access = false;
        }
        }else {
          const user = null;
          var access= false;
        }

       

        yield res.sendView('movies', {
        categories: categories.toJSON(),
        movies: movies.toJSON(),
        cid: cid.category_id,
        adminaccess: access
        });

    }
  

    * movies(req,res){
        const categories = yield Category.all()
        const movies = yield Movie.all()
        const id = req.currentUser.id;
        if (id){
        const user = yield User.find(id);
        const admin = yield user.access().fetch();
        var access = false;
        var adminaccess;
        admin.forEach( function (a)
        {
          adminaccess=a;
        });

  
          if(adminaccess)
          {
          access = true;
          }else{
          access = false;
        }
        }else {
          const user = null;
          var access= false;
        }

       

        yield res.sendView('movies', {
        categories: categories.toJSON(),
        movies: movies.toJSON(),
        cid: 0,
        adminaccess: access
        });

    }
}

module.exports = MovieController
