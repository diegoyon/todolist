import ToDoTasks from "./tasks";
import { updateDomIndexes } from "./update-dom";
export function removeItem(event) {
  const tasks = new ToDoTasks();
  tasks.list = JSON.parse(localStorage.getItem("data"));
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
