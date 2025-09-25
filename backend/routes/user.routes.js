const express = require('express');
const userrouter = express.Router();
const { createTask, getTasks, updateTasks, deleteTasks } = require('../controllers/taskController');
const { isAuth, admin } = require('../middleware/isAuth.js');

userrouter.get('/', isAuth, getTasks);
userrouter.put("/:id",isAuth,updateTasks)
userrouter.delete("/:id",isAuth,deleteTasks)

userrouter.post('/admin', isAuth, admin, createTask);

module.exports = userrouter;
