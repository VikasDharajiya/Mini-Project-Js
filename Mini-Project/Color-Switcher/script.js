let randomBtn = document.querySelector(".randomBtn");
let colorInput = document.querySelector("#colorInput");
let applyBtn = document.querySelector(".applyBtn");
let currentColorValue = document.querySelector(".currentColorValue");
let container = document.querySelector(".container");

const colorArray = [
  "red",
  "blue",
  "green",
  "cyan",
  "lightseagreen",
  "yellow",
  "tomato",
  "purple",
  "gray",
  "aqua",
  "black",
  "white",
];

const generateRandomColor = () => {
  const randomNumber = Math.floor(Math.random() * colorArray.length);
  return colorArray[randomNumber];
};

const colorChanger = (color) => {
  container.style.backgroundColor = color;
  currentColorValue.innerText = color;
};

const handleRandomBtn = () => {
  const color = generateRandomColor();
  colorChanger(color);
};

const handleApplyBtn = () => {
  const color = colorInput.value.trim();
  if (!color) return;

  colorChanger(color);
};

randomBtn.addEventListener("click", handleRandomBtn);
applyBtn.addEventListener("click", handleApplyBtn);
