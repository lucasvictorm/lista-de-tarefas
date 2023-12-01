const tasksModel = require('../models/tasksModel.js')

const getAll = async (req, res) => {
    const tasks = await tasksModel.getAll()
    res.status(200).json(tasks)
}

module.exports = {
    getAll
}