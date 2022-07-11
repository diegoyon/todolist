import "./style.css";

// Create ToDoTasks object
import ToDoTasks from "./modules/tasks.js";

import addSingleTask from "./modules/add-task";

import { clearAllCompleted } from "./modules/clear-all";

import { addAndDisplay } from "./modules/add-and-display";

const tasks = new ToDoTasks();

if (localStorage.getItem("data") !== null) {
  // If there is data stored, set collection to that data
  tasks.list = JSON.parse(localStorage.getItem("data"));
}

function displayTasks(arr) {
  // Sorts the array of objects according to their index
  tasks.list.sort((a, b) => a.index - b.index);

  // Iterates the array and displays them
  for (let i = 0; i < arr.length; i += 1) {
    addSingleTask(arr[i].description, i + 1, arr[i].completed);
  }
}

// Displays the list of tasks
displayTasks(tasks.list);

// Get the main-input element
const mainInput = document.querySelector(".main-input");

mainInput.addEventListener("keydown", addAndDisplay);

const clear = document.querySelector("a");
clear.addEventListener("click", clearAllCompleted);
