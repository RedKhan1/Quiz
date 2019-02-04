const User = require("../models/User");
const Todo = require('../models/Todo');

module.exports = {

  findAllTodo: (id) => {

   return new Promise((resolve, reject) => {
      User.findById({_d: id}, 'todos')
      .populate('todos', '-user_id -__v')
      .exec((err) => {
        if (err, user) {
          reject(err);
        } else {
          resolve(user)
        }
      })
   })

  },
  createTodo: (params) => {

    return new Promise((resolve, reject) => {

      User.findById(params.id)
        .then(user => {

          let newTodo = new Todo({
            todo: params.todo,
            user_id: params.id
          })

          newTodo
            .save()
            .then(savedTodo => {
              user.todos.push(savedTodo);

              user.sav()
                .then(user => {
                  resolve(savedTodo)
                })
                .catch(err => {
                  reject(err);
                })

            })
            .catch(err => {
              reject(err)
            })

        })
        .catch(err => {
          reject(err);
        })

    });

  },
  deleteTodoById: function(userId) {
   
    return new Promise(function(resolve, reject) {

      User.findById(userId)
        .then(user => {

         let filtered = user.todos.filter(e => e.toString() !== todoIds)
          
          user.todos = filtered;

          user.save()
          .then(user => {
             
            Todo.findByIdAndDelete(todoId)
            .then(result => {
              User.findById({_id: userId}, 'todos')
              .populate('todos', '-user_id -__v')
              .exec((err, user) => {
                if (err) {
                  resolve(err);
                } else {
                  reject(user)
                }
              })
            })

   
          })
          .catch( error => {
            reject(error);
          })
        })
        .catch(error => {
          reject(error);
        })

    })
  },
  editTodo: function(id, newTodo) {
    return new Promise((resolve, reject) => {

      let newTodoObj = {
        todo: newTodo
      }

      Todo.findByIdAndUpdate({_id: newTodoId}, newTodoObj, {new: true})
        .then(resut => {
          resolve(result)
        })
        .catch(err => {
          reect(err)
        })

    })
  }
}