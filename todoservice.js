const todoService = {
    todos = [{
      text: 'Learn Feathers',
      complete: false
    }],
    find(params) {
      return Promise.resolve(this.todos);
    },
    create(data) {
      this.todos.push(data);
      return Promise.resolve(data);
    }
  }