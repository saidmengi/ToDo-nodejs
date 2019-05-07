var socket = io();

// Finds the element that has a data-todo-id="todo._id" property
function findElement(todo) {
  return $('#todos').find('[data-todo-id="' + todo._id + '"]')
}

// Returns the data-todo-id property for the parent li element
function getId(element) {
  return $(element).parents('li').data('todo-id');
}

// A general callback for service methods that just alerts
// the error if one happened
function errorHandler(error) {
  if(error) {
    alert('There was an error: ' + error.message);
  }
}

$('#todos').on('submit', 'form.create-todo', function(ev) {
  // Find the todo text form field
  var field = $(this).find('[name="description"]');
  // Call todos.create(data, {}, callback)
  socket.emit('todos::create', {
    text: field.val(),
    complete: false
  }, {}, errorHandler);
  // Reset the value
  field.val('');
  // Prevent actual form submission
  ev.preventDefault();
}).on('click', '.delete', function(ev) {
  var id = getId(this);
  // Call todos.remove(id, {}, callback)
  socket.emit('todos::remove', id, {}, errorHandler);
  ev.preventDefault();
}).on('click', '[name="complete"]', function() {
  var id = getId(this);
  // Complete status is the checkbox status
  var complete = $(this).is(':checked');
  // patch will merge existing data (udpate replaces everything)
  // Call todos.patch(id, { complete: status }, {}, callback)
  socket.emit('todos::patch', id, {
    complete: complete
  }, {}, errorHandler);
});

socket.on('todos created', function(todo) {
  // Create the HTML for the new list element. This can be done nicer
  // eventually by using a view engine like EJS in the browser and sharing
  // the template from index.ejs
  var html = '<li class="page-header checkbox" data-id="' + todo._id + '">' +
        '<label><input type="checkbox" name="done">' +
        todo.text +
        '</label><a href="javascript://" class="pull-right delete">' +
        '<span class="glyphicon glyphicon-remove"></span>' +
        '</a></li>';

  // Add it to the todo list
  $('.todos').append(html);
});

// Listen to a patched todo
socket.on('todos patched', function(todo) {
  var element = findElement(todo);
  // Find the checkbox element
  var checkbox = element.find('[name="complete"]');
  // Set the checked property to the todo complete status
  checkbox.prop('checked', todo.complete);
});

socket.on('todos removed', function(todo) {
  // Find the element and remove it
  findElement(todo).remove();
});