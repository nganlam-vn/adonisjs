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
Route.post('store', 'UserController.store')
Route.get('users', 'UserController.users')
Route.get('userById', 'UserController.userById')
Route.put('updateById', 'UserController.updateById')
Route.delete('deleteById', 'UserController.deleteById')

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