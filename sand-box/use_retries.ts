import {retry} from "./retries.test";

let res = await retry( async () => {return false;}, 5, 1000 );