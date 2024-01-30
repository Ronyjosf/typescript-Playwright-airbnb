describe("arrays area", () => {
    const numArr = [1, 2, 3, 4, 5, 7, 9];

    it("filter out array for a sub array", ()=> {
        const ignoreArr = [2, 4];

        // filter by predefined array
        let newArr = numArr.filter( num => !ignoreArr.includes(num))

        // filter( remains ) all odd elements
        newArr = numArr.filter( num => !(num % 2 == 0))

        // filter = remains all even numbers
        newArr = numArr.filter( num => num %2 ==0) // only even numbers remain

        console.log(numArr);
        let str = newArr.join(', ');
        console.log(str)
    })

    it("push only even numbers to a new array - using for loop", ()=> {
        const newArr = [];

        for (const number of numArr) {
            if (number % 2 == 0 ){
                newArr.push(number);
            }
        }

        let str = newArr.join(', ');
        console.log(str)
    })
    it("push only even numbers to a new array - using forEach", ()=> {
        const newArr = [];

        numArr.forEach( num => {
            if (num % 2 == 0){ newArr.push(num); }
        })
        let str = newArr.join(', ');
        console.log(str)
    })
    it("reverse an array with for - loop", () =>{
        let reverseArr = [];
        for (let i = numArr.length-1; i >= 0; i--){
            reverseArr.push(numArr[i]);
        }
        console.log(reverseArr);
        let str = reverseArr.join(', ');
        console.log(str)
    })
    it("reverse an array with forEach ", () =>{
        let reverseArr = [];
        numArr.forEach( e => reverseArr.push(e))
        for (let i = numArr.length-1; i >= 0; i--){
            reverseArr.push(numArr[i]);
        }
        console.log(reverseArr);
        let str = reverseArr.join(', ');
        console.log(str)
    })

})