export async function retry<T>(block: () => Promise<T>, numOfRetry: number, interval: number): Promise<T> {
    let myErr: Error | null = null; // remember error staticly
    for (let i = 0;  i < numOfRetry; i++ ){
        try {
            const result = await block();
            if (result){
                return result; // if false, continue the loop
            }
        } catch (err) {
            myErr = err;
        }
        new Promise( resolve => setTimeout(resolve, interval));
    }

    throw new Error("exceeds num of retries, last error = "+ myErr);
}
export async function blockFalse() :Promise<boolean> {
    return false;
}
async function blockTrue() :Promise<boolean> {
    return true;
}
describe("test retry", ()=>{
    it("send false block, expect exceeds num of retries", async () => {

        // let res = retry(  async () => { return false }, 5, 1000);
        // or:
        let res = await retry(blockFalse, 5, 1000);
        expect(res).toEqual(false)
    })

    it("send true block, expect to return true", async () => {

        let res = await retry(blockTrue, 5, 1000);
        expect(res).toEqual(true)
    })

    it("send throw error block, expect to throw an error", async () => {
        let res = false;
        try {
            res = await retry(async () => {
                throw new Error("mock error")
            }, 5, 1000);
        } catch (err){
            console.log(err)
        }
        expect(res, "expect to throw an error").toEqual(false)
    })

})
