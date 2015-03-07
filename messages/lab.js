function parse() {
        var request = new XMLHttpRequest();
        request.open("GET", "data.json", true);
        request.onreadystatechange = function() {
                if (request.readyState == 4) {
                        json = request.responseText;
                        parsed = JSON.parse(json);
                        html = document.getElementById("messages");
                        for (x in parsed) {
                                html.innerHTML += "<h2>" + parsed[x].content + "</h2><p>" + parsed[x].username + "</p>";
                                //console.log(parsed[x].content + " " + parsed[x].username);
                        }
                }
        }
        request.send();
}