var myLat;
var myLng;
var jsonLocation;
var request;

function init() {
        console.log("init");
        getLocation();
        console.log(jsonLocation);
}

function getLocation() {
        console.log("get location");
        if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(pos) {
                        myLat = pos.coords.latitude;
                        myLng = pos.coords.longitude;
                        sendLocation("SheriMcKelvey", myLat, myLng);
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
        mapOptions = {
                zoom: 12,
                center: new google.maps.LatLng(myLat, myLng)
        }
        map = new google.maps.Map(document.getElementById("map"), mapOptions);
        map.panTo(mapOptions.center);
        console.log("loop in");
        for (x in jsonLocation) {
                console.log("looping");
                marker = new google.maps.Marker({
                        position: new google.maps.LatLng(jsonLocation[x].lat, jsonLocation[x].lng),
                        title: jsonLocation[x].login
                });
                marker.setMap(map);
        }
        console.log("out of loop");
}