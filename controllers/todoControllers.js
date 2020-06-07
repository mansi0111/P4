// In this controller we'd be setting up routing and some other basic functionalities of our app.

// Importing middleware body-parser to help pass input values
var bodyParser = require("body-parser");

// Importing mongoose module
var mongoose = require("mongoose");

// Connect to the database
mongoose.connect("mongodb://test:test@ds113795.mlab.com:13795/todo", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Creating a schema - This a like a blueprint or template at which the database expects data
var todoSchema = new mongoose.Schema({
  item: String,
});

// Creating a model type for the schema
var Todo = mongoose.model("Todo", todoSchema);

//Adding Items manually into the database to test
var itemOne = Todo({
    item: "Buy flowers"
 }).save(err => {
   if(err) {throw err};
   console.log('Item saved');
});

//Setting up initial dummy data
//var data = [{ item: "Get milk" }, { item: "Walk dog" }, { item: "Eat dinner" }];

var urlencodedParser = bodyParser.urlencoded({ extended: false });

// This functions returns to the call in app.js or rather it exports to the line of code where it is required in app.js
module.exports = function (app) {
  // Setting up routes
  app.get("/todo", (req, res) => {
    // Get data from mongodb and pass to the view
    Todo.find({}, (err, data) => {
      if (err) throw err;
      res.render("todo", { todos: data });
    });
  });

  // When user submits a form
  app.post("/todo", urlencodedParser, (req, res) => {
    // Get data from input and add it to mongodb
    var newTodo = Todo(req.body).save((err, data) => {
      if (err) throw err;
      res.json(data);
    });
  });

  // For when a user sends a delete request
  app.delete("/todo/:item", (req, res) => {
    // Delete the requested item from mongodb
    Todo.find({ item: req.params.item.replace(/\-/g, " ") }).remove(
      (err, data) => {
        if (err) throw err;
        res.json(data);
      }
    );
  });
};
