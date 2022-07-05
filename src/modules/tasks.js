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

  removeTask(index) {
    this.list = this.list.filter((item) => item.index !== index);
    //update indices
    for (let i = 0; i < this.list.length; i++) {
      this.list[i].index = i + 1;
    }
  }
}
