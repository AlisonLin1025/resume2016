var main=document.querySelector("#main");
var oLis=document.querySelectorAll(".slide>li");
var winW=document.documentElement.clientWidth;
var winH=document.documentElement.clientHeight;
var desW=640;
var desH=960;
main.style.webkitTransform="scale("+winH/desH+")";
[].forEach.call(oLis,function(){
    arguments[0].index=arguments[1];
    arguments[0].addEventListener("touchstart",start,false);
    arguments[0].addEventListener("touchmove",move,false);
    arguments[0].addEventListener("touchend",end,false);
});
function start(e){
    this.start=e.changedTouches[0].pageY;
}
function move(e){
    e.preventDefault();
    var cur=this.index;
    var step=1/2;
    this.flag=true;
    var touchMove=e.changedTouches[0].pageY;
    var changePos=touchMove-this.start;
    [].forEach.call(oLis,function(){
        if(arguments[1]!=cur){
            arguments[0].style.display="none";
        }
        arguments[0].className="";
        arguments[0].firstElementChild.id="";
    })
    if(changePos<0){
        this.prevsIndex=cur==oLis.length-1?0:cur+1;
        var pos=winH+changePos;
    }else if(changePos>0){
        this.prevsIndex=cur==0?oLis.length-1:cur-1;
        var pos=-winH+changePos;
    }
    oLis[this.prevsIndex].style.webkitTransform="translate(0,"+pos+"px)";
    oLis[cur].style.webkitTransform="scale("+(1-Math.abs(changePos)/winH*step)+") translate(0,"+changePos+"px)";
    oLis[this.prevsIndex].style.display="block";
    oLis[this.prevsIndex].className="zIndex";
}
function end(e){
    if(this.flag){
        oLis[this.prevsIndex].style.webkitTransform="translate(0,0)";
        oLis[this.prevsIndex].style.webkitTransition=".5s";
        oLis[this.prevsIndex].addEventListener("webkitTransitionEnd",function(){
            this.style.webkitTransition="";
            this.firstElementChild.id="a"+(this.index+1);
        },false)
    }
}






