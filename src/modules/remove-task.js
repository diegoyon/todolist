import ToDoTasks from './tasks.js';
import updateDomIndexes from './update-dom.js';

export default function removeItem(event) {
  const tasks = new ToDoTasks();
  tasks.list = JSON.parse(localStorage.getItem('data'));
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
