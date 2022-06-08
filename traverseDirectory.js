const Fs = require("fs");
const Path = require("path");
const lodash = require('lodash');

// Define an array which will contain list of all the files under the nested directories
let allFiles = [];


/**
 * Writing function to retrieve the path and list of all the file names under the nested directories.
 * @input - root directory path
 * @output - returns the list of all the files along with their paths
 */
async function traverseDirectory(dir){
    Fs.readdirSync(dir).forEach(filePaths => {
        let fileDirPath =   Path.join(dir, filePaths);
        if(Fs.statSync(fileDirPath).isDirectory()){
            return traverseDirectory(fileDirPath);
        } else {
            return allFiles.push(fileDirPath);
        }     
    })
}

// Now iterate through all the files and retrieve the valid IP addresses
function readFiles(listOfFiles){
    var ipArray = [];
    for(let i = 0; i<listOfFiles.length; i++){
        let arr = [];
        let data = Fs.readFileSync(listOfFiles[i]);
        // Getting the file data now and getting it in a single line
        const inputData = data.toString().replace(/\n/g, " ");
        
        // Split the inputData into multiple texts on getting a space
        //var texts = inputData.trim().split(" ");
        var texts = lodash.map(lodash.split(inputData, " "), function(item) {
            return item.trim();
        })
        // Now write a regex pattern which tries to retrieve valid ip addresses 
        const regexPatternIP = /\b^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))$\b/gm;
        
        // Apply the regex pattern on the texts to get valid IP addresses
        let output = lodash.map(texts, function(text){
            return regexPatternIP.test(text) ? text: null;
        })
        
        //arr = inputData.match(regexPatternIP);
        arr = lodash.compact(output);
        ipArray.push(arr);
    }
    return ipArray;
}

function getUniqueArr(arr){
    let uniqueArr = [];
    for(let i of arr){
        if(uniqueArr.indexOf(i) === -1){
            uniqueArr.push(i);
        }
    }
    return uniqueArr;
}

async function main(){
    let dir = "./root/devops/";
    await traverseDirectory(dir);
    
    // Get the list of all valid IPs from the filePaths
    const ips = readFiles(allFiles);
    
    // Now flatten array as the current ips contains nested array
    const ipFlatArrays = ips.flat();
   
    //Program to remove duplicate value from array
    let uniqueArr = getUniqueArr(ipFlatArrays);
    
    //Program to sort the array in lexicographical order
    for(let j=0; j < uniqueArr.length; j++){
        for(let i = 0; i < uniqueArr.length; i++){
            //Current index octet
            let octetA = uniqueArr[i].split(".");

            let temp;
            if(i < uniqueArr.length - 1){
                // Next index Octet
                let octetB = uniqueArr[i+1].split(".");
                if(octetA[0].toString() > octetB[0].toString()){
                    temp = uniqueArr[i];
                    uniqueArr[i] = uniqueArr[i+1];
                    uniqueArr[i+1] = temp;
                } else if(octetA[0].toString() == octetB[0].toString()){
                    if(octetA[1].toString() > octetB[1].toString()){
                        temp = uniqueArr[i];
                        uniqueArr[i] = uniqueArr[i+1];
                        uniqueArr[i+1] = temp;
                    }else if(octetA[1].toString() == octetB[1].toString()){
                        if(octetA[2].toString() > octetB[2].toString()){
                            temp = uniqueArr[i];
                            uniqueArr[i] = uniqueArr[i+1];
                            uniqueArr[i+1] = temp;
                        } else if(octetA[2].toString() == octetB[2].toString()){
                            if(octetA[3].toString() > octetB[3].toString()){
                                temp = uniqueArr[i];
                                uniqueArr[i] = uniqueArr[i+1];
                                uniqueArr[i+1] = temp;
                            }
                        }
                    }
                }
            }
            
        }
    }
    
    for(let i = 0; i < uniqueArr.length; i++){
        console.log(uniqueArr[i]);
    }
    allFiles = [];
}

main();