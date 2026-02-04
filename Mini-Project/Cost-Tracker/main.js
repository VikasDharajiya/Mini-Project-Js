const titleInput = document.getElementById("title");
const amountInput = document.getElementById("amount");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("list");
const totalAmount = document.querySelector("#totalAmount");

let expenses = [];
let editId = null;
let lastAddedId = null;

function toggleAddButton() {
  const title = titleInput.value.trim();
  const amount = Number(amountInput.value);

  if (title && amount > 0) {
    addBtn.disabled = false;
    addBtn.classList.remove("opacity-50", "cursor-not-allowed");
  } else {
    addBtn.disabled = true;
    addBtn.classList.add("opacity-50", "cursor-not-allowed");
  }
}
toggleAddButton();

titleInput.addEventListener("input", toggleAddButton);
amountInput.addEventListener("input", toggleAddButton);

const saved = localStorage.getItem("expenses");
expenses = saved ? JSON.parse(saved) : [];

render();

function addBtnHandler() {
  const title = titleInput.value;
  const amount = Number(amountInput.value);
  if (!title || !amount) return;

  if (editId === null) {
    const id = Date.now();
    expenses.push({
      id,
      title,
      amount,
      date: new Date().toLocaleDateString(),
    });

    lastAddedId = id; // 🔥 NEW
  } else {
    expenses = expenses.map((e) =>
      e.id === editId ? { ...e, title, amount } : e,
    );

    editId = null;
    addBtn.textContent = "Add";
    addBtn.classList.remove("bg-orange-500");
    addBtn.classList.add("bg-black");
  }

  render();

  titleInput.value = "";
  amountInput.value = "";
  toggleAddButton();
  titleInput.focus();
  clearEditingHighlight();
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !addBtn.disabled) {
    addBtnHandler();
  }
});

addBtn.addEventListener("click", addBtnHandler);

function clearEditingHighlight() {
  document.querySelectorAll("#list li").forEach((li) => {
    li.classList.remove("bg-orange-50", "border", "border-orange-400");
  });
}

function render() {
  if (expenses.length === 0) {
    list.innerHTML = `
      <li class="flex flex-col items-center justify-center py-10 text-gray-400">
        <p class="text-lg font-medium">No expenses yet</p>
        <p class="text-sm">Add your first expense above</p>
      </li>
    `;
    totalAmount.textContent = "Total : ₹ 0";
    return;
  }

  list.innerHTML = "";

  let total = 0;

  expenses.forEach((elem) => {
    const li = document.createElement("li");
    li.dataset.id = elem.id;
    li.className =
      "flex justify-between items-center bg-white p-3 rounded shadow-md transition-all duration-200";

    // 🔥 NEW — smooth add animation
    if (elem.id === lastAddedId) {
      li.classList.add("opacity-0", "translate-y-2");
      requestAnimationFrame(() => {
        li.classList.remove("opacity-0", "translate-y-2");
      });
    }

    li.innerHTML = `
      <div>
        <p class="font-medium">
          ${elem.title} :
          <span class="text-gray-500">₹ ${elem.amount}</span>
        </p>
        <p class="text-xs text-gray-400">${elem.date}</p>
      </div>

      <div class="space-x-2">
        <button class="edit-btn text-blue-500 hover:scale-110 transition">🔁</button>
        <button class="delete-btn text-red-500 hover:scale-110 transition">❌</button>
      </div>
    `;

    li.querySelector(".delete-btn").addEventListener("click", () => {
      if (!confirm("Delete this expense?")) return;
      expenses = expenses.filter((e) => e.id !== elem.id);
      localStorage.setItem("expenses", JSON.stringify(expenses));
      render();
    });

    li.querySelector(".edit-btn").addEventListener("click", () => {
      titleInput.value = elem.title;
      amountInput.value = elem.amount;

      editId = elem.id;
      addBtn.textContent = "Update";
      addBtn.classList.remove("bg-black");
      addBtn.classList.add("bg-orange-500");

      toggleAddButton();
      clearEditingHighlight();

      li.classList.add("bg-orange-50", "border", "border-orange-400");

      // 🎯 scroll edited row
      li.scrollIntoView({ behavior: "smooth", block: "center" });
    });

    list.appendChild(li);
    total += elem.amount;
  });

  totalAmount.textContent = `Total : ₹ ${total}`;
  localStorage.setItem("expenses", JSON.stringify(expenses));

  lastAddedId = null; // 🔥 NEW
}

document.getElementById("clearAll").addEventListener("click", () => {
  if (!confirm("Clear this All expense?")) return;

  expenses = [];
  localStorage.removeItem("expenses");

  editId = null;
  addBtn.textContent = "Add";
  addBtn.className = "w-full bg-black text-white py-2 rounded mb-4";

  titleInput.value = "";
  amountInput.value = "";

  toggleAddButton();
  clearEditingHighlight();
  render();
});
