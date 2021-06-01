import { SIZE } from './game.js';
import { checkIfEquals } from './food.js';

export let snakeCoordiantes = [{x: 1, y: 1}];
const board = document.querySelector('#board');

export function update(newCoordinates) {
    for(let i = snakeCoordiantes.length - 2; i >= 0; i--) {
        snakeCoordiantes[i+1] = {...snakeCoordiantes[i]};
    }
    snakeCoordiantes[0].x += newCoordinates.x;
    snakeCoordiantes[0].y += newCoordinates.y;
    checkBorders(snakeCoordiantes[0]);
}

export function draw() {
    //board.innerHTML = '';
    const snakeNodes = document.querySelectorAll('.snake');
    if (snakeNodes && snakeNodes.length > 0) {
        snakeNodes.forEach(node  => node.remove());
    }
    for( const coordinate of snakeCoordiantes) {
        const element = document.createElement('div');
        element.style.gridRowStart = coordinate.y;
        element.style.gridColumnStart = coordinate.x;
        element.classList.add('snake');
        board.appendChild(element);
    }
}

function checkBorders(coordrinates) {
    if(coordrinates.x < 0) coordrinates.x = SIZE;
    if(coordrinates.x > SIZE) coordrinates.x = 0;
    if(coordrinates.y < 0) coordrinates.y = SIZE;
    if(coordrinates.y > SIZE) coordrinates.y = 0;
}

export function isHeadOnBody () {
    const head = snakeCoordiantes[0];
    if(snakeCoordiantes.length < 2) return;
    for(let i=1; i<snakeCoordiantes.length; i++) {
        if(checkIfEquals(snakeCoordiantes[i], head)) return true;
    }
    return false;
}

export function resetSankeCoordinates() {
    snakeCoordiantes = [{x: 1, y: 1}];
}