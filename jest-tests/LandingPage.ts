// import {chromium, Page} from "playwright";
// import {LandingPage} from "../src/LandingPage";
//
//
// describe("LandingPage", () => {
//     const URL: string = "https://www.airbnb.com/";
//
//     let browser;
//     let page: Page;
//     let landingPage: LandingPage;
//     beforeAll(async () => {
//         browser = await chromium.launch({ headless: false });
//     });
//     beforeEach(async () => {
//         page = await browser.newPage();
//         landingPage = new LandingPage(page);
//     });
//
//     it("click login, expect isOnPage is true....", () => {
//         landingPage.navigate(URL)
//         // @ts-ignore
//         expect(landingPage.isOnPage(), "expect an element to show").toBe(true)
//         //     .isOnPage();
//
//     });
//     // afterEach(async () => {
//     //     await page.close();
//     // });
//     afterAll(async () => {
//         await browser.close();
//     });
// });