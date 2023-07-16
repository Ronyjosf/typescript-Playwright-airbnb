import {Locator, Page} from "@playwright/test";

export class InnerTextHelper {
    private static async sleep(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    static async waitToGetValue(element: Locator, numOfRetry: number) {
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
    static async waitForNonEmptyList(page: Page, locator: string, numOfRetry: number) {
        let retry = 1;
        while (retry < numOfRetry) {
            let elements = await page.$$(locator)
            if (elements.length > 0)
                return elements;

            await this.sleep(500)
            retry++;
        }

    }
}