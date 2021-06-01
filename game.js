import { draw as drawSnake, update as updateSnake, isHeadOnBody, resetSankeCoordinates } from "./snake.js";
import { eatFood, createFood } from './food.js';

const SNAKE_SPEED = 5; //moves per second
export const SIZE = 40;
const newCoordinates = {x: 1, y: 0};
let lastUpdatedTime;

//export snakeCoordiantes;

function addClickEvent() {
    window.addEventListener('keydown', handleClick);
}

function handleClick(event) {
    const key = event.key;
    switch(key){
        case 'ArrowUp':
            if(newCoordinates.y === 1) return;
            newCoordinates.x = 0;
            newCoordinates.y = -1;
            break;
        case 'ArrowDown':
            if(newCoordinates.y === -1) return;
            newCoordinates.x = 0;
            newCoordinates.y = 1;
            break;
        case 'ArrowLeft':
            if(newCoordinates.x === 1) return;
            newCoordinates.x = -1;
            newCoordinates.y = 0;
            break;
        case 'ArrowRight':
            if(newCoordinates.x === -1) return;
            newCoordinates.x = 1;
            newCoordinates.y = 0;
            break;
    }
}

addClickEvent();

function game(timeNow) {
    window.requestAnimationFrame(game);
    if((timeNow - lastUpdatedTime) / 1000 < 1/SNAKE_SPEED) return;
    lastUpdatedTime = timeNow;
    if(isHeadOnBody()) {
        if(confirm('you lose. click ok to restart.')) {
            window.location = '/';
        }
        return;
    }
    eatFood(newCoordinates);
    update();
    draw();
}

game();

function resetGame() {
    resetSankeCoordinates();
    resetDirection();
    createFood();
}

function resetDirection() {
    newCoordinates = {x: 1, y: 0};
}

function update() {
    updateSnake(newCoordinates);
}

function draw() {
    drawSnake();
}