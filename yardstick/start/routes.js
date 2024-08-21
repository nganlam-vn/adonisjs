'use strict'

const { route } = require('@adonisjs/framework/src/Route/Manager')
const database = require('../config/database')
const UserController = require('../app/Controllers/Http/UserController')

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
const User = use('App/Models/User')

// Route.get('users', async () => {
//     return await User.findOrFail(3)
//   })
//CRUD
Route.group(() => {
    Route.post('add/users', 'UserController.addUsers')
    Route.get('users', 'UserController.getUsers')
    Route.get('userById', 'UserController.getUserById')
    Route.put('update/userById', 'UserController.updateById')
    Route.delete('truncate/userById', 'UserController.deleteById')
    Route.post('login', 'UserController.login')
}).prefix('api/v1')

Route.get('fill', 'UserController.tryfill') 
Route.get('merge', 'UserController.trymerge')      
Route.get('create', 'UserController.tryCreate')
Route.get('bulkUpdate', 'UserController.bulkUpdate')
Route.get('delete/:id', 'UserController.delete')
Route.get('bulkDelete', 'UserController.bulkDelete')

// Route.on('/').render('welcome') To render a view directly (e.g. static pages), use Route.on.render:
// Route.get('/', () => 'Hello Adonis') 
// Route.route('/', () => {
//     return 'Hello Adonis'
//   }, ['GET', 'POST', 'PUT'])