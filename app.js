
var feathers = require('feathers');
var rest = require('feathers-rest');
var socketio = require('feathers-socketio');
var mongodb = require('feathers-mongodb');
var bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

var app = feathers();
// On MongoDB use the `feathers-demo` database
// and the `todos` collection
MongoClient.connect('mongodb://localhost:27017/feathers');
var todoService = mongodb({
  db: 'feathers-demo',
  collection: 'todos'
});

// Set up EJS as the view engine
app.set('view engine', 'ejs');  
// Set up REST and SocketIO APIs
app.configure(rest());
app.configure(socketio());
// Parse JSON and form HTTP bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Use the Todo service
app.use('/todos', todoService);
// Render the homepage
app.use('/', function(req, res) {
  var todos =app.service('todos');
   todos.find().then(function(todos) {
    res.render('index', {
      todos: todos
    });
  });
});

// Start the application on port 3030
app.listen(3030);