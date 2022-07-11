import Vert from "../../icons/vert.png";
import TrashCan from "../../icons/trashcan.png";
import { removeItem } from "./remove-task";

// Highlights the li element and displays the trashcan icon
export function highlight(event) {
  const clickedElement = event.target;
  const parent = clickedElement.parentNode.parentNode;
  parent.classList.add("highlight");
  const image = parent.querySelector("img");
  image.src = TrashCan;
  image.alt = "trashicon";
  image.style.cursor = "pointer";
  image.addEventListener("mousedown", removeItem);
}

// Unhighlights the li element and changes back the icon
export function unhighlight(event) {
  const clickedElement = event.target;
  const parent = clickedElement.parentNode.parentNode;
  parent.classList.remove("highlight");
  const image = parent.querySelector("img");
  image.src = Vert;
  image.alt = "threeDots";
  image.style.cursor = "move";
  image.removeEventListener("mousedown", removeItem);
}
