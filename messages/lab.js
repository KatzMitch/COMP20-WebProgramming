function parse() {
        var request = new XMLHttpRequest();
        request.open("GET", "data.json", true);
        request.onreadystatechange = function() {
                json = request.responseText;
                parsed = JSON.parse(json);
                console.log(parsed);
        }
        request.send();
}