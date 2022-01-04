const row = [];
const col = [];
let mainGrid = "";
let totalWidth = 500;
let gridSize = 100;
let brushdown = false;

mainGrid = document.querySelector(".main-grid");



//////////////////////// main app //////////////////////////////////////
const changeSizeBtn = document.querySelector('.changeSizeBtn');

changeSizeBtn.addEventListener('click', () => {

    const widthInput = document.querySelector(".width");

///////////////////// tests if the input size is valid /////////////////

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

});



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
});

const rainbowBtn = document.querySelector('.btn-rainbow');
rainbowBtn.addEventListener('click', () => {
    colorModeSelected = 'rainbowBrush';
});

const colorPicker = document.querySelector('#favcolor');
colorPicker.addEventListener('input', () => {
    colorModeSelected = 'customBrush';

});




///////////////////////////////  Creates main grid //////////////////////////////////////

function buildGrid (gridSize) {

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

        default:
        console.log("problem choosing color");
    }


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
                    if (colorChosen === 'rainbowBrush') {
                        cell.style["background-color"] = randomColorGen();
                    } else {
                        cell.style["background-color"] = colorChosen;
                    }
                }
            });

            col[j].addEventListener('click', () => {

                const cell = document.querySelector('.row' + i + 'col' + j);

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
