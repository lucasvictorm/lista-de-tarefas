const express = require('express')
const tasksController = require('./controllers/tasksController.js')
const tasksMiddleware = require('./middlewares/tasksMiddleware.js')

const router = express.Router()

router.get('/tasks', tasksController.getAll)
router.post('/tasks', tasksMiddleware.validateFieldTitle, tasksController.createTask)
router.put('/tasks/:id',
    tasksMiddleware.validateFieldTitle, 
    tasksMiddleware.validateFieldStatus, 
    tasksController.updateTask)
router.delete('/tasks/:id', tasksController.deleteTask)


module.exports = router