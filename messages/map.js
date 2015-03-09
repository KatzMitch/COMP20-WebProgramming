var jsonLocations;

function init() {
        getLocation();
        
}

function getLocation() {
        if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function() = {
                        lat = position.coords.latitude;
                        lng = position.coords.longitude;
                        sendLocation("SheriMcKelvey", lat, lng);
                });
        } else {
                alert("Oops! Your browser doesn't support GeoLocation");
        }
}

function sendLocation(login, lat, lng) {
        request = new XMLHttpRequest();
        request.open("POST", "https://secret-about-box.herokuapp.com/sendLocation", true);
        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        request.onreadystatechange = parseJSON;
        query = "login=" + login + "&lat=" + lat + "&lng=" + lng;
        request.send(query);
}