import {BasePage} from "./BasePage";
import {ElementHandle, Locator, type Page} from "@playwright/test";
import {ElementHelper} from "../utils/ElementHelper";
import * as http from "http";

export class SearchComp extends BasePage{
    private searchParentSelector = 'div[role="search"] button';

    // search: Locator = this.page.getByRole('search', {name: 'start your search'})
    constructor(page: Page) {
        super(page);
    }
    public login() {

    }


    async isOnPage(locator? :Locator):Promise<boolean> {
        let search: Locator = this.page.getByRole('search', {name: 'start your search'})
        let isDefined = search.isEnabled();
        return isDefined;
        // this.page.getByRole('search', {name: 'start your search'})

    }

    async clickAnywhere() {
        let element = await (await new ElementHelper(this.page).getElementsByText(this.searchParentSelector, 'Anywhere'))
            .click();
    }
    async setWhere(destination: string) {
        let element = await this.page.getByPlaceholder("Search destinations").fill(destination);
        // await this.page.keyboard.press("Enter");
    }

    private async getCheckInElement() {
        return this.page.getByTestId("structured-search-input-field-split-dates-0")//.getByRole('button');
    }
    private async getCheckOutElement() {
        return this.page.getByTestId("structured-search-input-field-split-dates-1")
    }
    async setCheckIn(): Promise<this> {
        await (await this.getCheckInElement())
            .click();
        return this;
    }
    async setCheckOut() : Promise<this>{
        await ( await this.getCheckOutElement())
            .click();
        return this;
    }
    async selectDate(date) {
        let locator = this.page.locator(`td[role="button"][aria-label*="${date}"]`);
        await locator.waitFor({state: "visible"})
            .then(()=> locator.click())
    }

    async isCheckInExpanded() {
        try {
            await this.page.waitForSelector("[data-testid=\"structured-search-input-field-split-dates-0\"][aria-expanded=\"true\"]");
        } catch (error){
            console.log(error)
        }

    }
    async setGuests() {
        await this.page.getByTestId('structured-search-input-field-guests-button')
            .click()
        return this;
    }

    async increaseAdults(number) {
        for (let i = 0; i < number; i++) {
          let locator =  await this.page.locator('#stepper-adults [aria-label="increase value"]');
          await locator.waitFor({state: "visible"})
              .then( () => locator.click())
        }
        return this;
    }
    async decreaseAdults() {
        await this.page.locator('#stepper-adults [aria-label="decrease value"]')
            .click()
    }
    async increaseChildren(number) {
        for (let i = 0; i < number; i++) {
            let locator = await this.page.locator('#stepper-children [aria-label="increase value"]');
            await locator.waitFor({state: "visible"})
                .then( () => locator.click())
        }
    }

    async clickSearch() {
        let locator = await this.page.getByTestId('structured-search-input-search-button');
        await locator.waitFor({state: "visible"})
            .then( () => locator.click());
    }

    private async sleep(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    async getSearchSummaryHashMap() {
        // const elements = await this.page.$$(this.searchResultsSelector);
        const hashMap: Map<string, string> = new Map();
        let count: number = await this.page.locator(this.searchParentSelector).count(); // all parent div + span

        for (let i = 0; i < count; i++) {
            let element = await this.page.locator(this.searchParentSelector).nth(i);
            let key = await element.locator("span").first().innerText();

            element = await this.page.locator(this.searchParentSelector).nth(i);
            let valElement = await element.locator("div").first();

            let val = await new ElementHelper(this.page).waitToGetValue(valElement, 10)

            hashMap.set( key, val);
        }

        console.log("filled an hashmap: ", hashMap)
        return hashMap;
    }



}



    //     const elemet: Locator = locators.find() .filter().first();
    //     return elemet;
    //
    //
    //     this.page.locator('').click()
    //     const elements = await this.page.$$(selector);
    //     for (const element of elements) {
    //         const textContent: string = await element.textContent();
    //         if (textContent.includes(searchText)) {
    //             return element;
    //         }
    //     }
    //     return null;
    // }

