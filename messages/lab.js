function parse() {
        var request = new XMLHttpRequest();
        request.open("GET", "data.json", true);
        request.onreadystatechange = function() {
                json = request.responseText;
                parsed = JSON.parse(json);
                for (x in parsed) {
                        console.log(parsed[x].content + " " + parsed[x].username);
                }
        }
        request.send();
}