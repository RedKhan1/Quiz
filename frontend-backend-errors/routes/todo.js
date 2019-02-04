var express = require('express');
var router = express.Router();
var todoController = require('../controllers/todoController');
var passport = require('passport')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/getalltodos/:id', passport.authenticate('jwt', { session: false }), function(req, res, next) {
  todoController
  .findAllTodo(req.params.id)
  .then(result => {
    //console.log(result)
    res.json(result);
  })
  .catch(err => {
    res.json(err);
  })
});

router.post('/createtodo', passport.authenticate('jwt', { session: false }), function(req, res, next) {

  todoController
    .createTodo(req.body)
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      res.json(err);
    })

});

router.delete('/deletetodo/:id',passport.authenticate('jwt', { session: false }),  function(req, res) {
  todoController
  .deleteTodoById(req.params.id, req.query.todoid)
  .then(result => {
    res.json(result);
  })
  .catch(err => {
    res.json(err);
  })
})

router.put(`/updatetodo/:id`, passport.authenticate('jwt', { session: false }), function(req, res) {

  todoController
  .editTodo(req.params.id, req.body.newTodo, req.body.id)
  .then(result => {
    res.json(result);
  })
  .catch(err => {
    res.json(err);
  })

})

module.exports = router;
