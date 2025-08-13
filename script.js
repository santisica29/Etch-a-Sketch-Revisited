const container = document.querySelector('#container');
makeGrid(16);
console.log('hola')
function makeGrid(size){
    let gridSize = size * size;

    for (let i=0; i < gridSize; i++){
        
        let grid = document.createElement('div');

        grid.classList.add('grid');

        

        container.appendChild(grid);
    }
}