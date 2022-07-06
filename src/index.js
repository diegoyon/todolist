import "./style.css";

//Create image for more options
import Vert from "../icons/vert.png";
const iconVert = new Image();
iconVert.src = Vert;

//Create trashcan image
import TrashCan from "../icons/trashcan.png";
const iconTrash = new Image();
iconTrash.src = TrashCan;

//Create ToDoTasks object
import ToDoTasks from "./modules/tasks.js";
const tasks = new ToDoTasks();

if (localStorage.getItem("data") !== null) {
  // If there is data stored, set collection to that data
  tasks.list = JSON.parse(localStorage.getItem("data"));
}

const list = document.querySelector("ul");

function displayTasks(arr) {
  // Sorts the array of objects according to their index
  tasks.list.sort((a, b) => a.index - b.index);

  // Iterates the array and displays them
  for (let i = 0; i < arr.length; i += 1) {
    const item = document.createElement("li");
    item.className = i + 1;
    item.innerHTML = `<div><input type="checkbox" class="check"><input type="text" class="task" value="${arr[i].description}" /></div><img src="${iconVert.src}" alt="threeDots" />`;
    list.appendChild(item);

    // Add event listeners when focus and unfocus
    item.addEventListener("focusin", highlight);
    item.addEventListener("focusout", unhighlight);

    const input = item.querySelector(".task");
    input.addEventListener("input", editElement);
  }
}

// Displays the list of tasks
displayTasks(tasks.list);

// Adds a single task to the DOM
function addSingleTask(taskDescription, taskIndex) {
  const item = document.createElement("li");
  item.className = taskIndex;
  item.innerHTML = `<div><input type="checkbox" class="check"><input type="text" class="task" value="${taskDescription}" /></div><img src="${iconVert.src}" alt="threeDots" />`;
  list.appendChild(item);

  // Add event listeners when focus and unfocus
  item.addEventListener("focusin", highlight);
  item.addEventListener("focusout", unhighlight);

  const input = item.querySelector(".task");
  input.addEventListener("input", editElement);
}

// Get the main-input element
const mainInput = document.querySelector(".main-input");
mainInput.addEventListener("keydown", addAndDisplay);

// Adds the tasks to the array and the DOM
function addAndDisplay(event) {
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

// Highlights the li element and displays the trashcan icon
function highlight(event) {
  const clickedElement = event.target;
  const parent = clickedElement.parentNode.parentNode;
  parent.classList.add("highlight");
  const image = parent.querySelector("img");
  image.src = iconTrash.src;
  image.alt = "trashicon";
  image.addEventListener("mousedown", removeItem);
}

// Unhighlights the li element and changes back the icon
function unhighlight(event) {
  const clickedElement = event.target;
  const parent = clickedElement.parentNode.parentNode;
  parent.classList.remove("highlight");
  const image = parent.querySelector("img");
  image.src = iconVert.src;
  image.alt = "threeDots";
  image.removeEventListener("mousedown", removeItem);
}

function removeItem(event) {
  let index = event.target.parentNode.className;
  index = parseInt(index);
  tasks.removeTask(index);

  // Removes element from DOM
  event.target.parentNode.remove();

  // Updates DOM indexes
  updateDomIndexes();

  // Updates local storage without the removed element
  localStorage.setItem("data", JSON.stringify(tasks.list));
}

// Updates the indexes of each element
function updateDomIndexes() {
  const parent = document.querySelector("ul");
  const elements = parent.querySelectorAll("li");
  for (let i = 0; i < elements.length; i++) {
    elements[i].className = i + 1;
  }
}

function editElement(event) {
  // Gets the value of the input
  const newDescription = event.target.value;

  // Gets the class index of the parent
  const parentClass = event.target.parentNode.parentNode.className;
  let index = parentClass.replace(/\D/g, "");
  index = parseInt(index);
  tasks.editTask(newDescription, index);

  // Stores new edited data
  localStorage.setItem("data", JSON.stringify(tasks.list));
}
