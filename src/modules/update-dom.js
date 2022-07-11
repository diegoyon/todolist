// Updates the indexes of each element
export function updateDomIndexes() {
  const parent = document.querySelector("ul");
  const elements = parent.querySelectorAll("li");
  for (let i = 0; i < elements.length; i += 1) {
    elements[i].className = i + 1;
  }
}
