const uuid = require('uuid');

class Column {
  constructor({ id = uuid(), title = 'TITLE', order = 1 } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }
}

class Board {
  constructor({ id = uuid(), title = 'TITLE', columns = [new Column()] } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }
}

module.exports = Board;
