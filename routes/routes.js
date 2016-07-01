var Todo = require('../models/todo');
var Collection =require('../models/collection');
var bodyParser = require('body-parser');

function getTodos(res) {
    Todo.find(function (err, todos) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(todos); // return all todos in JSON format
    });
}
; 
function getcollections(res) {
    Collection.find(function (err, todos) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(todos); // return all todos in JSON format
    });
}
;

module.exports = function (app) {

    // api ---------------------------------------------------------------------
    // get all todos
    app.get('/api/todos', function (req, res) {
        // use mongoose to get all todos in the database
        getTodos(res);
    });

    // create todo and send back all todos after creation
    app.post('/api/todos', function (req, res) {

        // create a todo, information comes from AJAX request from Angular
        Todo.create({
            text: req.body.text,
            done: false
        }, function (err, todo) { 
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            getTodos(res);
        });

    }); 
    app.post('/api/todos/addBusiness', function (req, res) {

        
        
        Collection.create({

           name: req.body.name,
           city:req.body.city,
           address:req.body.name2,
           business_email:req.body.name3,

    
            done: false
        }, function (err, collection) { 
            console.log(collection);
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            getcollections(res);
        });

    });

    // delete a todo
    app.delete('/api/todos/:todo_id', function (req, res) {
        Todo.remove({
            _id: req.params.todo_id
        }, function (err, todo) {
            if (err)
                res.send(err);

            getTodos(res);
        });
    });
     
    app.post('/api/todos/search', function (req, res){
        console.log(req.body.text);
        var reg=  new RegExp(req.body.text, 'i');
        Todo.find({ name: new RegExp(reg) }, function (err, todos) {
            console.log(todos);
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            res.json(todos);
        });

    }) 

    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};