'use strict'
const Database = use('Database')
const User = use('App/Models/User')

class UserController {
    async users(){
        const users = await User.all()
        return users
    }
        async store({request, response}) {
            const user = new User()
            // console.log(request.all())
            const body = request.only(['username', 'email', 'password'])
            user.username = body.username
            user.email = body.email
            user.password = body.password
            await user.save()
            return response.json({message: 'User created!'})
        }
        async userById({request}) {
            const user = new User()
            const body = request.only(['id'])
            user.id = body.id
            const result = await User.find(user.id)
            return result
        }

        async updateById({request}) {
            const user = new User()
            const body = request.only(['id', 'username', 'email', 'password'])
            user.id = body.id
            const result = await User.find(user.id)
            result.username = body.username
            result.email = body.email
            result.password = body.password
            await result.save()
            return result
        }

        async deleteById({request, response}) {
            const user = new User()
            const body = request.only(['id'])
            user.id = body.id
            const result = await User.find(user.id)
            await result.delete()
            return response.json({message: 'User deleted!'})
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
        // async delete(req){
        //     const user = await User.find(req.params.id)
        //     await user.delete()
        // }
        async bulkDelete(){
            await User.query().where('username', 'name changed').delete()
        }
}

module.exports = UserController
