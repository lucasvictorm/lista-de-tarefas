const connection = require('./connection.js')

const getAll = async () => {
    const tasks = await connection.execute("SELECT * FROM tasks")
    return tasks;
};

module.exports = {
    getAll
}