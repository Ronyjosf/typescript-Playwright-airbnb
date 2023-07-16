import {test, expect, type Page} from "@playwright/test";
import {SearchComp} from "../src/SearchComp";
import {DateHelper} from "../utils/DateHelper";
import {ListingsComp} from "../src/ListingsComp";
import {RoomComp} from "../src/RoomComp";
import { compareTwoStrings } from 'string-similarity';

const testData = {
    Location: "Tel Aviv",
    adults: 2,
    children: 1,
    checkIn: DateHelper.getToday(), checkOut: DateHelper.getTodayPlus(1)

}
test.describe("Search Component", () => {
    test.describe.configure({mode: "serial"}) // set it so if one test fails, it stops all subsequent
    const Base_URL: string = "https://www.airbnb.com/";
    let listingResultsByURL = "https://www.airbnb.com/s/Tel-Aviv/homes?tab_id=home_tab&refinement_paths%5B%5D=%2Fhomes&flexible_trip_lengths%5B%5D=one_week&monthly_start_date=2023-08-01&monthly_length=3&price_filter_input_type=0&price_filter_num_nights=5&channel=EXPLORE&date_picker_type=calendar&checkin=2023-07-16&checkout=2023-07-17&adults=2&children=1&source=structured_search_input_header&search_type=filter_change";
    let listingComp: ListingsComp = null;
    let roomUrl = "";

    let page: Page;
    let searchComp: SearchComp;
    test.beforeAll(async ({browser}) => { // when test in describe fails,
                                                                    // playwright  will kill the worker and run again afterALL and beforeAll
        page = await browser.newPage();
        // await page.setViewportSize({width:1920, height:1200})
        searchComp = new SearchComp(page);
        await searchComp.navigate(Base_URL);
    });
    // test.beforeEach(async () => {
    // });

    test("navigate URL site, expect URL is fetched ok", async () => {
        expect(page.url()).toEqual(Base_URL);

        //     .isOnPage();
    });
    test("set destination, expect isOnPage is true....", async () => {
        //     .isOnPage();
        await searchComp.clickAnywhere();
        await searchComp.setWhere(testData.Location);
        // expect (searchComp.isCheckInExpanded()).toBeTruthy();
    });
    test("set check in date, expect isOnPage is true....", async () => {
        // await searchComp.setCheckIn();
        // await searchComp.selectDate("24, Monday, July 2023")
        await (await searchComp.setCheckIn())
            .selectDate(testData.checkIn);
    });
    test("set check out date, expect isOnPage is true....", async () => {
        // await (await searchComp.setCheckOut())
        //     .selectDate(DateHelper.getTodayPlus(1));
        await searchComp.selectDate(testData.checkOut);
    });
    test("set guests, expect isOnPage is true....", async () => {
        // await (await searchComp.setCheckOut())
        //     .selectDate(DateHelper.getTodayPlus(1));
        await (await (await (await searchComp.setGuests())
            .increaseAdults(testData.adults))
            .increaseChildren(testData.children));
    });
    test("click search, expect all results show", async () => {
        await searchComp.clickSearch();
        let searchResultsMap: Map<string, string> = await searchComp.getSearchSummaryHashMap();
        expect(searchResultsMap.get("Location").replace(/-/g, "").includes(testData.Location), "must include").toBe(true);
        expect (searchResultsMap.get("Check in / Check out").includes(testData.checkIn.split(",")[0] ), "must include check in date").toBe(true)
        expect (searchResultsMap.get("Check in / Check out").includes(testData.checkOut.split(",")[0] ), "must include check out date").toBe(true)
        expect(searchResultsMap.get("Guests").includes(testData.children+testData.adults+" guests"), "must include total guests").toBe(true);

        listingResultsByURL = page.url();

    });
// ##############################################################################

    test(`goto ${listingResultsByURL} select a listing with the highest rate, expect ...`, async ({browser}) => {
        listingComp = new ListingsComp(page);
        await listingComp.navigate(listingResultsByURL);
        let highestCardHref = await
            (await listingComp.getCardsListElementHandle())
            .getHighestCardRate()
            .getHighestCardRateHref();

        roomUrl = "https://www.airbnb.com"+highestCardHref;
        expect(roomUrl, "url = " + roomUrl).toBeTruthy();

        // const newPage = await context.newPage();

        // let pageTwo = await browser.newPage();
        // await pageTwo.goto(roomUrl);
        // await pageTwo.waitForLoadState();
        // console.log(await pageTwo.title());

        console.log("pass");

    });

    test(`open room window with ${roomUrl}, expect title is correct`, async ({browser}) => {
        console.log("navigating to new url: ", roomUrl)
        let pageTwo = await browser.newPage();
        await pageTwo.goto(roomUrl);
        await pageTwo.waitForLoadState();
        console.log(await pageTwo.title());

        let roomComp = new RoomComp(pageTwo);
        let rate = await roomComp.getRoomIdRate();
        let expectedListingRate = listingComp.getHighestCardRateString()
        const similarity: number = compareTwoStrings(expectedListingRate, rate);
        const threshold: number = 0.5
        expect(similarity >= threshold, "not similar due to high threshold").toBe(true);
    })

    test(`adjust adults, expect adults in updated in rooms`, async ({browser}) => {
        // console.log("navigating to new url: ", roomUrl)
        // page
        // searchComp.increaseAdults()
        // searchComp.getSearchSummaryHashMap()
    })

    test(`reserve`, async ({browser}) => {
        // console.log("navigating to new url: ", roomUrl)
        // page
        // listingComp.getHighestCardRate()

    })

    test.afterAll(async () => {
        await page.close();
    });
});