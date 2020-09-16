const canvas = document.getElementById("graph");
const ctx    = canvas.getContext('2d');
let height = window.innerHeight - 100;
let width  = window.innerWidth - 300;
let gridSize = 20;
const algebra = document.getElementById('algebra');
const algebraBtn = document.getElementById('algbBtn');
const span = document.getElementById('equation');
canvas.height = height;
canvas.width  = width;
window.addEventListener('resize',()=>{
    canvas.height = window.innerHeight - 100;
    canvas.width  = window.innerWidth - 300;
    init();
});
let vlines = 0;
let hlines = 0;
let algb = true;
function drawGrid()
{
    let yPlot = gridSize;
    let xPlot = gridSize;
    ctx.clearRect(0, 0, width, height);
    while(yPlot<=canvas.height)
    {
        ctx.beginPath();
        ctx.moveTo(0, yPlot);
        ctx.lineTo(canvas.width,yPlot);
        ctx.strokeStyle = 'gray';
        ctx.stroke();
        ctx.closePath();
        yPlot+=gridSize;
        vlines++;
    }
    while(xPlot<=canvas.width)
    {
        ctx.beginPath();
        ctx.moveTo(xPlot,0);
        ctx.lineTo(xPlot,canvas.height);
        ctx.strokeStyle = 'gray';
        ctx.stroke();
        ctx.closePath();
        xPlot+=gridSize;
        hlines++;
    }
}
function blocks(n)
{
    return n * gridSize;
}
function drawAxes()
{
    // Y- Axis
    ctx.beginPath();
    ctx.moveTo((Math.floor(hlines/2)*gridSize),0);
    ctx.lineTo((Math.floor(hlines/2)*gridSize),(canvas.height));
    ctx.strokeStyle = 'black';
    ctx.stroke();
    ctx.closePath();
    // X - Axis
    ctx.beginPath();
    ctx.moveTo(0,Math.floor(vlines/2)*gridSize);
    ctx.lineTo(canvas.width,Math.floor(vlines/2)*gridSize);
    ctx.strokeStyle = 'black';
    ctx.stroke();
    ctx.closePath();
}
function xCoord()
{
    ctx.moveTo(0,0);
    ctx.beginPath();
    for(var i=-vlines;i<=vlines;i++)
    {
        ctx.font = '10px Arial';
        ctx.arc(i*gridSize,0,2,0,2*Math.PI,false);
        ctx.fillStyle = 'black';
        ctx.fillText(i.toString(),i*gridSize,gridSize);
        ctx.fill();
    }
    ctx.closePath();
}
function yCoord()
{
    ctx.moveTo(0,0);
    ctx.beginPath();
    for(var i=-hlines;i<=hlines;i++)
    {
        if(i!==0)
        {
            ctx.font = '10px Arial';
            ctx.arc(0,i*gridSize,2,0,2*Math.PI,false);
            ctx.fillStyle = 'black';
            ctx.fillText(i.toString(),-gridSize + 3,i*gridSize);
            ctx.fill();
        }
    }
    ctx.closePath();
}
function init()
{
    hlines = 0;
    vlines = 0;
    drawGrid();
    drawAxes();
    if(algb)
    {
        drawAlgebraGraph();
    }
    xCoord();
    yCoord();
    ctx.restore();
}
function drawAlgebraGraph()
{
    ctx.save();
    ctx.translate((Math.floor(hlines/2)*gridSize),Math.floor(vlines/2)*gridSize);
    ctx.beginPath();
    ctx.closePath();
}
init();