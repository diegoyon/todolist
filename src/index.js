import _ from "lodash";
import "./style.css";

let toDoTasks = [
  {
    description: "wash the car",
    bool: false,
    index: 1,
  },
  {
    description: "buy food",
    bool: false,
    index: 2,
  },
  {
    description: "send email",
    bool: false,
    index: 3,
  },
];

const list = document.querySelector("ul");

function displayTasks(arr) {
  for (let i = 0; i < arr.length; i++) {
    const item = document.createElement("li");
    item.innerHTML = arr[i].description;
    list.appendChild(item);
  }
}

displayTasks(toDoTasks);
