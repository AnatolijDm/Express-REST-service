const uuid = require('uuid');
// const mongoose = require('mongoose');

/* const tasksSchema = new mongoose.Schema(
  {
    title: String,
    order: Number,
    description: String,
    userId: String,
    boardId: String,
    columnId: String,
    _id: {
      type: String,
      default: uuid
    }
  },
  { versionKey: false }
);

tasksSchema.statics.toResponse = task => {
  const { id, title, order, description, userId, boardId, columnId } = task;
  return { id, title, order, description, userId, boardId, columnId };
};

const Task = mongoose.model('Task', tasksSchema);*/

class Task {
  constructor({
    id = uuid(),
    title = 'Title',
    order = 1,
    description = 'Description',
    userId = '123',
    boardId = '1234',
    columnId = '12345'
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }
}

module.exports = Task;
