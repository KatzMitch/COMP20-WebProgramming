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
        me = new google.maps.LatLng(myLat, myLng);
        infowindow = new google.maps.InfoWindow;
        map.panTo(me);
        for (x in jsonLocation) {
                marker = new google.maps.Marker({
                        position: new google.maps.LatLng(jsonLocation[x].lat, jsonLocation[x].lng),
                        title: jsonLocation[x].login + " is " + haversine(myLat, jsonLocation[x].lat, myLng, jsonLocation[x].lng).toFixed(4) + " miles away from you."
                });
                marker.setMap(map);
                google.maps.event.addListener(marker, "click", function () {
                        infowindow.setContent(this.title);
                        //infowindow.setPosition(this.position);
                        infowindow.open(map, this);
                });
        }
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