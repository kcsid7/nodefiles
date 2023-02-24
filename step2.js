const fs = require("fs");
const process = require("process");
const axios = require("axios");

let cl_path = process.argv[2];

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



async function webCat(url) {
    try {
        const res = await axios.get(url);
        console.log(res.data);
    } catch (err) {
        console.log(`Could not get data. Error: ${err}`);
        process.exit(1);
    }
}



if (path.slice(0,4) !== "http"){
    cat(cl_path);
} else {
    webCat(cl_path);
}