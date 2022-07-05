export default class ToDoTasks {
  constructor() {
    this.list = [];
  }

  addTask(description) {
    const task = {
      description: description,
      completed: false,
      index: this.list.length + 1,
    };
    this.list.push(task);
  }
}
