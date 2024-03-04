function findSmallestNotInArray1(A: number[]): number {
    let sortedArray = A.sort((a, b) => a - b);
    let smallest = 1;
    sortedArray.forEach(num => {
        if (num == smallest) {
            smallest++;
        }
    })
    return smallest;
}
function findSmallestNotInArray2(A: number[]): number {
    // sort array in tradional way
    for (let i = 0; i<A.length-1; i++){
        for (let j = i+1; j < A.length; j++){
            let temp = 0;
            if ( A[i] > A[j]){
                temp = A[i];
                A[i] = A[j];
                A[j] = temp;
            }
        }
    }


    let sortedArray = A;
    let smallest = 1;
    sortedArray.forEach( num => {
        if (num == smallest){ smallest++;}
    })
    return smallest;
}
function findSmallestNotInArray3(A: number[]): number {
    let smallest = 1;
    // either set a Set with array A, or loop over the array and add elements in
    let mySet = new Set<number>(A);
    // for (const num of A){
    //     mySet.add(num);
    // }

    while (mySet.has(smallest)){
        smallest++;
    }
    return smallest;
}

let my_array =  [1, 3, 6, 4, 1, 2]
console.log( findSmallestNotInArray3 (my_array) );
