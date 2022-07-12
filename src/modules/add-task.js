import Vert from '../../icons/vert.png';
import {
  handleDragStart,
  handleDragEnd,
  handleDragOver,
  handleDragEnter,
  handleDragLeave,
  handleDrop,
} from './drag-and-drop.js';
import { highlight, unhighlight } from './highlight.js';
import markComplete from './mark-completed.js';
import editElement from './edit-task.js';

const list = document.querySelector('ul');

// Adds a single task to the DOM
export default function addSingleTask(
  taskDescription,
  taskIndex,
  taskCompleted,
) {
  const item = document.createElement('li');
  item.className = taskIndex;
  item.innerHTML = `<div><input type="checkbox" class="check"><input type="text" class="task" value="${taskDescription}" /></div><img src="${Vert}" alt="threeDots" />`;
  list.appendChild(item);

  // Add cursor: move to three dots image
  const threeDots = item.querySelector('img');
  threeDots.addEventListener('mousedown', () => {
    item.setAttribute('draggable', true);
  });
  threeDots.addEventListener('mouseout', () => {
    item.setAttribute('draggable', false);
  });
  // item.style.cursor = "move";
  threeDots.style.cursor = 'move';
  threeDots.setAttribute('draggable', false);

  item.addEventListener('dragstart', handleDragStart);
  item.addEventListener('dragover', handleDragOver);
  item.addEventListener('dragenter', handleDragEnter);
  item.addEventListener('dragleave', handleDragLeave);
  item.addEventListener('dragend', handleDragEnd);
  item.addEventListener('drop', handleDrop);

  // Add event listeners when focus and unfocus
  item.addEventListener('focusin', highlight);
  item.addEventListener('focusout', unhighlight);

  // Add event listeners to checkbox input
  const check = item.querySelector('.check');
  check.addEventListener('change', markComplete);

  const input = item.querySelector('.task');
  input.addEventListener('input', editElement);

  if (taskCompleted) {
    check.checked = true;
    input.style.textDecoration = 'line-through';
    input.style.color = 'gray';
  }
}
