var myLat, myLng, jsonLocation;

function init() {
        myLat = 0;
        myLng = 0;
        me = new google.maps.LatLng(myLat, myLng);
        mapOptions = {
                zoom: 15,
                center: me
        };
        map = new google.maps.Map(document.getElementById("map"), mapOptions);
        getLocation();
}

function getLocation() {
        console.log("get location");
        if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(pos) {
                        console.log("Get lat/lng");
                        myLat = pos.coords.latitude;
                        myLng = pos.coords.longitude;
                        sendLocation("SheriMcKelvey", myLat, myLng);
                });
        } else {
                alert("Oops! Your browser doesn't support GeoLocation");
        }
        console.log("make me");
}

function sendLocation(login, lat, lng) {
        console.log("send location");
        request = new XMLHttpRequest();
        request.open("POST", "https://secret-about-box.herokuapp.com/sendLocation", true);
        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        request.onreadystatechange = function() {
                if (request.readyState == 4) {
                        jsonLocation = JSON.parse(request.responseText);
                        drawMap();
                }
        }
        query = "login=" + login + "&lat=" + myLat + "&lng=" + myLng;
        request.send(query);
}

function drawMap() {
        console.log("draw");
        me = new google.maps.LatLng(myLat, myLng);
        console.log(myLat + " " + myLng);
        map.panTo(me);
        console.log(jsonLocation);
        for (x in jsonLocation) {
                console.log("looping");
                marker = new google.maps.Marker({
                        position: new google.maps.LatLng(jsonLocation[x].lat, jsonLocation[x].lng),
                        title: jsonLocation[x].login + " is " + haversine(myLat, 
                               jsonLocation[x].lat, myLng, jsonLocation[x].lng) + " miles away."
                });
                if (marker.position == me) {
                        marker.getIcon(google.maps.Symbol.fillColor = "green");
                }
                marker.setMap(map);
                google.maps.event.addListener(marker, "click", function () {
                        infowindow = new google.maps.InfoWindow({
                                content: marker.getTitle()
                        })
                        infowindow.setContent(marker.title);
                        infowindow.open(map, marker);
                });
        }
        console.log("out of loop");
}

Number.prototype.toRad = function() {
        return this * Math.PI / 180.0;
}

function haversine(lat1, lat2, lng1, lng2) {
        R = 6371;
        deltaLat = lat2 - lat1;
        deltaLat = deltaLat.toRad();
        deltaLng = lng2 - lng1;
        deltaLng = deltaLng.toRad();
        a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
                Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) *
                Math.sin(deltaLng / 2) * Math.cos(deltaLng / 2);
        return (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)) * R * 0.6214);
}