var socket = io();

socket.emit('todos::find', {}, function(error, todos) {
  console.log('Found todos', todos);
});

socket.on('todos created', function(todo) {
  console.log('Someone created a new Todo');
});

var newTodo = {
  text: 'My Socket todo',
  complete: false
};

socket.emit('todos::create', newTodo, {}, function(error, todo) {
  console.log('I successfully created a Todo', todo);
});