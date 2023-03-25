const draggables = document.querySelectorAll(".draggable");
const containers = document.querySelectorAll(".container");
const bodyElement = document.querySelector("body");
let xDirection = "";
let yDirection = "";
let oldX = 0;
let oldY = 0;

bodyElement.addEventListener("mousemove", getMouseDirection, false);

draggables.forEach((draggable) => {
  draggable.addEventListener("dragstart", () => {
    draggable.classList.add("dragging");
  });
  draggable.addEventListener("dragend", () => {
    draggable.classList.remove("dragging");
  });
});

containers.forEach((container) => {
  container.addEventListener("dragover", (e) => {
    e.preventDefault();
    const afterelement = getDragAfterElement(container, e.clientY);
    const draggable = document.querySelector(".dragging");
    if (afterelement == null) {
      container.appendChild(draggable);
    } else {
      container.insertBefore(draggable, afterelement);
    }
  });
});

function getMouseDirection(e) {
  //deal with the horizontal case
  xDirection = oldX < e.pageX ? "right" : "left";

  //deal with the vertical case
  yDirection = oldY < e.pageY ? "down" : "up";

  oldX = e.pageX;
  oldY = e.pageY;
}

function getDragAfterElement(container, y) {
  const draggableElements = [
    ...container.querySelectorAll(".draggable:not(.dragging)"),
  ];
  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset =
        yDirection === "down" ? y - box.top : y - box.top - box.height;
      if (offset < 0 && offset > closest.offset) {
        return { offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}
