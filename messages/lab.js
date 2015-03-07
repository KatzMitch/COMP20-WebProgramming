function parse() {
        var request = new XMLHttpRequest();
        request.open("GET", "data.json", true);
        request.onreadystatechange = function() {
                json = request.responseText;
                parsed = JSON.parse(json);
                for (x in parsed) {
                        console.log(x["content"] + "\n" + x["username"]);
                }
        }
        request.send();
}