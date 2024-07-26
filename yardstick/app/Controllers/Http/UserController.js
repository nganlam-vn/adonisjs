'use strict'
const Database = use('Database')
const User = use('App/Models/User')

class UserController {
        async store({ view}) {
            const user = new User()
            user.username = 'katties'
            user.email = 'katies@gmail.com'
            user.password ='123456'
            await user.save();
    
            //fetch all users
            const users = await User.all();
            return view.render('index', {users: users.toJSON()}) // render the users view
        }
        async index() {
           const result =  await User.find(1)
           return result
        }
        async update() {
            const user = await User.find(1)
            user.username = 'updated user'
            await user.save()
        }
        async tryfill(){
            const user = new User()
            user.username = 'Emily'
            user.email = 'emily@gmail.com'
            user.password = '123456'

            user.fill({username: 'name changed', email: 'changed', password: 'changed'}) // remove existing values, only set username.
            await user.save()
        }
        async trymerge(){ 
            const user = new User()
            user.fill({username: 'name', email: 'email', password: 'password'})
            user.merge({username: 'lee'}) // only set username
            await user.save()
        }
        async tryCreate(request){ //error
            const userData = request.only(['username', 'email', 'password'])
            const user = await User.create(userData)
            return user
        }

        async bulkUpdate(){
            await User.query().where('username', 'lee').update({password: 'lee123'})
        }
        async delete(req){
            const user = await User.find(req.params.id)
            await user.delete()
        }
        async bulkDelete(){
            await User.query().where('username', 'name changed').delete()
        }
}

module.exports = UserController
