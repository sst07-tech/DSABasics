function matchingMean(a){

    const arrayLen = a.length;
    let count = 0;
    let res = 0;

    if(arrayLen == 1){
        res = calculateArithmeticMean(0, 0);
        if(res === a[0]) {
            count++;
        }
    } else {
        for(let i = 0; i < arrayLen; i++){
            if(i === 0){
                res = calculateArithmeticMean(0, a[i+1]);
            }
            else if(i === (arrayLen -1)){
                res = calculateArithmeticMean(a[i-1], 0);
            } else {
                res = calculateArithmeticMean(a[i-1], a[i+1] );
            }
            if(res === a[i]) {
                count++;
            }
            res = 0;
        }
    }

    
    return count;
}

function calculateArithmeticMean(num1, num2){
    return (num1 + num2) / 2;
}

var arr = [-1,1,3];
let count = matchingMean(arr);

console.log("Count : ", count);
