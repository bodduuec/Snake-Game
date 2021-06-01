import { SIZE } from './game.js';
import { snakeCoordiantes } from './snake.js';

const food = {x: 5, y: 5};
const board = document.querySelector('#board');

export function eatFood(newCoordinates) {
    for(const coordinate of snakeCoordiantes) {
        if(checkIfEquals(coordinate, food)) {
            const newHeadCoordinate = {x: snakeCoordiantes[0].x + newCoordinates.x, y: snakeCoordiantes[0].y + newCoordinates.y};
            snakeCoordiantes.push({...newHeadCoordinate});
            createFood();
            return;
        }
    }
}

export function checkIfEquals(a, b) {
    return a.x === b.x && a.y === b.y; 
}

function addFood() {
    const foodNode = document.querySelector('.food');
    if(foodNode) foodNode.remove();
    const element = document.createElement('div');
    element.style.gridRowStart = food.y;
    element.style.gridColumnStart = food.x;
    element.classList.add('food');
    board.appendChild(element);
}

addFood();

export function createFood() {
    while(isFoodOnSnake()) {
        food.x = Math.floor(Math.random()*SIZE + 1);
        food.y = Math.floor(Math.random()*SIZE + 1);
    }
    addFood();
}

function isFoodOnSnake() {
    for(const coordinate of snakeCoordiantes) {
        if(checkIfEquals(coordinate, food)) return true;
    }
}