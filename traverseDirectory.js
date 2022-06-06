
// // Importing required libraries
// const lineReader = require('line-reader');

// // eachLine() method call on gfg.txt
// // It got a callback function
// // Printing content of file line by line
// // on the console
// lineReader.eachLine('./root/devops/file1.txt', (line, last) => {
//     //check if it contains IP addresses

//     console.log(line);
// });


const FS = require("fs");
const Path = require("path");

let files = [];

function traverseDirectory(dir) {
    FS.readdirSync(dir).forEach(file => {
        const fileDir = Path.join(dir, file);
        if (FS.statSync(fileDir).isDirectory()) {
            return traverseDirectory(fileDir);
        } else {
            return files.push(fileDir);
        }
    })
}

async function main() {
    await traverseDirectory("./root/devops/");
    var ipArray = [];

    await files.forEach(element => {
        FS.readFile(element, null, (err, data) => {
            if (err) {
                console.log("Error reading the file");
            } else {
                const fileData = data.toString();
                // g: matches the pattern multiple times & m: enables multiline mode. In this mode, ^ and $ match the start and end of the whole string.
                const ipRegex = /\b((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))\b/gm;
                //const ipRegex = /(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)/;
                //const ipRegex = "([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])";

                var arr = fileData.match(ipRegex);
                
                console.log(arr);
                ipArray.push(arr);
            }
        });
    });

    ipArray.forEach(ips => {
        console.log("Helloooo, ", ips);
    })
}

main();
//console.log(files);

// function escapeRegExp(string) {
//     return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
// }

// let res = escapeRegExp("I * am the dumbnest of all the creatures \ in . | this \/ world *");
// console.log(res);

// console.log(/[^A-Za-z0-9]/.test('*'));


