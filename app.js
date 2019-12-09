const canvas    = document.getElementById("jsCanvas"); //canvas 내부에 있는 픽셀을 다룬다
const ctx       = canvas.getContext("2d"); // 픽셀 컨트롤 지정
const colors    = document.getElementsByClassName("jsColor");
const range     = document.getElementById("jsRange");
const mode      = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2C2C2C";
const CANVAS_SIZE   = 700;

canvas.width    = CANVAS_SIZE; // 크기 지정 필요
canvas.height   = CANVAS_SIZE;

ctx.strokeStyle =   INITIAL_COLOR;
ctx.lineWidth   =   2.5;
ctx.fillStyle   =   INITIAL_COLOR

let painting = false;
let filling = false;

function stopPainting(){
    painting=false;
}

function startPainting(){
    painting=true;
}

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x,y);
    }else{
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}

function onMouseDown(event){
    painting = true;
}

function handleColorClick(event){
    console.log(event.target.style);
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle=color;
}

function handleRangeChange(event){
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleModeClick(){ 
    if(filling === true){
        filling = false;
        mode.innerText = "Fill";
    }else{
        filling = true;
        mode.innerText = "Paint";
        //ctx.fillStyle = ctx.strokeStyle;
    }
}

function handleCanvasClick(){    
    if(filling){
        ctx.fillRect(0,0, CANVAS_SIZE , CANVAS_SIZE);
    }
}

function handleCM(event){
    console.log(event);
    event.preventDefault();
}

function handleSaveClick(){
    //const image = canvas.toDataURL("image/jpeg");
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS[Export]";
    link.click();
}

if(canvas){
    canvas.addEventListener("mousemove",  onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu",handleCM);
}

Array.from(colors).forEach(color => 
    color.addEventListener("click", handleColorClick)
);

if(range){
    range.addEventListener("input", handleRangeChange);
}

if(mode){
    mode.addEventListener("click", handleModeClick);
}

if(saveBtn){
    saveBtn.addEventListener("click", handleSaveClick);
}