const fs = require("fs");
const process = require("process");

function cat(path) {
    fs.readFile(path, "utf-8", function(err, data) {
        if (err) {
            console.log(`Error: ${err}`);
            process.kill(1);
        }
        
        console.log(data);
        return data;
    })
}

cat(process.argv[2]);