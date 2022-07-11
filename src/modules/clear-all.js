import updateDomIndexes from './update-dom.js';
import removeCompletedElements from './remove-completed.js';
import ToDoTasks from './tasks.js';

export default function clearAllCompleted() {
  const tasks = new ToDoTasks();
  tasks.list = JSON.parse(localStorage.getItem('data'));
  tasks.clearCompleted();
  localStorage.setItem('data', JSON.stringify(tasks.list));
  removeCompletedElements();
  updateDomIndexes();
}
