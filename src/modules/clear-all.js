import { updateDomIndexes } from "./update-dom";
import { removeCompletedElements } from "./remove-completed";
import ToDoTasks from "./tasks";
export function clearAllCompleted() {
  const tasks = new ToDoTasks();
  tasks.list = JSON.parse(localStorage.getItem("data"));
  tasks.clearCompleted();
  localStorage.setItem("data", JSON.stringify(tasks.list));
  removeCompletedElements();
  updateDomIndexes();
}
