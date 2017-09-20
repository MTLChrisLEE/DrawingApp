$(function () {


    var canvas = document.getElementById("paint");
    var context = canvas.getContext("2d");


    var paint = false;
    var paint_erase = "paint";

    var container=$("#container");
    var mouse = {x:0, y:0};

    if(localStorage.getItem("YourImage")!=null)
    {
        var img = new Image();
        img.onload = function(){
            context.drawImage(img,0,0);
        }
        img.src=localStorage.getItem("YourImage");
    }
    else
    {

    }



    context.lineWidth=3;
    context.lineJoin="round";
    context.lineCap="round";

    container.mousedown(function(e){
            paint=true;
            context.beginPath();
            mouse.x = e.pageX - this.offsetLeft;
            mouse.y = e.pageY - this.offsetTop;
            context.moveTo(mouse.x,mouse.y);
    })

    container.mousemove(function(e){
        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
        if(paint==true)
        {
            if(paint_erase=="paint")
            {
                context.strokeStyle=$("#paintColor").val();
            }
            else
            {
                context.strokeStyle="white";
            }
            context.lineTo(mouse.x,mouse.y);
            context.stroke();
        }
    })

    container.mouseup(function()
    {
        paint=false;
    })

    container.mouseleave(function()
    {
        paint=false;
    })


    $("#reset").click(function()
    {
        context.clearRect(0,0,canvas.width,canvas.height);
        paint_erase = "paint";
        $("#erase").removeClass("eraseMode")
    })

    $("#save").click(function()
    {
        if(typeof(location)!=null)
        {
            localStorage.setItem("YourImage",canvas.toDataURL());
        }
        else
        {
            alert("Your browser does not support local stroage")
        }
    })


    $("#erase").click(function()
    {
        if(paint_erase=="paint")
        {
            paint_erase="erase";
        }
        else
        {
            paint_erase="paint";
        }

        $(this).toggleClass("eraseMode")
    })


    $("#paintColor").change(function(){
        $("#brush").css("background-color", $("#paintColor").val());
    })


    $("#slider").slider({
        min: 5,
        max: 25,
        slide: function (event, ui) {
            $("#brush").height(ui.value);
            $("#brush").width(ui.value);
            context.lineWidth = ui.value;
        }
    })



})
