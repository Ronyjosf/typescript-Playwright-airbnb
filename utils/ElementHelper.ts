import { type Page, Locator } from '@playwright/test';

export class ElementHelper {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }
    async getElementsByText(selector: string, searchText: string): Promise<Locator> {
        const locators: Array<Locator> = await this.page.locator(selector).all();
        const element = locators.find(async (locator: Locator) => {
            const textContent: string = await locator.textContent();
            return textContent.includes(searchText);
        });
        return element || null;
    }

    private async sleep(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async waitToGetValue(element: Locator, numOfRetry: number) {
        let retry = 1;
        let val = ""
        while (retry < numOfRetry) {
            val = await element.innerText();
            if (val.trim() !== "")
                return val;
            await this.sleep(500)
            retry++;
        }
    }
    async waitForNonEmptyList(locator: string, numOfRetry: number) {
        let retry = 1;
        while (retry < numOfRetry) {
            let elements = await this.page.$$(locator)
            if (elements.length > 0)
                return elements;

            await this.sleep(500)
            retry++;
        }

    }

}
