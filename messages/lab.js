function parse() {
        var request = new XMLHttpRequest();
        request.open("GET", "data.json", true);
        request.onreadystatechange = function() {
                if (request.readyState == 4) {
                        json = request.responseText;
                        parsed = JSON.parse(json);
                        for (x in parsed) {
                                html = document.getElementByID("messages")
                                html.innerHTML += "<h2>" + parsed[x].content + "</h2><p>" + parsed[x].username + "</p>";
                                //console.log(parsed[x].content + " " + parsed[x].username);
                        }
                }
        }
        request.send();
}