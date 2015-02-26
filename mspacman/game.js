function init() {
        var ctx = document.getElementById('game_canvas').getContext('2d');
        var img = new Image();
        img.src = "pacman10-hp-sprite.png";

        // Refer to my note under "Notes and Hints" on Lab 5
        // More: https://stackoverflow.com/questions/10121797/javascript-image-onload-event-binding
        // Another way, same idea: https://stackoverflow.com/questions/280049/javascript-callback-for-knowing-when-an-image-is-loaded
        img.addEventListener("load", function() {
        	ctx.drawImage(img, 325, 0, 465, 137, 0, 0, 465, 137);
    	    ctx.drawImage(img, 80, 20, 17, 20, 30, 30, 17, 20);
		}, false);
}