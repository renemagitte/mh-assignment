const express = require('express');
const app = new express();
const fs = require('fs');

app.use("/", express.static(__dirname + "/"));

app.get('/', function(request, response){
    response.sendFile('index.html');
});

app.get("/api/delivery-times", (req, res) => {
    fs.readFile('./delivery-times.json', { encoding: 'utf8' }, (err, data) => {
        if (err) {
            console.error("Error message: ", err);
            return;
        }
        res.send(data);
    });
})

app.listen(process.env.port || 3000);