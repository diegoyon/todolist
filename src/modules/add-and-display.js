import ToDoTasks from "./tasks.js";
import addSingleTask from "./add-task.js";

// Adds the tasks to the array and the DOM
export function addAndDisplay(event) {
  const tasks = new ToDoTasks();
  if (localStorage.getItem("data") !== null) {
    // If there is data stored, set collection to that data
    tasks.list = JSON.parse(localStorage.getItem("data"));
  } else {
    tasks.list = [];
  }
  const mainInput = document.querySelector(".main-input");
  if (event.key === "Enter") {
    tasks.addTask(mainInput.value);
    addSingleTask(
      tasks.list[tasks.list.length - 1].description,
      tasks.list[tasks.list.length - 1].index
    );

    mainInput.value = "";
    localStorage.setItem("data", JSON.stringify(tasks.list));
  }
}
