'use strict'

/*
|--------------------------------------------------------------------------
| Router
|--------------------------------------------------------------------------
|
| AdonisJs Router helps you in defining urls and their actions. It supports
| all major HTTP conventions to keep your routes file descriptive and
| clean.
|
| @example
| Route.get('/user', 'UserController.index')
| Route.post('/user', 'UserController.store')
| Route.resource('user', 'UserController')
*/

const Route = use('Route')

Route.get('/', 'ReviewController.index')

Route.get('/login', 'UserController.login')
//Route.post('/login', 'UserController.postLogin')
Route.get('/logout', 'UserController.logout')

Route.get('/register', 'UserController.register')
Route.get('/registration', 'UserController.store')
//Route.post('/registration', 'UserController.postRegistration')

Route.get('/reviews', 'UserController.reviews').middleware('auth')
Route.get('/profile', 'UserController.profile').middleware('auth')
Route.get('/movies', 'ReviewController.movies')
Route.get('/new_review', 'ReviewController.create').middleware('auth')
Route.post('/create_review', 'ReviewController.store').middleware('auth')
Route.get('/delete_r/:id', 'ReviewController.delete').middleware('auth')

Route.get('/new_movie', 'MovieController.create').middleware('auth')
Route.post('/create_movie', 'MovieController.store').middleware('auth')
Route.get('/delete_m/:id', 'MovieController.delete').middleware('auth')

Route.get('/movie/:id/reviews', 'MovieController.showReviews')
Route.get('/new_review/:id', 'ReviewController.create')
Route.get('/review/:id', 'ReviewController.show')
Route.get('/movie/:id/show', 'MovieController.showMovie')
