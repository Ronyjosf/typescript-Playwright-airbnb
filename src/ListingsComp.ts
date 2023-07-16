import {Locator, Page} from "@playwright/test";
import {BasePage} from "./BasePage";
import {ElementHelper} from "../utils/ElementHelper";

export class ListingsComp extends BasePage{
    cardsRateList: Array<string> = [];
    private CardContainerSelector = '[data-testid="card-container"] > div  > div > span'; //'[data-testid="card-container"]' div.dir.dir-ltr
    private HighestCardSelector: string = "";
    private HighestCardHrefSelector: Locator;
    private highestCardString: string;
    constructor(page: Page) {
        super(page);
    }
    async getCardsListElementHandle() {

        // let cardsElements = await this.page.$$(this.CardContainerSelector);
        let cardsElements =  await new ElementHelper(this.page)
            .waitForNonEmptyList(this.CardContainerSelector, 10)

        for (const element of cardsElements) {
            let attributeVal = await element.getAttribute("aria-label");
            this.cardsRateList.push(attributeVal);

        }
        console.log(this.cardsRateList);
        // cardsElements.forEach(async element => cardsRateList.push(await element.getAttribute("aria-label")));
        // cardsElements.map( async element => this.cardsRateList.push(await element.getAttribute("aria-label")))
        // this.rateSort(cardsRateList);
        return this;

    }

    getHighestCardRate() {
        let sortedCardsRateList: Array<string> = this.rateSort(this.cardsRateList);
        this.highestCardString = sortedCardsRateList[0];
        this.HighestCardSelector = this.CardContainerSelector + `[aria-label="${this.highestCardString}"]`
        return this;
    }

    getHighestCardRateString() {
        return this.highestCardString;
    }

    async getHighestCardRateHref():Promise<string> {
        let tmpSelector = `[data-testid="card-container"] [aria-label="${this.highestCardString}"]`;
        let xpathSelector = `//*[contains(@data-testid, 'card-container')][descendant::span[@aria-label='${this.highestCardString}']]/a`;
        let xpathLocator = await this.page.locator(xpathSelector);
        let href = await xpathLocator.getAttribute("href");
        return href;

    }

    async getCardsListPlaywrightLocator() {
        let cardsRateList: Array<string> = [];

        // using locators instead of ElementHandle
        let locatorsSize = await this.page.locator(this.CardContainerSelector).count();
        for (let i = 0; i < locatorsSize; i++) {
            let cardLocator = await this.page.locator(this.CardContainerSelector).nth(i);
            let attributeVal = await cardLocator.getAttribute("aria-label");
            cardsRateList.push(attributeVal);
        }
        return cardsRateList;

    }

    private rateSort(cardsRateList: Array<string>) {
        let formattedCardsRateList: Array<string> = [];
        formattedCardsRateList = cardsRateList.filter(element => !element.includes("New") );
        formattedCardsRateList.sort((a, b) => {
            // check for empty a, b
            const rateA = parseFloat (a.split(" ")[0]);
            const rateB = parseFloat ( b.split(" ")[0]);

            if (Number.isNaN(rateA) || Number.isNaN(rateB)) {
                return 0;
            }

            return rateB - rateA;

        });
        return formattedCardsRateList;

    }
}