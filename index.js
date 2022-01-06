const row = [];
const col = [];
let mainGrid = "";
let totalWidth = 500;
let gridSize = 100;
let brushdown = false;

mainGrid = document.querySelector(".main-grid");

applyChanges();
setTimeout(drawGridBorders,1000);

//////////////////////// main app //////////////////////////////////////

function applyChanges () {

    const widthInput = document.querySelector(".width");

            //
        gridSize = widthInput.value;

////////////////// being valid, calculates the grid, destroy previous, creates new one /////////

    const width = totalWidth/gridSize + "px";
    const height = width;

    destroyGrid(); //// destroys
    buildGrid(gridSize);   //// creates


    const selectAll = document.querySelectorAll(".col");
    selectAll.forEach(function(element) {
      element.setAttribute('style', `width: ${width}; height: ${height}`); /// uses input values for every new grid element
      element.addEventListener('mousedown', () => {
          brushdown = true;
      });

      element.addEventListener('mouseup', () => {
          brushdown = false;
      });


    });
}



///////////////////////// destroys grid so as to not append multiple grids //////////////////////////

function destroyGrid () {
    const grid = document.querySelectorAll('.row');
    grid.forEach(function(element) {
        element.remove();
    });
}


/////////////////////// Event Listener for when the color of picker changes ////////////////////

let colorModeSelected = 'blackBrush';

const blackBtn = document.querySelector('.btn-black');
blackBtn.addEventListener('click', () => {
    colorModeSelected = 'blackBrush';
    blackBtn.classList.add('btn-pressed');
    rainbowBtn.classList.remove('btn-pressed');
    eraserBtn.classList.remove('btn-pressed');

});

const rainbowBtn = document.querySelector('.btn-rainbow');
rainbowBtn.addEventListener('click', () => {
    colorModeSelected = 'rainbowBrush';
    blackBtn.classList.remove('btn-pressed');
    eraserBtn.classList.remove('btn-pressed');
    rainbowBtn.classList.add('btn-pressed');
});

const colorPicker = document.querySelector('#favcolor');
colorPicker.addEventListener('change', () => {
    colorModeSelected = 'customBrush';

});

const eraserBtn = document.querySelector('.btn-eraser');
eraserBtn.addEventListener('click', () => {
    colorModeSelected = 'eraser';
    blackBtn.classList.remove('btn-pressed');
    rainbowBtn.classList.remove('btn-pressed');
    eraserBtn.classList.add('btn-pressed');
});


//////////////// Color Selector //////////////////////

function colorSelect() {


switch (colorModeSelected) {
    case 'blackBrush':
        colorChosen = '#444444';
        break;
    case 'rainbowBrush':
        colorChosen = 'rainbowBrush';
        break;
    case 'customBrush':
        colorChosen = colorPicker.value;
        break;
    case 'eraser':
        colorChosen = '';
        break;

    default:
    console.log("problem choosing color");
}
}

///////////////////////////////  Creates main grid //////////////////////////////////////

function buildGrid (gridSize) {




    for (let i = 0; i < gridSize; i++) {
        row[i] = document.createElement("div");
        row[i].classList.add('row');
        row[i].classList.add('row' + i);

        mainGrid.appendChild(row[i]);

        for (let j = 0; j < gridSize; j++) {
            col[j] = document.createElement("div");
            col[j].classList.add('col');
            col[j].classList.add('row' + i +'col' + j);

            col[j].addEventListener('mouseover', () => {

                const cell = document.querySelector('.row' + i + 'col' + j);

                if(brushdown) {

                    colorSelect();

                    if (colorChosen === 'rainbowBrush') {
                        cell.style["background-color"] = randomColorGen();
                    } else {
                        cell.style["background-color"] = colorChosen;
                    }
                }
            });

            col[j].addEventListener('click', () => {

                const cell = document.querySelector('.row' + i + 'col' + j);

                    colorSelect()

                    if (colorChosen === 'rainbowBrush') {
                        cell.style["background-color"] = randomColorGen();
                    } else {
                        cell.style["background-color"] = colorChosen;
                    }

            });

            row[i].appendChild(col[j]);
        }
    }
}


//////////////////////// Creates random RGB values ////////////////////////////////////

function randomColorGen () {
    const red = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);

    const finalColor = `rgb(${red},${green},${blue})`;

    return finalColor;
}

/////////////////////// grid size /////////////////////////

const widthValue = document.querySelector('.width');
const widthValueDisplay = document.querySelector('.width-value');

widthValue.addEventListener("input", () => {
    widthValueDisplay.textContent = `${widthValue.value} x ${widthValue.value}`;
    

});

widthValue.addEventListener("change", () => {
    applyChanges();
    drawGridBorders();
});

//////////////////// clear everything WARNING //////////////////////

const clearBtn = document.querySelector('.clear-btn');
const warning = document.createElement('div');
const warningMsg = document.createElement('h3');
const confirm = document.createElement('button');
const escape = document.createElement('button');
const controlsDiv = document.querySelector('.controls');

warning.classList.add('warning');
warning.classList.add('hidden');

warningMsg.classList.add('warning-msg');
warningMsg.textContent = 'Do you want to discard changes?';

confirm.textContent = 'Yes';
confirm.classList.add('warning-btn');

escape.textContent = 'Cancel';
escape.classList.add('warning-btn');

clearBtn.addEventListener('click', () => {

    warning.appendChild(warningMsg);
    warning.appendChild(confirm);
    warning.appendChild(escape);

    controlsDiv.appendChild(warning);
    warning.classList.toggle('hidden');

});

confirm.addEventListener('click', () => {
    destroyGrid();
    applyChanges();
    removeWarning();
    drawGridBorders();
});

escape.addEventListener('click', removeWarning);


function removeWarning() {
    warning.classList.add('hidden');
}

///////////////// enable borders around divs (photoshop-like grid) //////////



function drawGridBorders () {
    const gridCells = document.querySelectorAll('.col');

    gridCells.forEach(function(element) {
        element.classList.add('gridborders');
    });

    gridBtn.classList.add('btn-pressed');
}

const gridBtn = document.querySelector('.grid-btn');

gridBtn.addEventListener('click', () => {

    gridBtn.classList.toggle('btn-pressed');

    const gridCells = document.querySelectorAll('.col');
        gridCells.forEach(function(element) {
            element.classList.toggle('gridborders');
        });
});
