export default class ToDoTasks {
  constructor() {
    this.list = [];
  }

  addTask(taskDescription) {
    const task = {
      description: taskDescription,
      completed: false,
      index: this.list.length + 1,
    };
    this.list.push(task);
  }

  removeTask(index) {
    this.list = this.list.filter((item) => item.index !== index);
    // update indices
    for (let i = 0; i < this.list.length; i += 1) {
      this.list[i].index = i + 1;
    }
  }

  editTask(newDescription, index) {
    // console.log(this.list[].description);
    this.list[index - 1].description = newDescription;
  }
}
