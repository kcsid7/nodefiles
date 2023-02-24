const fs = require("fs");
const process = require("process");
const axios = require("axios");


let output, cl_path;


if (process.argv[2] === "--out") {
    output = process.argv[3];
    cl_path = process.argv[4];
} else {
    cl_path = process.argv[2];
}


function writeToFile(data, path) {
    if (path) {
        fs.writeFile(path, data, "utf-8", function(err) {
            if (err) {
                console.log(`Could not write to file: ${err}`)
                process.exit(1);
            }
            console.log(path);
            console.log("File Created!")
        })
    } else {
        console.log(data);
    }

}



function cat(path, out) {
    fs.readFile(path, "utf-8", function(err, data) {
        if (err) {
            console.log(`Error: ${err}`);
            process.kill(1);
        }
        writeToFile(data, out);
    })
}



async function webCat(url, out) {
    try {
        const res = await axios.get(url);
        writeToFile(res.data, out);
    } catch (err) {
        console.log(`Could not get data. Error: ${err}`);
        process.exit(1);
    }
}


if (cl_path.slice(0,4) !== "http"){
    cat(cl_path, output);
} else {
    webCat(cl_path, output);
}


// function writeFile(path, data) {
//     fs.writeFile(path, data, "utf-8", function(err) {
//         if (err) {
//             console.log(`Could not write to file: ${err}`)
//             process.exit(1);
//         }
//         console.log(path);
//         console.log("File Created!")
//     })
// }

// writeFile('hello.txt', "Hello World!!!!")