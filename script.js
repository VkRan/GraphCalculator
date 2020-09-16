const canvas = document.getElementById("graph");
const ctx    = canvas.getContext('2d');
let height = window.innerHeight - 100;
let width  = window.innerWidth - 300;
let gridSize = 20;
const algebra = document.getElementById('algebra');
const algebraBtn = document.getElementById('algbBtn');
const trigo     = document.getElementById("trigo");
const trigoBtn = document.getElementById('trigoBtn');
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
let algb = true,trigonometry=false;
var value = '';
var pts = [];
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
    if(trigonometry)
    {
        drawTrigoGraph();
    }
    xCoord();
    yCoord();
    ctx.restore();
}
algebraBtn.addEventListener("click",()=>{
    algb = true;
    trigonometry = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.closePath();
    init();
})
trigoBtn.addEventListener("click",()=>{
    algb = false;
    trigonometry = true;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.closePath();
    init();
})
algebra.addEventListener('input',(e)=>{
    value = '';
    value = e.target.value;
});
trigo.addEventListener("input",(e)=>{
    value = '';
    value = e.target.value;
});
function drawTrigoGraph()
{
    var i=0;
    const parser = math.parser();
    if(value.length>0)
    {
      parser.evaluate(`f(x) = ${value}`);
      for(var x =-40;x<40;x+=Math.PI/180)
      {
          let ypt = parser.evaluate(`f(${x})`);
          pts[i] = {x:x,y:ypt};
          i++;
      }
    }
    span.innerText = value;
    ctx.save();
    ctx.translate((Math.floor(hlines/2)*gridSize),Math.floor(vlines/2)*gridSize);
    ctx.beginPath();
    for(var i=0;i<pts.length;i++)
    {
        ctx.lineTo(pts[i].x*gridSize,-pts[i].y*gridSize);
        ctx.strokeStyle = 'red';
        ctx.lineJoin = 'round';
        ctx.stroke();
    }
    ctx.closePath();
}
function drawAlgebraGraph()
{
    var i=0;
    pts = [];
    if(value.length>0)
    {
        for(var x=-100;x<100;x+=0.3)
    {
        let ypt = eval(value);
        pts[i] = {x:x,y:ypt};
        i++;
    }
    }
    span.innerText = value;
    ctx.save();
    ctx.translate((Math.floor(hlines/2)*gridSize),Math.floor(vlines/2)*gridSize);
    ctx.beginPath();
    for(var i=0;i<pts.length;i++)
    {
        ctx.lineTo(pts[i].x*gridSize,-pts[i].y*gridSize);
        ctx.lineWidth = '2';
        ctx.strokeStyle = 'red';
        ctx.lineJoin = 'round';
        ctx.stroke();
    }
    ctx.closePath();
}
init();