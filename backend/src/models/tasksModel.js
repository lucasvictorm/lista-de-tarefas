const connection = require('./connection.js')

const getAll = async () => {
    const [tasks] = await connection.execute("SELECT * FROM tasks")
    return tasks;
};

const createTask = async (task) => {
    const {
        title
    } = task
    
    const dateUTC = new Date(Date.now()).toUTCString();
    
    const [createdTask] = await connection.execute('INSERT INTO tasks (title, status, created_at) VALUES (?, ?, ?)', [title, 'Pendente', dateUTC])

    return createdTask
}

const updateTask = async (body, id) => {
    const {
        title,
        status
    } = body;
   const updatedTask = await connection.execute('UPDATE tasks SET title=?, status=? WHERE id=?', [title, status, id]);
   return updatedTask;
}

const deleteTask = async (id) => {
     const removedTask = await connection.execute('DELETE FROM tasks WHERE id = ?', [id]);
     return removedTask;
}


module.exports = {
    getAll,
    createTask,
    updateTask,
    deleteTask
}