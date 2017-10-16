// 定义画布宽高和生成点的个数
const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;
const POINT = 20;

let canvas;
let context;
let circleArr = [];

// 线条：开始xy坐标，结束xy坐标，线条透明度
function Line(x, y, _x, _y, o) {
  this.beginX = x;
  this.beginY = y;
  this.closeX = _x;
  this.closeY = _y;
  this.o = o;
}
// 点：圆心xy坐标，半径，每帧移动xy的距离
function Circle(x, y, r, moveX, moveY) {
  this.x = x;
  this.y = y;
  this.r = r;
  this.moveX = moveX;
  this.moveY = moveY;
}
// 生成max和min之间的随机数
function num(max, _min) {
  const min = _min || 0;
  return Math.floor(Math.random() * (max - min + 1) + min);
}
// 绘制原点
function drawCricle(cxt, x, y, r, moveX, moveY) {
  const circle = new Circle(x, y, r, moveX, moveY);
  cxt.beginPath();
  cxt.arc(circle.x, circle.y, circle.r, 0, 2 * Math.PI);
  cxt.closePath();
  cxt.fill();
  return circle;
}
// 绘制线条
function drawLine(cxt, x, y, _x, _y, o) {
  const line = new Line(x, y, _x, _y, o);
  cxt.beginPath();
  cxt.strokeStyle = `rgba(109,182,76,${o})`;
  cxt.moveTo(line.beginX, line.beginY);
  cxt.lineTo(line.closeX, line.closeY);
  cxt.closePath();
  cxt.stroke();
}


// 每帧绘制
function draw() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < POINT; i += 1) {
    drawCricle(context, circleArr[i].x, circleArr[i].y, circleArr[i].r * (i / 2));
  }
  for (let i = 0; i < POINT; i += 1) {
    for (let j = 0; j < POINT; j += 1) {
      if (i + j < POINT) {
        const A = Math.abs(circleArr[i + j].x - circleArr[i].x);
        const B = Math.abs(circleArr[i + j].y - circleArr[i].y);
        const lineLength = Math.sqrt(A * A + B * B);
        const C = 1 / lineLength * 7 - 0.009;
        const lineOpacity = C > 0.03 ? 0.03 : C;
        if (lineOpacity > 0) {
          // drawLine(context, circleArr[i].x, circleArr[i].y, circleArr[i + j].x, circleArr[i + j].y, lineOpacity);
        }
      }
    }
  }
}

// 初始化生成原点
function init() {
  circleArr = [];
  for (let i = 0; i < POINT; i += 1) {
    circleArr.push(drawCricle(context, num(WIDTH), num(HEIGHT), num(15, 2), num(10, -10) / 40, num(10, -10) / 40));
  }
  draw();
}

function loadCanvas(canva) {
  canvas = canva;
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  context = canvas.getContext('2d');
  context.strokeStyle = 'rgba(255,255,255,0.3)';
  context.strokeWidth = 1;
  context.fillStyle = 'rgba(255,255,255,0.3)';

  init();
  setInterval(() => {
    for (let i = 0; i < POINT; i += 1) {
      const cir = circleArr[i];
      cir.x += cir.moveX;
      cir.y += cir.moveY;
      if (cir.x > WIDTH) cir.x = 0;
      else if (cir.x < 0) cir.x = WIDTH;
      if (cir.y > HEIGHT) cir.y = 0;
      else if (cir.y < 0) cir.y = HEIGHT;
    }
    draw();
  }, 16);
}

export default loadCanvas;
