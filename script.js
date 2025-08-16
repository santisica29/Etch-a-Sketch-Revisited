const container = document.querySelector("#container");
let mode = document.querySelector("#mode");
let modeSelected;
let currentEventListenerFunction;
let btnGenerate = document.querySelector('.btnGenerate');

btnGenerate.addEventListener('click', generateNewGrid);

function generateNewGrid(){
  let newSize = document.querySelector('#gridSize').value;
  if (newSize === '') return;
  if (newSize > 100 || newSize < 1) {
    alert('invalid option');
    return;
  }

  removeGrid();
  makeGrid(newSize);
}

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
  root.style.setProperty('--grid-size-percentage', `calc(var(--container-width) / ${size})`);

  for (let i = 0; i < gridSize; i++) {
    let grid = document.createElement("div");

    grid.classList.add("grid");

    container.appendChild(grid);
  }
}

function removeGrid(){
  let grids = document.querySelectorAll('.grid');

  grids.forEach(grid => grid.remove());
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
    case "eraser":
      functionToCall = eraserMode;
      break;
    default:
      functionToCall = colorMode;
      break;
  }

  grids.forEach((x) => {
    if (currentEventListenerFunction != undefined) {
      x.removeEventListener('mouseover', currentEventListenerFunction);
    }
    x.addEventListener("mouseover", functionToCall);
  });

  currentEventListenerFunction = functionToCall;
}

function colorMode(e) {
  e.currentTarget.style.backgroundColor = "red";
}

function eraserMode(e) {
  let doesItHaveAColorSet = e.currentTarget.style.backgroundColor != "";

  if (doesItHaveAColorSet) e.currentTarget.style.backgroundColor = "";
}

function randomMode(e) {
  let randomNum1 = Math.floor(Math.random() * 256);
  let randomNum2 = Math.floor(Math.random() * 256);
  let randomNum3 = Math.floor(Math.random() * 256);

  let randomColor = `rgb(${randomNum1}, ${randomNum2}, ${randomNum3})`;

  e.currentTarget.style.backgroundColor = randomColor;
}
