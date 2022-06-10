function solution(words, variableName) {
    try{
        // Initializing the result with true
        let result = true;
    
        // Applying the regex pattern to split the variable name in multiple words on basis of regex pattern
        var varNameSplit = variableName.trim().split(/(?=[A-Z])/);

        // Now check if the varNameSplit is part of the words array or not
        varNameSplit.forEach(varName => {
            //Convert variable name post split to lowercase as to match it with words array
            let lowerCaseStr =  varName.trim().toLowerCase();
        
            // Now check if the variable Name is part of the words array
            if(!(words.includes(lowerCaseStr))){
                result = false;
            }
        })
    
        return result;
    } catch(error){
        console.log(`Exception occurred while validating the variable name ${error}`);
    }
}
