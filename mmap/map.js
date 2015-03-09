var myLat;
var myLng;

function init() {
        console.log("init");
        getLocation();
        drawMap();
}

function getLocation() {
        console.log("get location");
        if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function() {
                        myLat = position.coords.latitude;
                        myLng = position.coords.longitude;
                        sendLocation("SheriMcKelvey", lat, lng);
                });
        } else {
                alert("Oops! Your browser doesn't support GeoLocation");
        }
}

function sendLocation(login, lat, lng) {
        console.log("send location");
        request = new XMLHttpRequest();
        request.open("POST", "https://secret-about-box.herokuapp.com/sendLocation", true);
        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        request.onreadystatechange = parseJSON;
        query = "login=" + login + "&lat=" + myLat + "&lng=" + myLng;
        request.send(query);
}

function parseJSON() {
        console.log("parse json");
        if (request.readystate == 4) {
                jsonLocation = JSON.parse(request.responsetext);
        }
}

function drawMap() {
        console.log("draw");
        me = new google.maps.LatLng(myLat, myLng);
        mapOptions = {
                zoom: 12,
                center: me
        };
        map = new google.maps.Map(document.getElementById("map"), mapOptions);
        map.panTo(me);

        for (x in jsonLocation) {
                marker = new google.maps.Marker({
                        position: new google.maps.LatLng(jsonLocation[x].lat, jsonLocation[x].lng),
                        title: jsonLocation[x].login
                });
                marker.setMap(map);
        }
}








