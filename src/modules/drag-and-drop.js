import updateTaskListAndLocalStorage from './update-task.js';
import markComplete from './mark-completed.js';
import editElement from './edit-task.js';
import Vert from '../../icons/vert.png';
import TrashCan from '../../icons/trashcan.png';
import removeItem from './remove-task.js';

let dragged;

export function handleDragStart(e) {
  this.style.opacity = '0.5';

  dragged = e.target;

  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/html', this.innerHTML);
}

export function handleDragEnd() {
  this.style.opacity = '1';
  const items = document.querySelectorAll('li');
  items.forEach((item) => {
    item.style.border = 'none';
  });
  this.style.border = 'none';
}

export function handleDragOver(e) {
  if (e.preventDefault) {
    e.preventDefault();
  }
  return false;
}

export function handleDragEnter() {
  this.style.border = '3px solid blue';
}

export function handleDragLeave() {
  this.style.border = 'none';
}

export function handleDrop(e) {
  e.stopPropagation();
  if (dragged !== this) {
    dragged.innerHTML = this.innerHTML;
    this.innerHTML = e.dataTransfer.getData('text/html');
  }

  const items = document.querySelectorAll('li');
  items.forEach((item) => {
    // Add event listeners to checkbox input
    const check = item.querySelector('.check');
    check.addEventListener('change', markComplete);

    const input = item.querySelector('.task');
    input.addEventListener('input', editElement);

    const threeDots = item.querySelector('img');
    threeDots.addEventListener('mousedown', () => {
      item.setAttribute('draggable', true);
    });
    threeDots.addEventListener('mouseout', () => {
      item.setAttribute('draggable', false);
    });
  });

  updateTaskListAndLocalStorage();

  return false;
}

// Highlights the li element and displays the trashcan icon
export function highlight(event) {
  const clickedElement = event.target;
  const parent = clickedElement.parentNode.parentNode;
  parent.classList.add('highlight');
  const image = parent.querySelector('img');
  image.src = TrashCan;
  image.alt = 'trashicon';
  image.style.cursor = 'pointer';
  image.addEventListener('mousedown', removeItem);
}

// Unhighlights the li element and changes back the icon
export function unhighlight(event) {
  const clickedElement = event.target;
  const parent = clickedElement.parentNode.parentNode;
  parent.classList.remove('highlight');
  const image = parent.querySelector('img');
  image.src = Vert;
  image.alt = 'threeDots';
  image.style.cursor = 'move';
  image.removeEventListener('mousedown', removeItem);
}
