import "./style.css";
import Vert from "../icons/vert.png";
import ToDoTasks from "./modules/tasks.js";

const iconVert = new Image();
iconVert.src = Vert;

const tasks = new ToDoTasks();
tasks.addTask("este es un nuevo task1");
tasks.addTask("este es un nuevo task2");
tasks.addTask("este es un nuevo task3");
tasks.removeTask(2);
tasks.removeTask(1);
console.log(tasks);
const list = document.querySelector("ul");

function displayTasks(arr) {
  // Sorts the array of objects according to their index
  tasks.list.sort((a, b) => a.index - b.index);

  // Iterates the array and displays them
  for (let i = 0; i < arr.length; i += 1) {
    const item = document.createElement("li");
    item.innerHTML = `<div><input type="checkbox"><p>${arr[i].description}</p></div><img src="${iconVert.src}" alt="vert" />`;
    list.appendChild(item);
  }
}

displayTasks(tasks.list);
