import ToDoTasks from './tasks.js';

export default function markComplete(event) {
  const tasks = new ToDoTasks();
  tasks.list = JSON.parse(localStorage.getItem('data'));
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
