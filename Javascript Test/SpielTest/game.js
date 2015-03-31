/**
 * Created by ML on 20.03.15.
 */
var version = "0.0.1";
var isPlaying = false;
init();

function init()
{
    background_canvas = document.getElementById("background_canvas");
    background_ctx = background_canvas.getContext("2d");
    main_canvas = document.getElementById("main_canvas");
    main_ctx = main_canvas.getContext("2d");

    document.addEventListener("keydown", key_down, false);
    document.addEventListener("keyup", key_up, false);

    requestaframe = (function() {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (callback) {
                window.setTimeout(callback, 1000 / 60)
            };
    })();

    player = new Player();
    suprise = new Suprise();
    load_media();
}

function load_media()
{
    bg_sprite = new Image();
    bg_sprite.src = "images/bg_sprite.png";
    box_sprite = new Image();
    box_sprite.src = "../../SuperStudent/images/Stift.png";
    main_sprite = new Image();
    main_sprite.src = "images/pilz.png";
}

function key_down(e)
{
    //  var key_id = e.keyCode || e.which;
    var key_id = e.keyCode ? e.keyCode : e.which;

    if(key_id == 40)//down key
    {
        player.is_downkey = true;
        e.preventDefault();
    }

    if(key_id == 38)//up key
    {
        player.is_upkey = true;
        e.preventDefault();
    }

    if(key_id == 37)//left key
    {
        player.is_leftkey = true;
        e.preventDefault();
    }
    if(key_id == 39)//right key
    {
        player.is_rightkey = true;
        e.preventDefault();
    }

}

function key_up(e)
{
    //  var key_id = e.keyCode || e.which;
    var key_id = e.keyCode ? e.keyCode : e.which;

    if(key_id == 40)//down key
    {
        player.is_downkey = false;
        e.preventDefault();
    }

    if(key_id ==38)//up key
    {
        player.is_upkey = false;
        e.preventDefault();
    }

    if(key_id == 37)//left key
    {
        player.is_leftkey = false;
        e.preventDefault();
    }
    if(key_id == 39)//right key
    {
        player.is_rightkey = false;
        e.preventDefault();
    }

}

function mouse(e)
{
    var x = e.pageX - document.getElementById("game_object").offsetLeft;
    var y = e.pageY - document.getElementById("game_object").offsetTop;
    document.getElementById("x").innerHTML = x;
    document.getElementById("y").innerHTML = y;
}

function clear_main_canvas()
{

}

function startLoop()
{
    isPlaying = true;
    loop();
    background_ctx.drawImage(bg_sprite, 0, 0);
}

function stopLoop()
{
    isPlaying = false;
}

var r_y = 0;
var r_x = 0;
var bgDrawX = 0;
var supriseX = 200;

function Suprise() {
    this.speed = 10;
}


Suprise.prototype.draw = function()
{
    this.drawX = supriseX
    this.ai();
    main_ctx.drawImage(box_sprite, this.drawX, 300, 50, 8);

};

Suprise.prototype.ai = function () {

};


function Player()
{
    this.drawX = 50;
    this.drawY = 400;
    this.speed = 10;
    this.is_downkey = false;
    this.is_upkey = false;
    this.is_leftkey = false;
    this.is_rightkey = false;
}
Player.prototype.draw = function()
{
    this.check_keys();
    main_ctx.drawImage(main_sprite, 50, this.drawY, 50, 50);

    background_ctx.drawImage(bg_sprite, bgDrawX, 0);
    // main_ctx.fillStyle = "red";
    // main_ctx.fillRect(this.drawX,this.drawY,50,50);
};

Player.prototype.check_keys = function () {
    if (this.is_downkey == true){

        if((p1+50) < b1 || (p1+10) > (b1+box_sprite.width)) {
            if(this.drawY<400)
                this.drawY = this.drawY + 4;
        }
        else {
            if (this.drawY > (300)) {
                this.drawY = this.drawY - 4;
            }
        }


    }

    if (this.is_upkey == true){
       // var p1 = this.drawX - document.getElementById("game_object").offsetLeft;
        //var b1 = supriseX - document.getElementById("game_object").offsetTop;
        var p1 = 50;
        var b1 = supriseX + document.getElementById("game_object").offsetLeft;
        document.getElementById("p1").innerHTML = p1;
        document.getElementById("p2").innerHTML = b1;
        if((p1+50) < b1 || (p1+10) > (b1+box_sprite.width)) {
            this.drawY = this.drawY - 4;
        }
        else {
            if (this.drawY > (300+box_sprite.height)) {
                this.drawY = this.drawY - 4;
            }
        }

    }

    if (this.is_leftkey == true) {
        this.drawX = this.drawX+2;
        bgDrawX = bgDrawX+2;
        supriseX = supriseX+2;
    }

    if (this.is_rightkey == true){
        this.drawX = this.drawX-2;
        bgDrawX = bgDrawX-2;
        supriseX = supriseX-2;

    }


    if(this.is_upkey == false) {
        if (this.drawY<400) {
            this.drawY = this.drawY+4;
        }

    }

}

function loop()
{
    main_ctx.clearRect(0,0,800,500);
    player.draw();
    suprise.draw();

    if(isPlaying)
        requestaframe(loop);
}
