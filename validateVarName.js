//const Str = require('@supercharge/strings');

function validateVarName(words, varName){
    
    let res = true;
    if(words.length == 0){
        return false;
    }

    //Split the var Name in multiple words on first capital letter
    var splitArr = varName.trim().split(/(?=[A-Z])/);
    console.log(splitArr);


    if(splitArr.length > words.length || splitArr.length == 0){
        return false;
    }

    console.log("Test");

    const wordsLowercase = words.map(name => name.toLowerCase());

    //Now check if the SplitArr values are part of the words array
    splitArr.forEach(element => {
        
        let lowerCaseStr = element.trim().toLowerCase();
        if(!(wordsLowercase.includes(lowerCaseStr))){
            res = false;
        } 
    });

    // if(!varName.includes('_')){
    //     return /[A-Z]/.test(varName)
    // }
    
    return res;
}

var words = ["is", "number", "test", "valid", "spot"];
var varName = "  ";

let res = validateVarName(words, varName);

console.log("Result, ", res);