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