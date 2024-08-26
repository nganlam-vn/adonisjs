'use strict'
const Database = use('Database')
const Task = use('App/Models/Task')

class TaskController {
    async getAllTasks(){
        const tasks = await Task.all()
        if(tasks){
            return tasks
        }
        else{
            return 'No task found!'
        }
    }

    async getTasksByUserId({params, response}) {
        try{
            // Lấy user_id từ tham số URL
            const userId = params.user_id

            // Truy vấn để lấy danh sách task theo user_id
            const tasks = await Task.query().where('user_id', userId).fetch()  //fetch() se tra ve 1 co1lection
            if(tasks.rows.length > 0){
                return response.json({
                    status: 'success',
                    data: tasks
                })
            }            // Trả về danh sách task
            else{
                return response.json({
                    status: 'Task not found!',
                    data: tasks
                })
            }
        } 
        catch (error) {
        // Xử lý lỗi (nếu có)
        return response.status(500).json({
            status: 'error',
            message: 'Something went wrong',
            error: error.message
            })
        }
}

    async addTasks({request, response}) {
        const task = new Task()
        try{
            const body = request.only(['user_id','task_name', 'task_description', 'create_date'])
            task.user_id = body.user_id
            task.task_name = body.task_name
            task.task_description = body.task_description
            task.create_date = body.create_date
            await task.save()
            return response.json({
                message: 'Task created!',
                data: task
            })
        }
        catch (error) {
            return response.status(500).json({
                status: 'error',
                message: 'Something went wrong',
                error: error.message
            })
        }
        
        // console.log(request.all())
       
    }
    

    async updateById({params, request, response}) {
        try{
            // Lấy task_id từ tham số URL
            const taskId = params.task_id

            const tasks = await Task.query().where('id', taskId ).first() 
            if(tasks){
                const body = request.only(['user_id','task_name', 'task_description', 'create_date', 'completed_date', 'is_completed'])
                tasks.user_id = body.user_id
                tasks.task_name = body.task_name
                tasks.task_description = body.task_description
                tasks.create_date = body.create_date
                tasks.completed_date = body.completed_date
                tasks.is_completed = body.is_completed
                await tasks.save()
                return response.json({
                    status: 'Updated successfully!',
                    data: tasks
                })
            }
            else{
                return response.json({
                    status: 'Task not found!',
                    data: tasks
                })
            }
           
        } 
        catch (error) {
        // Xử lý lỗi (nếu có)
        return response.status(500).json({
            status: 'error',
            message: 'Something went wrong',
            error: error.message
            })
        }
    }

    async deleteById({params, response}) {
        try{
            // Lấy task_id từ tham số URL
            const taskId = params.task_id

            const tasks = await Task.query().where('id', taskId ).first() 
            if(tasks){
                await tasks.delete()
                return response.json({
                    status: 'Deleted successfully!',
                    data: tasks
                })
            }
            else{
                return response.json({
                    status: 'Task not found!',
                    data: tasks
                })
            }
           
        } 
        catch (error) {
        // Xử lý lỗi (nếu có)
        return response.status(500).json({
            status: 'error',
            message: 'Something went wrong',
            error: error.message
            })
        }
    }

}
module.exports = TaskController
