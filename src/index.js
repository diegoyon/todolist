import './style.css';
import Vert from '../icons/vert.png';

const iconVert = new Image();
iconVert.src = Vert;

const toDoTasks = [
  {
    description: 'wash the car',
    bool: false,
    index: 1,
  },
  {
    description: 'buy food',
    bool: false,
    index: 2,
  },
  {
    description: 'send email',
    bool: false,
    index: 3,
  },
];

const list = document.querySelector('ul');

function displayTasks(arr) {
  // Sorts the array of objects according to their index
  toDoTasks.sort((a, b) => a.index - b.index);

  // Iterates the array and displays them
  for (let i = 0; i < arr.length; i += 1) {
    const item = document.createElement('li');
    item.innerHTML = `<div><input type="checkbox"><p>${arr[i].description}</p></div><img src="${iconVert.src}" alt="vert" />`;
    list.appendChild(item);
  }
}

displayTasks(toDoTasks);
