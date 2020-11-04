const uuid = require('uuid');
// const mongoose = require('mongoose');

/* const boardsSchema = new mongoose.Schema(
  {
    title: String,
    columns: [
      {
        title: String,
        order: Number,
        _id: {
          type: String,
          default: uuid
        }
      }
    ],
    _id: {
      type: String,
      default: uuid
    }
  },
  { versionKey: false }
);

boardsSchema.statics.toResponse = board => {
  const { id, title, columns } = board;
  return { id, title, columns };
};

const Board = mongoose.model('Board', boardsSchema);*/

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
