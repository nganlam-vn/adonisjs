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

// Route.get('users', async () => {
//     return await User.findOrFail(3)
//   })
//CRUD
Route.group(() => {
    //for user
    Route.post('add/users', 'UserController.addUsers')
    Route.get('users', 'UserController.getUsers')
    Route.get('userById', 'UserController.getUserById')
    Route.put('update/userById', 'UserController.updateById')
    Route.delete('truncate/userById', 'UserController.deleteById')
    Route.post('login', 'UserController.login')

    //for task
    Route.post('add/tasks', 'TaskController.addTasks')
    Route.get('tasks', 'TaskController.getAllTasks')
    Route.get('user/:user_id/tasks', 'TaskController.getTasksByUserId')
    Route.delete('delete/task/:task_id', 'TaskController.deleteById')
    Route.put('update/task/:task_id', 'TaskController.updateById')
}).prefix('api/v1')

