const container = document.querySelector("#container");
let mode = document.querySelector('#mode');
let modeSelected;

let btnMode = document.querySelector('.btnMode');
btnMode.addEventListener('click', () => {
  modeSelected = mode.value;
})

makeGrid(16);


function makeGrid(size) {
  let gridSize = size * size;

  for (let i = 0; i < gridSize; i++) {
    let grid = document.createElement("div");

    grid.classList.add("grid");

    if (modeSelected === undefined)
    if (modeSelected === 'eraser'){
      grid.addEventListener('mouseover', eraserMode);
    }
    // separate this section
    grid.addEventListener("mouseover", (e) => {
      let doesItHaveAColorSet = e.currentTarget.style.backgroundColor != "";
      if (doesItHaveAColorSet) {
        e.currentTarget.style.backgroundColor = "";
      } else {
        e.currentTarget.style.backgroundColor = "red";
      }
    });

    container.appendChild(grid);
  }
}

function eraserMode(e) {
  let doesItHaveAColorSet = e.currentTarget.style.backgroundColor != "";

  if (doesItHaveAColorSet) e.currentTarget.style.backgroundColor = "";
}
