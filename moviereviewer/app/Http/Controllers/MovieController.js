'use strict'
const Database = use('Database')
const Movie = use('App/Model/Movie')
const Category = use('App/Model/Category')
const Review = use('App/Model/Review')
const Validator = use('Validator')
const User = use('App/Model/User')
const Score = use('App/Model/Score')
const Actor = use('App/Model/Actor')
const Feature = use('App/Model/Feature')

class MovieController {

    * store (req, res) {
      const incMovieData = req.only('title','director','origin','category_id','plot','release','writer', 'stars'/*,'avatar'*/) 
      const validation = yield Validator.validate(incMovieData, Movie.rules)

      if (validation.fails()) {
            yield req.withOnly('title','director','origin','category_id','plot','release','writer', 'stars').andWith({errors: validation.messages()}).flash()
            res.redirect('back')
            return
      }
      /* színészek adatainak feldolgozása */
      const starsData = incMovieData.stars.split(/[,]+/);
      var star = [];
      var stars = [];
      var i =0;
      starsData.forEach(function(s){
        star = s.split(/[ ]+/);

        stars[i] = star.filter(v=>v!='');//empty string kidobása 
        ++i;
      })
      //a film adatainak kibővítése
      const movieData = req.only('title','director','origin','category_id','plot','release','writer')
      movieData.sum=0;
      movieData.count=0;
      movieData.rating=0;
      const movie = yield Movie.create(movieData);
     yield movie.save()
      /* megkeresésük -> ha léteznek, az id elmentése, ha nem, akkor új színész létrehozása */
      const actors = yield Actor.all()
      var freshActors = [];
      var establishedActors = [];
      var j=0;
      var y=0;
      var st = '';
      stars.forEach(function(s){
        var newactor = true;
        var actorid = 0;
        actors.forEach(function(a){
          if(s[0]==a.first_name && s[s.length-1]==a.last_name){
            newactor = false; 
            actorid = a.id;
            var splitmiddlename = '';
            st+= s[1] + ' ' + a.middle_name
            if(s.length==2 && (a.middle_name!=''&&a.middle_name!=null)){
              
               newactor = true;
               actorid = 0;
            }
            if(a.middle_name!=null) splitmiddlename= a.middle_name.split(/[ ]+/)
            for(var i =1; i<s.length-1; i++){
              if(s[i]==splitmiddlename[i-1]){
                newactor = false;
                actorid = a.id;
              }else{
                newactor = true;
                 actorid = 0;
              }
            }
          }
          }
         

        )                   
      if(newactor){
        const actorData = {'first_name':s[0],'middle_name':'', last_name:s[s.length-1]}
        for(var i =1; i<s.length-1; i++){
          if(i==1)actorData.middle_name+= s[1];
          else  actorData.middle_name+= ' '+s[i];
        }
        freshActors[j]=actorData;
        j++;
      }else{
        if(actorid!=0){
          establishedActors[y] = actorid;
          ++y;
        }
      }
      })
      //új színészek lérehozása + szereplések létrehozása
      for(var k=0; k<freshActors.length;k++){
        const freshActor = yield Actor.create(freshActors[k]);
        yield freshActor.save();
        const newFeature = {'movie_id': movie.id, 'actor_id':freshActor.id}
        const addFeature = yield Feature.create(newFeature)
        yield addFeature.save();
      }
      for (var k=0; k<establishedActors.length;k++){
        const newFeature = {'movie_id': movie.id, 'actor_id':establishedActors[k]}
        const addFeature = yield Feature.create(newFeature)
        yield addFeature.save();
      }
      res.redirect('/movies')

    }

    * create (req, res) {
    const categories = yield Category.all()
    const user = yield User.find(req.currentUser.id);
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

    if (!access) {
      res.unauthorized('Access denied.')
      return
    }

    yield res.sendView('createMovie', {
      categories: categories.toJSON()
    });
    }


  * delete (req, res) {
    const id = req.param('id');
    const user = yield User.find(req.currentUser.id);
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

    if ( !access) {
      res.unauthorized('Access denied.')
      return
    }
    const movie = yield Movie.find(id);
    const reviews = yield movie.reviews().fetch();
    //a filmhez tartozó bemutatók törlése
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
    //a filmhez tartozó szereplések törlése
    const features = yield movie.stars().fetch();
    var county=0; 
    var idy=[];
    features.forEach( function (f)
    {    
     idy[county] = +f.id;
     county+=1;
    });
    var curry;
    for (var i=0; i<county; i++){
      curry = yield Feature.find(idy[i]);
      yield curry.delete();
    }
    yield movie.delete()
    !req.ajax() ? res.redirect('/movies') : res.send('ok')
  }
  * showReviews(req,res){
    const id = req.param('id');
    const movie = yield Movie.find(id);
    const reviews = yield movie.reviews().fetch();
    const users = yield User.all();
    const scores = yield movie.scores().fetch();

        if (req.currentUser){
              const uid = req.currentUser.id;
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
    const features = yield movie.stars().fetch();
    const actors = yield Actor.all();
    if (req.currentUser){
    const uid = req.currentUser.id;
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
      features: features.toJSON(),
      actors: actors.toJSON(),
      adminaccess: access
    });

  }
  * modify(req,res){
    const categories = yield Category.all()
    const user = yield User.find(req.currentUser.id);
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

    if ( !access) {
      res.unauthorized('Access denied.')
      return
    }
    const id = req.param('id');
    const movie = yield Movie.find(id);
    const features = yield movie.stars().fetch();
    var actors = [];
    var i =0;
    features.forEach(function(f){
      actors[i] = f.actor_id;
      ++i;
    })
    for(var j=0; j<actors.length;j++){
      actors[j] = yield Actor.find(actors[j]);
    }
    var stars = "";
    for(var j=0; j<actors.length;j++){
      if(j!=0) stars+=', '
      if(actors[j].middle_name!=null&&actors[j].middle_name!='')stars += actors[j].first_name + ' '+actors[j].middle_name + ' '+actors[j].last_name
      else stars += actors[j].first_name + ' '+actors[j].last_name
  }
    yield res.sendView('modifyMovie', {
      categories: categories.toJSON(),
      movie: movie.toJSON(),
      stars: stars
    });

  }
  * edit (req, res){
    const movieData = req.only('title','director','origin','category_id','plot','release','writer','stars') 
    const validation = yield Validator.validate(movieData, Movie.rules);
    const id = req.param('id');
    if (validation.fails()) {
            yield req.withOnly('title','director','origin','category_id','plot','release','writer','stars').andWith({errors: validation.messages()}).flash()
            res.redirect('back')
            return
    }
    const oldmovie = yield Movie.find(id);

    const oldstars = yield oldmovie.stars().fetch();
    const starsData = movieData.stars.split(/[,]+/);
    var star = [];
    var stars = [];
    var i =0;
    starsData.forEach(function(s){
      star = s.split(/[ ]+/);

      stars[i] = star.filter(v=>v!='');//empty string kidobása 
      ++i;
    })

    oldmovie.title = movieData.title;
    oldmovie.director = movieData.director;
    oldmovie.origin = movieData.origin;
    oldmovie.category_id = movieData.category_id;
    oldmovie.plot = movieData.plot;
    oldmovie.writer = movieData.writer;
    oldmovie.release = movieData.release;


    //színészmódosítások 
    const actors = yield Actor.all();
    var freshActors = [];
    var establishedActors = []
    var j = 0;
    var y = 0;
    stars.forEach(function(s){
        var newactor = true;
        var actorid = 0;
        actors.forEach(function(a){
          if(s[0]==a.first_name && s[s.length-1]==a.last_name){
            newactor = false; 
            actorid = a.id;
            var splitmiddlename = '';
            if(s.length==2 && (a.middle_name!=''&&a.middle_name!=null)){
              
               newactor = true;
               actorid = 0;
            }
            if(a.middle_name!=null) splitmiddlename= a.middle_name.split(/[ ]+/)
            
            
            for(var i =1; i<s.length-1; i++){
              if(s[i]==splitmiddlename[i]){
                newactor = false;
                actorid = a.id;
              }else{
                newactor = true;
                 actorid = 0;
              }
            }
          }
          } 
        )                   
      if(newactor){
        const actorData = {'first_name':s[0],'middle_name':'', last_name:s[s.length-1]}
        for(var i =1; i<s.length-1; i++){
          if(i==1)actorData.middle_name+= s[1];
          else  actorData.middle_name+= ' '+s[i];
        }
        freshActors[j]=actorData;
        j++;
      }else{
        if(actorid!=0){
          establishedActors[y] = actorid;
          ++y;
        }
      }
      })
      //régi színészek törlése
      var count=0; 
      var idy=[];
      oldstars.forEach( function (f)
      {    
      idy[count] = +f.id;
      count+=1;
      });
      var curr;
      for (var i=0; i<count; i++){
      curr = yield Feature.find(idy[i]);
      yield curr.delete();
      }

      //feltöltés
      for(var k=0; k<freshActors.length;k++){
        const freshActor = yield Actor.create(freshActors[k]);
        yield freshActor.save();
        const newFeature = {'movie_id': oldmovie.id, 'actor_id':freshActor.id}
        const addFeature = yield Feature.create(newFeature)
        yield addFeature.save();
      }
      for (var k=0; k<establishedActors.length;k++){
        const newFeature = {'movie_id': oldmovie.id, 'actor_id':establishedActors[k]}
        const addFeature = yield Feature.create(newFeature)
        yield addFeature.save();
      }



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
        
        if (req.currentUser){
          const id = req.currentUser.id;
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

        if (req.currentUser){
          const id = req.currentUser.id;
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
