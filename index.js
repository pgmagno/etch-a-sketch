const row = [];
const col = [];
let mainGrid = "";
let totalWidth = 500;
let gridSize = 100;


const changeSizeBtn = document.querySelector('.changeSizeBtn');

changeSizeBtn.addEventListener('click', () => {

    const widthInput = document.querySelector(".width");

    if(widthInput.value > 100 || widthInput.value < 1) {
        const msg = document.createElement('h3');
        msg.textContent = "Invalid Input. Default values set (100). Wait";
        const controls = document.querySelector('.controls');
        controls.appendChild(msg);
        gridSize = 100;
        setTimeout( () => {
            controls.removeChild(msg);
        },2000);

    } else {
        gridSize = widthInput.value;
    }

    const width = totalWidth/gridSize + "px";
    const height = width;

    destroyGrid();
    buildGrid(gridSize);

    const selectAll = document.querySelectorAll(".col");
    selectAll.forEach(function(element) {
      element.setAttribute('style', `width: ${width}; height: ${height}`);
    });

});

function destroyGrid () {
    const grid = document.querySelectorAll('.row');
    grid.forEach(function(element) {
        element.remove();
    });
}

function buildGrid (gridSize) {

    const color = document.querySelector('#favcolor');
    colorChosen = color.value;


    for (let i = 0; i < gridSize; i++) {
        row[i] = document.createElement("div");
        row[i].classList.add('row');
        row[i].classList.add('row' + i);
        mainGrid = document.querySelector(".main-grid");
        mainGrid.appendChild(row[i]);

        for (let j = 0; j < gridSize; j++) {
            col[j] = document.createElement("div");
            col[j].classList.add('col');
            col[j].classList.add('row' + i +'col' + j);

            col[j].addEventListener('mouseover', () => {
                const cell = document.querySelector('.row' + i + 'col' + j);
                cell.style["background-color"] = colorChosen;
            });

            row[i].appendChild(col[j]);
        }
    }
}
