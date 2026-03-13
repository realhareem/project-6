const draggable_list = document.getElementById("draggable-list");
const check = document.getElementById("check");

const richestPeople = [
  "Elon Musk",
  "Bernard Arnault",
  "Jeff Bezos",
  "Larry Ellison",
  "Mark Zuckerberg",
  "Bill Gates",
  "Warren Buffett",
  "Larry Page",
  "Sergey Brin",
  "Mukesh Ambani"
];

const listItems = [];
let dragStartIndex;

createList();

function createList() {
  [...richestPeople]
    .map(a => ({ value: a, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(a => a.value)
    .forEach((person, index) => {
      const listItem = document.createElement("li");
      listItem.setAttribute("data-index", index);
      listItem.innerHTML = `
        <div class="number">${index + 1}</div>
        <div class="draggable" draggable="true">
          <p class="person-name">${person}</p>
          <i class="fas fa-grip-lines"></i>
        </div>
      `;
      listItems.push(listItem);
      draggable_list.appendChild(listItem);
    });

  addEventListener();
}

function dragStart() {
  dragStartIndex = +this.closest("li").getAttribute("data-index");
}

function dragEnter() { this.classList.add("over"); }
function dragOver(e) { e.preventDefault(); }
function dragLeave() { this.classList.remove("over"); }

function dragDrop() {
  const dropEndIndex = +this.getAttribute("data-index");

  // Remove dragged item from its position
  const draggedItem = listItems.splice(dragStartIndex, 1)[0];

  // Insert dragged item at new position
  listItems.splice(dropEndIndex, 0, draggedItem);

  // Update DOM
  listItems.forEach((item, idx) => {
    item.setAttribute("data-index", idx);
    draggable_list.appendChild(item);
    item.querySelector(".number").innerText = idx + 1;
  });

  this.classList.remove("over");
}

function checkOrder() {
  listItems.forEach((listItem, index) => {
    const personName = listItem.querySelector(".draggable .person-name").innerText.trim();
    if (personName !== richestPeople[index]) {
      listItem.classList.add("wrong");
      listItem.classList.remove("right");
    } else {
      listItem.classList.remove("wrong");
      listItem.classList.add("right");
    }
  });
}

function addEventListener() {
  const draggable = document.querySelectorAll(".draggable");
  const dragListItems = document.querySelectorAll("#draggable-list li");

  draggable.forEach(item => {
    item.addEventListener("dragstart", dragStart);
  });

  dragListItems.forEach(item => {
    item.addEventListener("dragover", dragOver);
    item.addEventListener("drop", dragDrop);
    item.addEventListener("dragenter", dragEnter);
    item.addEventListener("dragleave", dragLeave);
  });
}

check.addEventListener("click", checkOrder);