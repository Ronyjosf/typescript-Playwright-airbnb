import { type Page } from '@playwright/test';
export class BasePage {
    protected page: Page;
    constructor(page: Page) {
        this.page = page;
    }
    async navigate(url: string):Promise<BasePage> {
        await this.page.goto(url);
        console.log("navigated to ", url);
        await this.page.waitForLoadState('load');
        return this;
    }
}