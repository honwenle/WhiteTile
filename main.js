var cvs = document.getElementById('cvs');
var ctx = cvs.getContext('2d');
var WIDTH = cvs.clientWidth,
    HEIGHT = cvs.clientHeight;
cvs.width = WIDTH;
cvs.height = HEIGHT;
var SIZE_WIDTH = ~~(WIDTH / 4),
    SIZE_HEIGHT = HEIGHT / 5;
var luckList = [];
var cvs_translate = 0;
var timer;
var SPEED = 10;

function init () {
    for (var i = 0; i < 6; i++) {
        createLuck();
    }
    ctx.save();
    drawAll();
}
init();

function drawBlock (x, y, c) {
    ctx.fillStyle = c || '#fff';
    ctx.fillRect(x * SIZE_WIDTH + x, (4 - y) * SIZE_HEIGHT + 1, SIZE_WIDTH, SIZE_HEIGHT - 1);
}
function drawRow (y) {
    ctx.beginPath();
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 1;
    ctx.moveTo(0, SIZE_HEIGHT * y);
    ctx.lineTo(WIDTH, SIZE_HEIGHT * y);
    ctx.closePath();
    ctx.stroke();
    var luck = luckList[y];
    for (var i = 0; i < 4; i++) {
        drawBlock(i, y, i == luck && '#000');
    }
}
function drawAll() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    drawColLine();
    for (var i = 0; i < 6; i++) {
        drawRow(i);
    }
}
function createLuck() {
    luckList.push(~~(Math.random() * 4));
}
// 画竖线
function drawColLine () {
    ctx.beginPath();
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 1;
    for (var i = 0; i < 3; i++) {
        ctx.moveTo(SIZE_WIDTH * (i+1) + i, 0);
        ctx.lineTo(SIZE_WIDTH * (i+1) + i, HEIGHT);
    }
    ctx.closePath();
    ctx.stroke();
}
cvs.addEventListener('touchstart', touchOrClick, false);
function touchOrClick (e) {
    var x = e.touches[0].clientX,
        y = e.touches[0].clientY;
    x = ~~(x/SIZE_WIDTH);
    y = 4 - ~~(y/SIZE_HEIGHT);
    if (y == 0) {
        if (x == luckList[y]) {
            drawBlock(x, y, '#666');
            timer = requestAnimationFrame(ani);
        } else {
            drawBlock(x, y, '#f00');
        }
    }
}
function ani(timestamp) {
    drawAll();
    cvs_translate += SPEED;
    if (cvs_translate >= SIZE_HEIGHT) {
        cancelAnimationFrame(timer);
        ctx.restore();
        cvs_translate = 0;
        ctx.save();
        luckList.shift();
        createLuck();
    } else {
        ctx.translate(0, SPEED);
        timer = requestAnimationFrame(ani);
    }
}