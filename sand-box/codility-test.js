// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

function solution(S) {
    // Implement your solution here


    let sortedDigits = S.split('').sort((a, b) => parseInt(b) - parseInt(a));
    console.log(sortedDigits);
    let number = [...sortedDigits, ...sortedDigits.slice(0, sortedDigits.length-1)]
    console.log(number);
    let temp = number.reverse().join('');
    return temp;

}
solution("1234")