import ToDoTasks from "./tasks";
export function removeCompletedElements() {
  const tasks = new ToDoTasks();
  tasks.list = JSON.parse(localStorage.getItem("data"));
  const parent = document.querySelector("ul");
  const element = parent.querySelectorAll("li");
  for (let i = 0; i < element.length; i += 1) {
    const task = element[i].querySelector(".task");
    if (task.style.textDecoration === "line-through") {
      element[i].remove();
    }
  }
}
