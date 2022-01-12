const row = [];
const col = [];
let mainGrid = "";
let totalWidth = 500;
let gridSize = 100;
let brushdown = false;

mainGrid = document.querySelector(".main-grid");

applyChanges();
setTimeout(() => {
    drawGridBorders();
    blackBtn.classList.add("btn-pressed");
}
    ,1000);

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
    removePressedAllBtn();
    blackBtn.classList.add('btn-pressed');
});

const rainbowBtn = document.querySelector('.btn-rainbow');
rainbowBtn.addEventListener('click', () => {
    colorModeSelected = 'rainbowBrush';
    removePressedAllBtn();
    rainbowBtn.classList.add('btn-pressed');
});

const colorPicker = document.querySelector('#favcolor');
colorPicker.addEventListener('click', () => {
    colorModeSelected = 'customBrush';
    removePressedAllBtn();
    blackBtn.classList.add('btn-pressed');
});

const eraserBtn = document.querySelector('.btn-eraser');
eraserBtn.addEventListener('click', () => {
    colorModeSelected = 'eraser';

    removePressedAllBtn();
    eraserBtn.classList.add('btn-pressed');
});

/////////////// Remove highlight of all buttons ////////////

function removePressedAllBtn () {
    blackBtn.classList.remove('btn-pressed');
    rainbowBtn.classList.remove('btn-pressed');
    eraserBtn.classList.remove('btn-pressed');
}



//////////////// Color Selector //////////////////////

function colorSelect() {

    switch (colorModeSelected) {
        case 'blackBrush':
            colorChosen = colorPicker.value;
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

const warning = document.querySelector('.warning');
const confirm = document.querySelector('.confirm-btn');
const escape = document.querySelector('.escape-btn');
const controlsDiv = document.querySelector('.controls');


clearBtn.addEventListener('click', () => {
    warning.classList.toggle('hidden');
    controlsDiv.classList.toggle('larger');
});

confirm.addEventListener('click', () => {
    destroyGrid();
    applyChanges();
    controlsDiv.classList.toggle('larger')
    drawGridBorders();
});

escape.addEventListener('click',() => {
    controlsDiv.classList.toggle('larger');
});



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
        gridCells.forEach( element => {
            element.classList.toggle('gridborders');
        });
});

//////////////////////  Swatches ///////////////////////////

const swatches = document.querySelector(".swatches");

for(let i = 0; i < 14; i++) {
    const swatchBox = document.createElement('div');
    swatchBox.classList.add('swatch-box');
    swatches.appendChild(swatchBox);
}



////////// add color to swatch /////////////
const swatchBtnAdd = document.querySelector('.btn-add');


const allSwatchBoxes = document.querySelectorAll('.swatch-box');

let y = 0;

let arrayFromSwatches = Array.from(allSwatchBoxes);



let currentlySelectedSwatch = 0;

swatchBtnAdd.addEventListener('click', () => {
    for (var i = 0; i < arrayFromSwatches.length; i++) {
        if (i === currentlySelectedSwatch) {
            arrayFromSwatches[i].style["background-color"] = colorPicker.value;
            arrayFromSwatches[i].setAttribute('data-color-info', colorPicker.value);
            arrayFromSwatches[i].classList.add('swatch-box-filled');
        }
    }

    currentlySelectedSwatch++;

    if(currentlySelectedSwatch >= arrayFromSwatches.length) {
        currentlySelectedSwatch = 0;
    }
});



allSwatchBoxes.forEach( box => {
    box.addEventListener('click', () => {

        if(box.hasAttribute('data-color-info')) {

        removePressedAllBtn();
        blackBtn.classList.add('btn-pressed');

        colorModeSelected = 'blackBrush';
        colorPicker.value = box.getAttribute('data-color-info');

}

    });
});
