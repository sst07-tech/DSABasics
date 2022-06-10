function solution(a) {
    
    // Get the array a length
    const arrayLen = a.length;
    
    // Initialize count as 0 initially
    let count = 0;
    
    // Also initialize arithmetic mean result as 0 initially
    let res = 0;
    
    try {
        // If it is an array of length 1
        if(arrayLen == 1){
            // Since there is only single element the left to it and right to it will be considered as 0
            res = calculateArithmeticMean(0, 0);
            
            // Only applies for the case where element at index 0 has value 0
            if(res === a[0]){
                count++;
            }
        } else {
            // If array is of length greater than 1
            for(let i=0; i < arrayLen; i++){
                if(i === 0){
                    // Left to the index 0 will be considered as 0
                    res = calculateArithmeticMean(0, a[i+1]);
                } else if (i === (arrayLen - 1)){
                    // Right to the last index will be considered as 0
                    res = calculateArithmeticMean(a[i-1], 0)
                } else {
                    res = calculateArithmeticMean(a[i-1], a[i+1] );
                }
                // Check if the res matches the value at index i, if yes then increment the count
                if(res === a[i]){
                    count++;
                }
                res = 0;
            }
        }
        return count;
    } catch(error){
        console.log(`Error occurred while calculating count of numbers in the array that are equal to the arithmetic mean, ${error}`);
        
    }
    
    
}

/**
 * Function to calculate mean of 2 numbers
 * @input - the 2 numbers i.e. number 1 and number 2
 * @output - returns the mean of 2 numbers
 */
function calculateArithmeticMean(num1, num2){
    return (num1 + num2)/2;
}