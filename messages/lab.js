function parse() {
        var request = new XMLHttpRequest();
        request.open("GET", "data.json", true);
        request.onreadystatechange = function() {
                if (request.readyState == 4) {
                        json = request.responseText;
                        parsed = JSON.parse(json);
                        html = document.getElementById("messages");
                        for (x in parsed) {
                                html.innerHTML += "<p><span class='content'>" + parsed[x].content + " </span><span class='user'>" + parsed[x].username + "</span></p>";
                        }
                }
        }
        request.send();
}