'use strict'
const Database = use('Database')
const User = use('App/Models/User')

class UserController {
    async login({request, response}){
        
        
        const body = request.only(['username', 'password']) // Lấy thông tin người dùng từ request
        // // Xác thực người dùng
        // const token = await auth.attempt(username, password)
        let user = null
        user = await User.findBy('username', body.username) //find user by username
        if(user){
            if(user.password === body.password && user.username === body.username){
                return response.status(200).json({
                    message: 'Login successful!',
                      // Trả về token và thông tin người dùng (bao gồm ID)
                    // user: user,
                    // token: token
                })
            }
            else {
                // Return failure response for incorrect password
                return response.status(401).json({
                    message: 'Incorrect password',
                });
            }
        }
        
        return response.status(404).json({
            message: 'User not found',
        });

    }
    //CRUD
    async getUsers(){
        const users = await User.all()
        return users
    }
        async addUsers({request, response}) {
            const user = new User()
            // console.log(request.all())
            const body = request.only(['username', 'email', 'password'])
            user.username = body.username
            user.email = body.email
            user.password = body.password
            await user.save()
            return response.json({message: 'User created!'})
        }
        async getUserById({request}) {
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

}

module.exports = UserController
