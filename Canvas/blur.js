/**
 * Created by Administrator on 2016/2/5.
 */
var canvasWidth= window.innerWidth;     //画布宽
var canvasHeight= window.innerHeight;    //画布高

var canvas= document.getElementById("canvas");   //画布
var context= canvas.getContext("2d");            //声明2d对象

canvas.width= canvasWidth;            //设置画布的宽
canvas.height= canvasHeight;          //设置画布的高

var image= new Image();
var radius=50;
image.src = "1.jpg";
var clippingRegion= {           //剪辑区域    剪辑一个圆
    x:400,            //开始x坐标
    y:200,            //开始y坐标
    r:radius              //半径
};
var leftMargin= 0, topMagin= 0;
image.onload=function(e){         //图片加载完成的时候先执行一次绘制
    $("#blur-div").css("width",canvasWidth+"px");
    $("#blur-div").css("height",canvasHeight+"px");
    $("#image").css("width",image.width+"px");
    $("#image").css("height",image.height+"px");

    leftMargin= (image.width- canvas.width)/2;
    topMagin= (image.height- canvas.height)/2;
    $("#image").css("left","-"+leftMargin+"px");
    $("#image").css("top","-"+topMagin+"px");
    initCanvas();
};
function initCanvas(){
    clippingRegion ={
        x:Math.random()*(canvas.width-2*radius)+radius,
        y:Math.random()*(canvas.height-2*radius)+radius,
        r:radius
    };

    draw( image ,clippingRegion );                   //绘制函数
}

function setClippingRegion( clippingRegion ){
    context.beginPath();   //开始路径
    context.arc( clippingRegion.x, clippingRegion.y, clippingRegion.r, 0, Math.PI*2, true);
    context.clip();     //剪切
}

function draw( image ){
    context.clearRect(0,0, canvas.width, canvas.height);      //清空画布
    context.save();       //存储当前状态
    setClippingRegion( clippingRegion );
    context.drawImage( image,leftMargin,topMagin,canvas.width,canvas.height,0,0,canvas.width,canvas.height);       //绘制图像
    context.restore();    //初始化
}

/*显示清晰图像*/
function show(){
   var time= setInterval(function(){
        /*改变剪辑区域圆的半径*/

       if(clippingRegion.r>= 1.5*Math.max(canvas.width,canvas.height)){
           clearInterval(time);
       }else{
           clippingRegion.r+=20;
       }
       console.log(clippingRegion.r);
        draw(image, clippingRegion);
    },30);
}

/*随机显示圆*/
function reset(){
    /*重新初始化一次*/
    initCanvas();
}
