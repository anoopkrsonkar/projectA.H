var express = require('express');
var router = express.Router();
var path = require('path');
var Todo = require('../models/todo');
var Collection =require('../models/collection');
var Tag =require('../models/tag');



/* GET home page. */
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
// get all todos

router.get('/api/searchproduct', function(req, res) {
        //console.log("here is " + req.param('product'));
        //find({ $text: { $search: req.param('product') } },
        // use mongoose to get all products in the database
        
           var reg=  new RegExp(req.param('product'), 'i');
             console.log(reg);

        
        Collection.find({ name: new RegExp(reg) },function(err, productRes) {
            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err){
                res.send(err)
            }
            //console.log("here is " +productRes);  
            res.json(productRes); // return all products in JSON format
        });
    });
        
    router.get('/api/displayproduct/', function(req, res) {
        console.log(req.param('name'));
        
        // use mongoose to get all products in the database
        Collection.find({"name" : req.param('name')}, function(err, productRes) {
            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err){
                res.send(err)
            }
            console.log(productRes);    
            res.json(productRes); // return all products in JSON format
        });
    });
    // api for multi autoselect tag
router.get('/api/todos/findAllTag',function(req,res){
    Tag.find({},{"name":1,"_id":0},function(err,data){
        if (err){
                res.send(err)
            }

            console.log(data);    
            res.json(data);

    });
});

router.get('/api/todos', function (req, res) {
        // use mongoose to get all todos in the database
        getTodos(res);
    });

// create todo and send back all todos after creation
    router.post('/api/todos', function (req, res) {

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
    // we are getting all add business data here on server and we save it to database
    router.post('/api/todos/addBusiness', function (req, res) {

        console.log(req.body.tag);
        /*for (var i = req.body.category.length - 1; i >= 0; i--) {
            Collection.find({category:req.body.category[i]},function (err, temp) {
                console.log(typeof temp);
                
            if (err){
                res.send(err);
            }

            else if (temp.length === 0 ){

                console.log(temp +"  is not valid category");
                //res.send('showAlert');
                res.end('temp');}
                else{ */
                    Collection.create({

           name: req.body.name,
           city:req.body.city,

           tag:req.body.tag,
           category:req.body.category,
           day:req.body.day,
           openingTime:req.body.opentime,
           closingTime:req.body.closetime,
           services:req.body.service,
            pincode:req.body.pincode,
           address:req.body.address,
        phone_no:req.body.phone,
        default_image_content_type:req.body.image,
        


    
            done: false
        }, function (err, collection) { 
            
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            //getcollections(res);
            console.log("added");
            res.json(collection);
        });

                

                

            

        });

            //console.log(req.body.category[i]);
        

    // delete a todo
    router.delete('/api/todos/:todo_id', function (req, res) {
        Todo.remove({
            _id: req.params.todo_id
        }, function (err, todo) {
            if (err)
                res.send(err);

            getTodos(res);
        });
    });
    router.post('/api/todos/searchone/:todo_id', function (req, res) {
        console.log(req.params.todo_id);

        Collection.find({_id: req.params.todo_id}, function (err, todos) {
            if (err)
                res.send(err);

            res.json(todos);
        });
    });
    //validateTag
    router.post('/api/todos/validateTag', function (req, res) {
        console.log(req.body.tag);
        Tag.find({},function(err,todos){
            console.log(todos);
            if(err)
                res.send(err);

            res.json(todos);
        });
        /*
        Tag.find({name:{"$elemMatch":{"$all":['req.body.tag']}}}, function (err, todos) {
            console.log(todos);
            if (err)
                res.send(err);
            

            else if (todos.length===0){
                  res.json(todos=0);}

              else{
                res.json(todos=1);
              }
        });
        */
    });

router.post('/api/business/searchone/:todo_id', function (req, res) {
        console.log(req.params.todo_id);
        Collection.find({_id: req.params.todo_id}, function (err, todos) {
        
            if (err)
                res.send(err);

            res.json(todos);
        });
    });
        
    router.post('/api/todos/search', function (req, res){
        var reg=  new RegExp(req.body.text, 'i');
        console.log(req.body.text);

        Collection.find({ name: new RegExp(reg) },{name:1} || {city: new RegExp(reg)}, function (err, todos) {
            
            if (err) 
                res.send(err); 
            if(todos.length<=0)
            { Collection.find({city: new RegExp(reg)}, function (err, todos) {
            
            if (err) 
                res.send(err); 
            
            
                res.json(todos);
                
        });

            // get and return all the todos after you create another
            
              }
            else{
                res.json(todos);
                }
        });

    }); 


router.get('/', function(req, res, next) {
  //res.render('jsearch', { title: 'Welcome to AreaHop' });
  
  res.sendFile('index.html', { root: path.join(__dirname, '../public') });
});
/* GET Hello World page. */
router.get('/zomatosearch', function(req, res) {

    res.render('zomatosearch.html', { root: path.join(__dirname, '../public') });
});

router.get('/search', function(req, res) {
    res.render('search', { title: 'Welocme to AreaHop' });
    //res.sendFile('search.html', { root: path.join(__dirname, '../public') });

    res.render('helloworld', { title: 'Hello, World!' });
});

router.get('/jsearch', function(req, res) {
    res.render('jsearch', { title: 'Hello, World!' });

});
router.get('/search', function(req, res) {
    console.log(req.body.tipue_search_content);
    var search = req.body.tipue_search_content;
    res.render('search', { "searchlist": search });
});

router.get('/search-box', function(req, res) {
    var db = req.db;
    var collection = db.get('businesscollection');
    collection.find({},{},function(e,docs){
        res.render('search-box', {
            "businesslist" : docs
        });
        //console.log(docs);
    });
});

/* GET New Business page. */
router.get('/newbusiness', function(req, res) {
    res.render('newbusiness', { title: 'Add New Business' });
});
/* POST to Add User Service */
router.post('/addbusiness', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var businessName = req.body.businessname;
    var businessEmail = req.body.businessemail;
    var city_id = req.body.city_id;
     var pincode = req.body.pincode;
    var latitude = req.body.latitude;
    var longitude= req.body.longitude;
     var phone_no = req.body.phone_no;
    var status = req.body.status;
    var user_id = req.body.user_id;
     var address = req.body.address;
    var areahop_id= req.body.areahop_id;
    var neighborhood= req.body.neighborhood;
     var state= req.body.state;
    var website = req.body.website;
    

    // Set our collection
    var collection = db.get('businesscollection');

    // Submit to the DB
    collection.insert({
        
    businessName :businessName,
    businessEmail :businessEmail,
    city_id :city_id,
    pincode:pincode,
    latitude:latitude,
    longitude:longitude,
    phone_no:phone_no,
    status :status,
    user_id :user_id,
    address:address,
    areahop_id:areahop_id,
    neighborhood:neighborhood,
    state:state,
    website:website
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // And forward to success page
            res.redirect("businesslist");
        }
    });
});
/* GET Businesslist page. */
router.get('/businesslist', function(req, res) {
    var db = req.db;
    var collection = db.get('businesscollection');
    collection.find({},{},function(e,docs){
        res.render('businesslist', {
            "businesslist" : docs
        });
        //console.log(docs);
    });
});
router.post('/searchBusiness', function(req, res) {
    var db = req.db;
    var collection = db.get('businesscollection');
        var name = req.body.search;
        console.log(name);
        collection.find(
   { $text: { $search: name } },
function(e,docs){
    console.log(docs);
        res.render('searchBusiness', {

            "businesslist" : docs,
            "searchBusiness" : docs,

            });
 });
        /*
    collection.find({},{},function(e,docs){
        console.log(docs);

        res.render('searchBusiness', {
            "searchBusiness" : docs,
            "search":name
            
        });
        //console.log(docs);
    });*/
}); 
/* GET Userlist page. */
router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({},{},function(e,docs)
    {
            res.render('userlist',
        {
            "userlist" : docs
        });
    });
});
/* GET New User page. */
router.get('/newuser', function(req, res) {
    res.render('newuser', { title: 'Add New User' });
});
/* POST to Add User Service */
router.post('/adduser', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var userName = req.body.username;
    var userEmail = req.body.useremail;
    var tagName = req.body.tagname;

    // Set our collection
    var collection = db.get('usercollection');

    // Submit to the DB
    collection.insert({
        "username" : userName,
        "email" : userEmail
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // And forward to success page
            //res.redirect("userlist");
        var db = req.db;
            var collection1 = db.get('tagcollection');
        
        
    collection1.find({},{},function(e,docs){
        res.render('taguser', {
            "searchtag" : docs,
            "search":tagName
            
        });
    });
        }
    });
    });
/* GET New Tag page. */
router.get('/newtag', function(req, res)
 {
    res.render('newtag', { title: 'Add New Tag' });
    /* POST to Add User Service */
});
router.post('/addtag', function(req, res)
 {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var tagName = req.body.tagname;
    
    

    // Set our collection
    var collection = db.get('tagcollection');

    // Submit to the DB
    collection.insert(
    {
        
        "tagname": tagName
    }, function (err, doc)
     {
        if (err) 
        {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else 
        {
            // And forward to success page
            res.redirect("taglist");
        }
    });
});
/* GET Taglist page. */
router.get('/taglist', function(req, res) {
    var db = req.db;
    //var tagName ="anoop";
    var collection = db.get('tagcollection');
    collection.find({},{},function(e,tagName){
        res.render('taglist', {
            "taglist" : tagName
        });
    });
});
router.post('/addreview', function(req, res)
 {
    
    // Set our internal DB variable
    var db = req.db;


    // Get our form values. These rely on the "name" attributes
    var review = req.body.review;
    var bname = req.body.pd;
    console.log(req.body);
    

    // Set our collection
    var collection = db.get('reviewcollection');

    // Submit to the DB
    collection.insert(
    {
        "Bname": bname,//taking id in db
        "Review": review
    }, function (err, doc)
     {
        if (err) 
        {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else 
        {
            // And forward to success page
            res.send("Thank you for sharing your experience");
        }
    });
});

router.post('/addtagbusiness', function(req, res)
 {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var tagName = req.body.tagname;
    
    

    // Set our collection
    var collection = db.get('business_tagcollection');

    // Submit to the DB
    collection.insert(
    {
        
        "tagname": tagName
    }, function (err, doc)
     {
        if (err) 
        {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else 
        {
            // And forward to success page
            res.redirect("taglist");
        }
    });
});

module.exports = router;
