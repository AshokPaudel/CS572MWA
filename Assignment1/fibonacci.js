const fibonacci = function(number){
    if(number<0){
        // console.log("negaive number encountered " + Math.abs(number));
        return fibonacci(Math.abs(number));
    }
    if(number<=2){
        return 1;
    }else{
        return fibonacci(number-1)+fibonacci(number-2);
    }

}
console.log("fibonacci of 30 : "+fibonacci(30));
console.log("fibonacci of -15 : "+fibonacci(-15));
module.exports = fibonacci;