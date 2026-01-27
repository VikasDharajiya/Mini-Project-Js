let todoList = document.querySelector(".todo-list");
let addBtn = document.querySelector(".addBtn");
let addInput = document.querySelector("#addInput");

const list = [
  {
    id: 1232,
    text: "Js Dom",
  },
  {
    id: 6532,
    text: "Learn React",
  },
];

function renderList(arr) {
  todoList.innerHTML = "";

  arr.map((obj) => {
    let elemLi = document.createElement("li");
    elemLi.innerHTML = `
      <span>${obj.text}</span>
      <button class="delete-btn">✖</button>
  `;
    todoList.append(elemLi);
  });
}
renderList(list);

function handelAddListBtn() {
  let obj = {
    id: Date.now(),
    text: addInput.value,
  };
  list.push(obj);
  renderList(list);
  addInput.value = "";
}

addBtn.addEventListener("click", handelAddListBtn);

todoList.addEventListener("click", function (e) {
  if (e.target.classList.contains("delete-btn")) {
    e.target.parentElement.remove();
  }
});
