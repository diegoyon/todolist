import "./style.css";

// Create image for more options
import Vert from "../icons/vert.png";

// Create trashcan image
import TrashCan from "../icons/trashcan.png";

// Create ToDoTasks object
import ToDoTasks from "./modules/tasks.js";

const tasks = new ToDoTasks();

if (localStorage.getItem("data") !== null) {
  // If there is data stored, set collection to that data
  tasks.list = JSON.parse(localStorage.getItem("data"));
}

const list = document.querySelector("ul");

// Updates the indexes of each element
function updateDomIndexes() {
  const parent = document.querySelector("ul");
  const elements = parent.querySelectorAll("li");
  for (let i = 0; i < elements.length; i += 1) {
    elements[i].className = i + 1;
  }
}

function removeItem(event) {
  let index = event.target.parentNode.className;
  index = parseInt(index, 10);
  tasks.removeTask(index);

  // Removes element from DOM
  event.target.parentNode.remove();

  // Updates DOM indexes
  updateDomIndexes();

  // Updates local storage without the removed element
  localStorage.setItem("data", JSON.stringify(tasks.list));
}

// Highlights the li element and displays the trashcan icon
function highlight(event) {
  const clickedElement = event.target;
  const parent = clickedElement.parentNode.parentNode;
  parent.classList.add("highlight");
  const image = parent.querySelector("img");
  image.src = TrashCan;
  image.alt = "trashicon";
  image.style.cursor = "pointer";
  image.addEventListener("mousedown", removeItem);
}

// Unhighlights the li element and changes back the icon
function unhighlight(event) {
  const clickedElement = event.target;
  const parent = clickedElement.parentNode.parentNode;
  parent.classList.remove("highlight");
  const image = parent.querySelector("img");
  image.src = Vert;
  image.alt = "threeDots";
  image.style.cursor = "default";
  image.removeEventListener("mousedown", removeItem);
}

function editElement(event) {
  // Gets the value of the input
  const newDescription = event.target.value;

  // Gets the class index of the parent
  const parentClass = event.target.parentNode.parentNode.className;
  let index = parentClass.replace(/\D/g, "");
  index = parseInt(index, 10);
  tasks.editTask(newDescription, index);

  // Stores new edited data
  localStorage.setItem("data", JSON.stringify(tasks.list));
}

function markComplete(event) {
  // Gets the class index of the parent
  const parentClass = event.target.parentNode.parentNode.className;
  let index = parentClass.replace(/\D/g, "");
  index = parseInt(index, 10);

  const parent = event.target.parentNode.parentNode;
  const input = parent.querySelector(".task");
  if (event.target.checked) {
    input.style.textDecoration = "line-through";
    input.style.color = "gray";
    tasks.toggleComplete(index);
    localStorage.setItem("data", JSON.stringify(tasks.list));
  } else {
    input.style.textDecoration = "none";
    input.style.color = "black";
    tasks.toggleComplete(index);
    localStorage.setItem("data", JSON.stringify(tasks.list));
  }
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

let dragged;

function handleDragStart(e) {
  this.style.opacity = "0.5";

  dragged = e.target;

  e.dataTransfer.effectAllowed = "move";
  e.dataTransfer.setData("text/html", this.innerHTML);
}

function handleDragEnd() {
  this.style.opacity = "1";
  let items = document.querySelectorAll("li");
  items.forEach(function (item) {
    item.style.border = "none";
  });
  this.style.border = "none";
}

function handleDragOver(e) {
  if (e.preventDefault) {
    e.preventDefault();
  }
  return false;
}

function handleDragEnter() {
  this.style.border = "3px solid blue";
}

function handleDragLeave() {
  this.style.border = "none";
}

function handleDrop(e) {
  e.stopPropagation();
  if (dragged !== this) {
    dragged.innerHTML = this.innerHTML;
    this.innerHTML = e.dataTransfer.getData("text/html");
  }

  let items = document.querySelectorAll("li");
  items.forEach(function (item) {
    // Add event listeners to checkbox input
    const check = item.querySelector(".check");
    check.addEventListener("change", markComplete);

    const input = item.querySelector(".task");
    input.addEventListener("input", editElement);

    const threeDots = item.querySelector("img");
    threeDots.addEventListener("mousedown", function () {
      item.setAttribute("draggable", true);
    });
    threeDots.addEventListener("mouseout", function () {
      item.setAttribute("draggable", false);
    });
  });

  updateTaskListAndLocalStorage();

  return false;
}

// Adds a single task to the DOM
function addSingleTask(taskDescription, taskIndex, taskCompleted) {
  const item = document.createElement("li");
  item.className = taskIndex;
  item.innerHTML = `<div><input type="checkbox" class="check"><input type="text" class="task" value="${taskDescription}" /></div><img src="${Vert}" alt="threeDots" />`;
  list.appendChild(item);

  // Add cursor: move to three dots image
  const threeDots = item.querySelector("img");
  threeDots.addEventListener("mousedown", function () {
    item.setAttribute("draggable", true);
  });
  threeDots.addEventListener("mouseout", function () {
    item.setAttribute("draggable", false);
  });
  // item.style.cursor = "move";
  threeDots.style.cursor = "move";
  threeDots.setAttribute("draggable", false);

  item.addEventListener("dragstart", handleDragStart);
  item.addEventListener("dragover", handleDragOver);
  item.addEventListener("dragenter", handleDragEnter);
  item.addEventListener("dragleave", handleDragLeave);
  item.addEventListener("dragend", handleDragEnd);
  item.addEventListener("drop", handleDrop);

  // Add event listeners when focus and unfocus
  item.addEventListener("focusin", highlight);
  item.addEventListener("focusout", unhighlight);

  item.addEventListener;

  // Add event listeners to checkbox input
  const check = item.querySelector(".check");
  check.addEventListener("change", markComplete);

  const input = item.querySelector(".task");
  input.addEventListener("input", editElement);

  if (taskCompleted) {
    check.checked = true;
    input.style.textDecoration = "line-through";
    input.style.color = "gray";
  }
}

// Get the main-input element
const mainInput = document.querySelector(".main-input");

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

mainInput.addEventListener("keydown", addAndDisplay);

function removeCompletedElements() {
  const parent = document.querySelector("ul");
  const element = parent.querySelectorAll("li");
  for (let i = 0; i < element.length; i += 1) {
    const task = element[i].querySelector(".task");
    if (task.style.textDecoration === "line-through") {
      element[i].remove();
    }
  }
}

function clearAllCompleted() {
  tasks.clearCompleted();
  localStorage.setItem("data", JSON.stringify(tasks.list));
  removeCompletedElements();
  updateDomIndexes();
}

const clear = document.querySelector("a");
clear.addEventListener("click", clearAllCompleted);

function updateTaskListAndLocalStorage() {
  let items = document.querySelectorAll("li");
  items.forEach(function (item) {
    const input = item.querySelector(".task");
    tasks.list[item.className - 1].description = input.value;
    tasks.list[item.className - 1].index = parseInt(item.className, 10);
    tasks.list[item.className - 1].completed =
      input.style.textDecoration == "line-through";
    const check = item.querySelector(".check");
    if (input.style.textDecoration == "line-through") {
      check.checked = true;
    }
  });
  localStorage.setItem("data", JSON.stringify(tasks.list));
}
