import ToDoTasks from "./tasks";
export default function updateTaskListAndLocalStorage() {
  const tasks = new ToDoTasks();
  tasks.list = JSON.parse(localStorage.getItem("data"));
  const items = document.querySelectorAll("li");
  items.forEach((item) => {
    const input = item.querySelector(".task");
    tasks.list[item.className - 1].description = input.value;
    tasks.list[item.className - 1].index = parseInt(item.className, 10);
    tasks.list[item.className - 1].completed =
      input.style.textDecoration === "line-through";
    const check = item.querySelector(".check");
    if (input.style.textDecoration === "line-through") {
      check.checked = true;
    }
  });
  localStorage.setItem("data", JSON.stringify(tasks.list));
}
