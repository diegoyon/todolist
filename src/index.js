import './style.css';

// Create image for more options
import Vert from '../icons/vert.png';

// Create trashcan image
import TrashCan from '../icons/trashcan.png';

// Create ToDoTasks object
import ToDoTasks from './modules/tasks.js';

const tasks = new ToDoTasks();

if (localStorage.getItem('data') !== null) {
  // If there is data stored, set collection to that data
  tasks.list = JSON.parse(localStorage.getItem('data'));
}

const list = document.querySelector('ul');

// Updates the indexes of each element
function updateDomIndexes() {
  const parent = document.querySelector('ul');
  const elements = parent.querySelectorAll('li');
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
  localStorage.setItem('data', JSON.stringify(tasks.list));
}

// Highlights the li element and displays the trashcan icon
function highlight(event) {
  const clickedElement = event.target;
  const parent = clickedElement.parentNode.parentNode;
  parent.classList.add('highlight');
  const image = parent.querySelector('img');
  image.src = TrashCan;
  image.alt = 'trashicon';
  image.addEventListener('mousedown', removeItem);
}

// Unhighlights the li element and changes back the icon
function unhighlight(event) {
  const clickedElement = event.target;
  const parent = clickedElement.parentNode.parentNode;
  parent.classList.remove('highlight');
  const image = parent.querySelector('img');
  image.src = Vert;
  image.alt = 'threeDots';
  image.removeEventListener('mousedown', removeItem);
}

function editElement(event) {
  // Gets the value of the input
  const newDescription = event.target.value;

  // Gets the class index of the parent
  const parentClass = event.target.parentNode.parentNode.className;
  let index = parentClass.replace(/\D/g, '');
  index = parseInt(index, 10);
  tasks.editTask(newDescription, index);

  // Stores new edited data
  localStorage.setItem('data', JSON.stringify(tasks.list));
}

function markComplete(event) {
  // Gets the class index of the parent
  const parentClass = event.target.parentNode.parentNode.className;
  let index = parentClass.replace(/\D/g, '');
  index = parseInt(index, 10);

  const parent = event.target.parentNode.parentNode;
  const input = parent.querySelector('.task');
  if (event.target.checked) {
    input.style.textDecoration = 'line-through';
    input.style.color = 'gray';
    tasks.toggleComplete(index);
    localStorage.setItem('data', JSON.stringify(tasks.list));
  } else {
    input.style.textDecoration = 'none';
    input.style.color = 'black';
    tasks.toggleComplete(index);
    localStorage.setItem('data', JSON.stringify(tasks.list));
  }
}

function displayTasks(arr) {
  // Sorts the array of objects according to their index
  tasks.list.sort((a, b) => a.index - b.index);

  // Iterates the array and displays them
  for (let i = 0; i < arr.length; i += 1) {
    const item = document.createElement('li');
    item.className = i + 1;

    item.innerHTML = `<div><input type="checkbox" class="check"><input type="text" class="task" value="${arr[i].description}" /></div><img src="${Vert}" alt="threeDots" />`;
    list.appendChild(item);

    // Add event listeners when focus and unfocus
    item.addEventListener('focusin', highlight);
    item.addEventListener('focusout', unhighlight);

    // Add event listeners to checkbox input
    const check = item.querySelector('.check');
    check.addEventListener('change', markComplete);

    const input = item.querySelector('.task');
    input.addEventListener('input', editElement);

    if (arr[i].completed) {
      check.checked = true;
      input.style.textDecoration = 'line-through';
      input.style.color = 'gray';
    }
  }
}

// Displays the list of tasks
displayTasks(tasks.list);

// Adds a single task to the DOM
function addSingleTask(taskDescription, taskIndex) {
  const item = document.createElement('li');
  item.className = taskIndex;
  item.innerHTML = `<div><input type="checkbox" class="check"><input type="text" class="task" value="${taskDescription}" /></div><img src="${Vert}" alt="threeDots" />`;
  list.appendChild(item);

  // Add event listeners when focus and unfocus
  item.addEventListener('focusin', highlight);
  item.addEventListener('focusout', unhighlight);

  // Add event listeners to checkbox input
  const check = item.querySelector('.check');
  check.addEventListener('change', markComplete);

  const input = item.querySelector('.task');
  input.addEventListener('input', editElement);
}

// Get the main-input element
const mainInput = document.querySelector('.main-input');

// Adds the tasks to the array and the DOM
function addAndDisplay(event) {
  if (event.key === 'Enter') {
    tasks.addTask(mainInput.value);
    addSingleTask(
      tasks.list[tasks.list.length - 1].description,
      tasks.list[tasks.list.length - 1].index,
    );

    mainInput.value = '';
    localStorage.setItem('data', JSON.stringify(tasks.list));
  }
}

mainInput.addEventListener('keydown', addAndDisplay);

function removeCompletedElements() {
  const parent = document.querySelector('ul');
  const element = parent.querySelectorAll('li');
  for (let i = 0; i < element.length; i += 1) {
    const task = element[i].querySelector('.task');
    if (task.style.textDecoration === 'line-through') {
      element[i].remove();
    }
  }
}

function clearAllCompleted() {
  tasks.clearCompleted();
  localStorage.setItem('data', JSON.stringify(tasks.list));
  removeCompletedElements();
  updateDomIndexes();
}

const clear = document.querySelector('a');
clear.addEventListener('click', clearAllCompleted);
