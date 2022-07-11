import ToDoTasks from "./tasks.js";
export default function editElement(event) {
  const tasks = new ToDoTasks();
  tasks.list = JSON.parse(localStorage.getItem("data"));
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
