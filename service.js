
var feathers = require('feathers');
var app = feathers();

// All service methods return a promise
const myService = {
  find(params) {
    return Promise.resolve([]);
  },
  get(id, params) {},
  create(data, params) {},
  update(id, data, params) {},
  patch(id, data, params) {},
  remove(id, params) {},
  setup(app, path) {}
}

app.use('/todos', myService);