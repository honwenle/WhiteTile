var cvs = document.getElementById('cvs');
var ctx = cvs.getContext('2d');
var WIDTH = cvs.clientWidth,
    HEIGHT = cvs.clientHeight;
cvs.width = WIDTH;
cvs.height = HEIGHT;
var SIZE_WIDTH = ~~(WIDTH / 4),
    SIZE_HEIGHT = HEIGHT / 5;

function drawBlock () {}
function drawRow (y) {
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 1;
    ctx.moveTo(0, SIZE_HEIGHT * y);
    ctx.lineTo(WIDTH, SIZE_HEIGHT * y);
    ctx.stroke();
    var luck = ~~(Math.random() * 4);
    ctx.fillStyle = '#000';
    ctx.fillRect(luck * SIZE_WIDTH + luck, y * SIZE_HEIGHT + 1, SIZE_WIDTH, SIZE_HEIGHT);
}
function drawColLine () {
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 1;
    for (var i = 0; i < 3; i++) {
        ctx.moveTo(SIZE_WIDTH * (i+1) + i, 0);
        ctx.lineTo(SIZE_WIDTH * (i+1) + i, HEIGHT);
        ctx.stroke();
    }
}
drawColLine();
for (var i = 0; i < 5; i++) {
    drawRow(i);
}
cvs.addEventListener('touchstart', touchOrClick, false);
function touchOrClick (e) {
    var x = e.touches[0].clientX,
        y = e.touches[0].clientY;
    console.log(x,y)
}