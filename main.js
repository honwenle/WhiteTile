var cvs = document.getElementById('cvs');
var ctx = cvs.getContext('2d');
var WIDTH = cvs.clientWidth,
    HEIGHT = cvs.clientHeight;
cvs.width = WIDTH;
cvs.height = HEIGHT;
var SIZE_WIDTH = ~~(WIDTH / 4),
    SIZE_HEIGHT = ~~(HEIGHT / 5);
var luckList = [],
    doneList = [];
var cvs_translate = 0;
var timer;
var begin = false;
var over = false;
var SPEED = 5;
var score = 0;

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
        drawBlock(i, y, i == luck && (doneList[y] == -1 ? '#666' : '#000'));
    }
    if (doneList[y] && doneList[y] != -1) {
        drawBlock(doneList[y]-1, y, '#f00');
    }
}
function drawAll() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    drawColLine();
    for (var i = 0; i < 6; i++) {
        drawRow(i);
    }
    drawScore();
}
function createLuck() {
    luckList.push(~~(Math.random() * 4));
}
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
cvs.addEventListener('touchmove', function (e) {
    e.preventDefault()
}, false);
function touchOrClick (e) {
    e.preventDefault();
    if (over) {
        return false;
    }
    var x = e.touches[0].clientX,
    y = e.touches[0].clientY - cvs_translate;
    x = ~~(x/SIZE_WIDTH);
    y = 4 - Math.floor(y/SIZE_HEIGHT);
    if (y == 0 && !begin) {
        timer = requestAnimationFrame(ani);
        begin = true;
    }
    if ((y == 0 && !doneList[0]) || (y > 0 && !doneList[y] && doneList[y-1])) {
        if (x == luckList[y]) {
            doneList.push(-1);
            score++;
        } else {
            doneList.push(x+1);
            over = true;
        }
    }
}
function drawScore() {
    ctx.fillStyle = '#f00';
    ctx.font = 50 + 'px 微软雅黑';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillText(score, WIDTH/2, 10 - cvs_translate);
}
function ani(timestamp) {
    drawAll();
    if (over) {
        cancelAnimationFrame(timer);
        return false;
    }
    if (cvs_translate >= SIZE_HEIGHT-5) {
        ctx.restore();
        cvs_translate = 0;
        ctx.save();
        luckList.shift();
        var last = doneList.shift();
        if (last != -1) {
            cancelAnimationFrame(timer);
        } else {
            score % 50 || SPEED++;
            timer = requestAnimationFrame(ani);
        }
        createLuck();
    } else {
        cvs_translate += SPEED;
        ctx.translate(0, SPEED);
        timer = requestAnimationFrame(ani);
    }
}