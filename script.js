const container = document.querySelector("#container");
let mode = document.querySelector("#mode");
let modeSelected;

let btnMode = document.querySelector(".btnMode");
btnMode.addEventListener("click", () => {
  modeSelected = mode.value;
});

makeGrid(16);

function makeGrid(size) {
  let gridSize = size * size;

  for (let i = 0; i < gridSize; i++) {
    let grid = document.createElement("div");

    grid.classList.add("grid");

    container.appendChild(grid);
  }

  addEventListenersToGrids(modeSelected);
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
  }

  grids.forEach((x) => {
    x.addEventListener("mouseover", functionToCall);
  });
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

  e.currentTarget.style.backgroundColor = randomColor

}
