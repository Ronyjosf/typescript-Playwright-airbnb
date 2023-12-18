async function retry<T>(block: () => Promise<T>, numOfRetry: number, interval: number): Promise<T> {
    for (let i = 0;  i < numOfRetry; i++ ){
        try {
            const result = await block();
            if (result){
                return result; // if false, continue the loop
            }
        } catch (err) {
        }
        new Promise( resolve => setTimeout(resolve, interval));
    }

    throw new Error("exceeds num of retries, went ");
}
async function blockFalse() :Promise<boolean> {
    return false;
}
async function blockTrue() :Promise<boolean> {
    return true;
}
describe("test retry", ()=>{
    it("send false block, expect to throw an error", async () => {

        // let res = retry(  async () => { return false }, 5, 1000);
        // or:
        let res = await retry(blockFalse, 5, 1000);
        expect(res).toEqual(false)
    })

    it("send true block, expect to throw an error", async () => {

        let res = await retry(blockTrue, 5, 1000);
        expect(res).toEqual(true)
    })
})