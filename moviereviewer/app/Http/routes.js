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
Route.post('/registration', 'UserController.store')


Route.get('/reviews', 'UserController.reviews').middleware('auth')
Route.get('/profile', 'UserController.profile').middleware('auth')
Route.get('/movies', 'MovieController.movies')
Route.get('/new_review', 'ReviewController.create').middleware('auth')
Route.post('/create_review', 'ReviewController.store').middleware('auth')
Route.get('/delete_r/:id', 'ReviewController.delete').middleware('auth')
Route.get('/modify_r/:id', 'ReviewController.modify').middleware('auth')
Route.post('/edit_r/:id', 'ReviewController.edit').middleware('auth')

Route.get('/new_movie', 'MovieController.create').middleware('auth')
Route.post('/create_movie', 'MovieController.store').middleware('auth')
Route.get('/delete_m/:id', 'MovieController.delete').middleware('auth')
Route.get('/modify_m/:id', 'MovieController.modify').middleware('auth')
Route.post('/edit_m/:id', 'MovieController.edit').middleware('auth')
Route.post('/filter', 'MovieController.filter')

Route.get('/movie/:id/reviews', 'MovieController.showReviews')
Route.get('/new_review/:id', 'ReviewController.create')
Route.get('/review/:id', 'ReviewController.show')
Route.get('/movie/:id/show', 'MovieController.showMovie')

