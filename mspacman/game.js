function init() {
        var ctx = document.getElementById('game_canvas').getContext('2d');
        var img = new Image();
        img.src = "pacman10-hp-sprite.png";
        ctx.drawImage(img, 325, 0, 465, 137, 0, 0, 465, 137);
        ctx.drawImage(img, 80, 20, 17, 20, 30, 30, 17, 20);
}