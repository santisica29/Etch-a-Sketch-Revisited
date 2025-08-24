const container = document.querySelector("#container");
let mode = document.querySelector("#mode");
let modeSelected;
let currentEventListenerFunction;
let btnGenerate = document.querySelector(".btnGenerate");
let msg = document.querySelector('.msg');
let resetBtn = document.querySelector('.resetBtn');

resetBtn.addEventListener('click', reset);

btnGenerate.addEventListener("click", generateNewGrid);

let btnMode = document.querySelector(".btnMode");
btnMode.addEventListener("click", () => {
  modeSelected = mode.value;
  console.log(modeSelected);
  addEventListenersToGrids(modeSelected);
});

makeGrid(16);

function makeGrid(size) {
  let gridSize = size * size;
  let root = document.documentElement;
  root.style.setProperty(
    "--grid-size-percentage",
    `calc(var(--container-width) / ${size})`
  );

  for (let i = 0; i < gridSize; i++) {
    let grid = document.createElement("div");

    grid.classList.add("grid");

    container.appendChild(grid);
  }
}

function removeGrid() {
  let grids = document.querySelectorAll(".grid");

  grids.forEach((grid) => grid.remove());
}

function generateNewGrid() {
  let newSize = document.querySelector("#gridSize").value;
  if (newSize === "") return;
  if (newSize > 100 || newSize < 1) {
    msg.textContent = 'invalid option';
    msg.style.color = 'red';

    setTimeout(() => msg.textContent = '', 2000);
    return;
  }

  removeGrid();
  makeGrid(newSize);
}

function reset(){
  removeGrid();
  makeGrid(16);
}

function addEventListenersToGrids(modeSelected) {
  let grids = document.querySelectorAll(".grid");
  let functionToCall;

  switch (modeSelected) {
    case "color":
      functionToCall = colorMode;
      break;
    case "random":
      functionToCall = randomMode;
      break;
    case "dark":
      functionToCall = darkMode;
      break;
    case "eraser":
      functionToCall = eraserMode;
      break;
    default:
      functionToCall = colorMode;
      break;
  }

  grids.forEach((x) => {
    if (currentEventListenerFunction != undefined) {
      x.removeEventListener("mouseover", currentEventListenerFunction);
    }
    x.addEventListener("mouseover", functionToCall);
  });

  currentEventListenerFunction = functionToCall;
}

function colorMode(e) {
  let colorValue = document.querySelector(".colorPicker").value;

  e.currentTarget.style.backgroundColor = colorValue;
}

function eraserMode(e) {
  e.currentTarget.style.filter = 'brightness(1)'
  let doesItHaveAColorSet = e.currentTarget.style.backgroundColor != "";

  if (doesItHaveAColorSet) e.currentTarget.style.backgroundColor = "white";
}

function randomMode(e) {
  let randomNum1 = Math.floor(Math.random() * 256);
  let randomNum2 = Math.floor(Math.random() * 256);
  let randomNum3 = Math.floor(Math.random() * 256);

  let randomColor = `rgb(${randomNum1}, ${randomNum2}, ${randomNum3})`;

  e.currentTarget.style.backgroundColor = randomColor;
}

function darkMode(e){
  let currentBrightness = window.getComputedStyle(e.currentTarget).getPropertyValue('filter');

  if (currentBrightness === 'none'){
    currentBrightness = e.currentTarget.style.filter = 'brightness(1)';
  } 

  let currentBrightnessValue = currentBrightness.split("").filter(x => Number(x) || x === '.').join('');
  
  e.currentTarget.style.filter = `brightness(${currentBrightnessValue - 0.1})`;
}

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgb(${r}, ${g}, ${b})`;
}
