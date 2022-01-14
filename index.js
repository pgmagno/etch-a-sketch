const row = [];
const col = [];
let totalWidth = 500;
let gridSize = 0;
let brushdown = false;
let width = 0;
let height = 0;

applyChanges();

setTimeout( () => {
        drawGridBorders();
        blackBtn.classList.add("btn-pressed");
    }, 1000);

//////////////////////// main app //////////////////////////////////////

function applyChanges () {

    //this function combines many functions to destroy the grid and rebuild it
    // with custom values;

    const widthInput = document.querySelector(".width");

    gridSize = parseInt(widthInput.value);

    width = totalWidth/gridSize + "px";
    height = width;

    destroyGrid(); //// destroys
    buildGrid(gridSize);   //// creates new grid with custom value

    const selectAll = document.querySelectorAll(".col"); // when the grid is created in buildGrid(), we give '.col' to each cell

    selectAll.forEach(function(element) {

        element.style['width'] = width;
        element.style['height'] = height;
        element.style['background-color'] = 'rgba(0,0,0,0)'; /// uses input values for every new grid element

    });
}



///////////////////////// Grid Destroyer //////////////////////////

// to create a new grid, first we have the destroy the previous one,
// else multiple grids will be appended onto the page and overflow the container

function destroyGrid () {
    const grid = document.querySelectorAll('.row');
    grid.forEach(function(element) {
        element.remove();
    });
}

//////////////////////// CANVAS destroyer & remaker //////////////////////

function destroyRemakeCanvasElement () {

    const canvasElement = document.querySelector('.export-drawing');
    canvasElement.remove();

    const newCanvasElement = document.createElement('canvas');
    newCanvasElement.classList.add('export-drawing');
    newCanvasElement.setAttribute('width', 500);
    newCanvasElement.setAttribute('height', 500);
    const canvasDiv = document.querySelector('.canvas-div');
    canvasDiv.appendChild(newCanvasElement);
}

/////////////////////// Event Listeners for brush changes ////////////////////

let colorModeSelected = 'blackBrush'; // default

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

// this function gets called everytime a square is clicked to figure out which brush
// is currently selected and grab the correct color.

let colorChosen = '';

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
            colorChosen = 'transparent';
            break;

        default:
        console.log("colorSelect() encountered a problem");
    }
}

///////////////////////////////  Creates main grid //////////////////////////////////////

// this function uses arrays as kind of a mirror. The information is just temporarily
// stored in them to create a grid of DIV elements, which is essentially 1 large grid
// inside of which there X number of sub Divs (rows), and inside of each of them, X number
// of divs (cells). So 1 square, X rectangles, X squares inside the rectangles.
// while at it, we make sure each cell has the possibility of listening to clicks
// and click and drag. If TRUE, change its background color to match the selected color

function buildGrid (gridSize) {

    let mainGrid = document.querySelector(".main-grid");

    mainGrid.addEventListener('mousedown', () => {
        brushdown = true;
    });
    mainGrid.addEventListener('mouseup', () => {
        brushdown = false;
    });

    for (let i = 0; i < gridSize; i++) {
        row[i] = document.createElement("div");
        row[i].classList.add('row');
        row[i].classList.add('row' + i);

        mainGrid.appendChild(row[i]);

        for (let j = 0; j < gridSize; j++) {
            const cell = document.createElement("div");
            cell.classList.add('col');
            cell.classList.add('row' + i +'col' + j);

            row[i].appendChild(cell);
            cell.style['background-color'] = 'rgba(0,0,0,0)';
            cell.addEventListener('mouseover', () => {


                // this 'elaborate' name assembly is necessary because
                // we can't use col[j] directly or even give each cell the same name:
                // when the loop finishes
                // the event listeners are all going to be overwritten and only
                //the last row will receive the events (in the case of col[j]).
                // if we used only 'cell', the event listener would fire in the
                // first instance of cell, for every square.
                // When we create these names, and select them here
                // the event is attached to that particular DIV not the array
                // index, because this will change in every loop.

                if(brushdown) {

                    colorSelect();

                    if (colorChosen === 'rainbowBrush') {
                        const randColor = randomColorGen();
                        cell.setAttribute('data-color-info', randColor);
                        cell.style["background-color"] = randColor;
                    } else {
                        cell.style["background-color"] = colorChosen;
                    }
                }
            });

            cell.addEventListener('click', () => {

                    colorSelect()

                    if (colorChosen === 'rainbowBrush') {

                        const randColor = randomColorGen();
                        cell.setAttribute('data-color-info', randColor);


                        cell.style["background-color"] = randColor;
                    } else {
                        cell.style["background-color"] = colorChosen;
                    }

            });


        }
    }
}


//////////////////////// Creates random RGB values ////////////////////////////////////

function randomColorGen () { // creates a valid random RGB string to be used in rainbow brush

    const red = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);


    return `rgba(${red},${green},${blue})`;
}

/////////////////////// grid size /////////////////////////

const widthValue = document.querySelector('.width');
const widthValueDisplay = document.querySelector('.width-value');

widthValue.addEventListener("input", () => { // shows the grid size next to the slider
    widthValueDisplay.textContent = // gets updated when the slider changes
    `${widthValue.value} x ${widthValue.value}`;
});

widthValue.addEventListener("change", () => { // when the input is changed
    applyChanges();                         // destroyd everything, and builds it up
    drawGridBorders();                     // draws grid
});

//////////////////// clear everything WARNING //////////////////////

const clearBtn = document.querySelector('.clear-btn');
const warning = document.querySelector('.warning');
const confirm = document.querySelector('.confirm-btn');
const escape = document.querySelector('.escape-btn');
const controlsDiv = document.querySelector('.controls');

clearBtn.addEventListener('click', () => { // removes class that makes controls div larger
    controlsDiv.classList.toggle('larger'); // necessary for transition effect
});                                        // by toggling off, it hides the warning box again
                                           //pressing this or cancel does the same thing

confirm.addEventListener('click', () => { //

    destroyRemakeCanvasElement();
    applyChanges(); // destroys everything, builds it up
    controlsDiv.classList.toggle('larger'); // hides warning box
    drawGridBorders();                     //draws borders again
});

escape.addEventListener('click',() => { //same function of clear button
    controlsDiv.classList.toggle('larger'); //just hides everything
});

///////////////// enable borders around divs (photoshop-like grid) //////////

// main function to create borders. It's called upon load and everytime the grid is changed
// For this reason, it gets addEvent. toggling would work on first load and then desync
// on multiple grid changes

function drawGridBorders () {
    const gridCells = document.querySelectorAll('.col');

    gridCells.forEach(function(element) {
        element.classList.add('gridborders');
    });

    gridBtn.classList.add('btn-pressed');
}

// Now, the button to activate the grid gets toggleEvent. This way, changing
// grid size and toggling grid will never cause desync between button pressed
// and the actual grid drawn on the screen

const gridBtn = document.querySelector('.grid-btn');

gridBtn.addEventListener('click', () => {

    gridBtn.classList.toggle('btn-pressed');

    const gridCells = document.querySelectorAll('.col');
        gridCells.forEach( element => {
            element.classList.toggle('gridborders');
        });
});

//////////////////////  Swatches Creation ///////////////////////////

const swatches = document.querySelector(".swatches");

let swatchBoxCount = 14;

for(let i = 0; i < swatchBoxCount; i++) {
    const swatchBox = document.createElement('div');
    swatchBox.classList.add('swatch-box');
    swatches.appendChild(swatchBox);
}

////////// add color to swatch /////////////

const swatchBtnAdd = document.querySelector('.btn-add');
const allSwatchBoxes = document.querySelectorAll('.swatch-box');

let arrayFromSwatches = Array.from(allSwatchBoxes);

let currentlySelectedSwatch = 0; // used to keep track of which swatch is replaced when + is clicked

swatchBtnAdd.addEventListener('click', () => {
    for (var i = 0; i < arrayFromSwatches.length; i++) {
        if (i === currentlySelectedSwatch) {
            arrayFromSwatches[i].style["background-color"] = colorPicker.value; // changes swatch background color
            arrayFromSwatches[i].setAttribute('data-color-info', colorPicker.value); // saves color information in custom data variable
            arrayFromSwatches[i].classList.add('swatch-box-filled'); // used to change cursor to pointer
        }
    }

    currentlySelectedSwatch++;

    if(currentlySelectedSwatch >= arrayFromSwatches.length) {
        currentlySelectedSwatch = 0; //resets the counter so that array of swatches becomes circular restarting from 0 index
    }
});

allSwatchBoxes.forEach( box => {
    box.addEventListener('click', () => {

        if(box.hasAttribute('data-color-info')) { // checks if the color swatch has color and only so it adds event listener

            removePressedAllBtn(); //when switching between all kinds of brush and swatches,
            blackBtn.classList.add('btn-pressed'); //these three lines make sure when swatch is clicked,
            colorModeSelected = 'blackBrush'; // the black brush gets selected

            colorPicker.value = box.getAttribute('data-color-info'); // changes picker color to match the swatch clicked
        }
    });
});

////////////////// export feature ///////////////

const exportBtn = document.querySelector('.export-btn');

exportBtn.addEventListener('click', () => {
    draw();
    downloadCanvasAsImage();
});

function draw() {

    erasePartsOfCanvas();

    const allSquares = document.querySelectorAll('.col');
    arrayOfAllSquares = Array.from(allSquares);

    let sizeOfSquare = totalWidth/gridSize;

    var canvas = document.querySelector('.export-drawing');

    if (canvas.getContext) {

        let ctx = canvas.getContext('2d');

        let w = 0; //w is used as an absolute counter, because squares array is not devided in rows or cols

        // this is a matrix loop. i is the number of rows (=gridSize), j is the number of columns (=gridSize)
        // the idea being that we create a square of the same size of the grid square we used in the painting area
        // we populate the canvas element with this square. Every square takes the original grid square background-color value
        // to draw a square of that color onto the canvas.
        // the values of j and i are inversed (j = x axis, i = Y axis) when compared to typical matrix loops
        // the reason is that we are painting 'horizontally', we create a row
        // and paint left to right all the elements of the row, i.e, one element
        // of each column, after that we move on to the next row.

        for(let i = 0; i < gridSize; i++) { // rows
            for(let j = 0; j < gridSize; j++) { //cols

                ctx.fillStyle = arrayOfAllSquares[w].style['background-color'];
                ctx.fillRect(sizeOfSquare * j, sizeOfSquare * i, sizeOfSquare, sizeOfSquare); // x, y, length of X, length of Y.
                w++;   // absolute counter increment notwithstanding i and j
            }
        }
    }
}

function erasePartsOfCanvas () {

    const allSquares = document.querySelectorAll('.col');
    arrayOfAllSquares = Array.from(allSquares);

    let sizeOfSquare = totalWidth/gridSize;

    var canvas = document.querySelector('.export-drawing');

    if (canvas.getContext) {

        let ctx = canvas.getContext('2d');

        let w = 0; //w is used as an absolute counter, because squares array is not devided in rows or cols

        // same idea of the draw() but uses it to discover 'erased' areas and
        // uses getContext 2d own clearRect method to remove these areas
        // from the canvas before exporting.
        // I couldn't get it to simply paint over transparent values, so this was
        // a compromise that ended up working almost 99% well, since it leaves
        // very thin pixel lines (don't know why)

        for(let i = 0; i < gridSize; i++) { // rows
            for(let j = 0; j < gridSize; j++) { //cols
                if(arrayOfAllSquares[w].style['background-color'] === 'transparent') {
                    ctx.clearRect(sizeOfSquare * j, sizeOfSquare * i, sizeOfSquare, sizeOfSquare); // x, y, length of X, length of Y.
                }
                w++;   // absolute counter increment notwithstanding i and j
            }
        }
    }
}


function downloadCanvasAsImage() {
    let downloadLink = document.createElement('a');
    downloadLink.setAttribute('download', 'pixel-art-masterpiece.png');
    let canvas = document.querySelector('.export-drawing');
    canvas.toBlob(function(blob) {

        let url = URL.createObjectURL(blob);
        downloadLink.setAttribute('href', url);
        downloadLink.click();
    });
}
