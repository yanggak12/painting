const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");

const INIITIAL_COLOR = "#000000";
const CANVAS_WIDTH = document.getElementsByClassName("canvas")[0].offsetWidth;
const CANVAS_HEIGHT = document.getElementsByClassName("canvas")[0].offsetHeight;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

ctx.strokeStyle = INIITIAL_COLOR;
ctx.fillStyle = INIITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}
function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}
function onMouseDown(event) {
  painting = true;
}

function handleColor(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleRangeChange(event) {
  const strokeSize = event.target.value;
  ctx.lineWidth = strokeSize;
}
function handleModeClick() {
  if (filling) {
    filling = false;
    mode.innerText = "채우기";
  } else {
    filling = true;
    mode.innerText = "그리기";
  }
}
function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
}

Array.from(colors).forEach((color) =>
  color.addEventListener("click", handleColor)
);

if (range) {
  range.addEventListener("input", handleRangeChange);
}

if (mode) {
  mode.addEventListener("click", handleModeClick);
}
