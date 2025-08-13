const container = document.querySelector("#container");
makeGrid(16);
console.log("hola");
function makeGrid(size) {
  let gridSize = size * size;

  for (let i = 0; i < gridSize; i++) {
    let grid = document.createElement("div");

    grid.classList.add("grid");

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
