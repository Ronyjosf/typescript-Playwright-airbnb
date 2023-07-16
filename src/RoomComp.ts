import {BasePage} from "./BasePage";

export class RoomComp extends BasePage{
    private roomIdSelector = '[data-plugin-in-point-id="TITLE_DEFAULT"]'
    protected roomRateSelector = this.roomIdSelector + " button";

    async getRoomIdRate() {
        return await this.page.locator(this.roomRateSelector).first()
            .getAttribute("aria-label");

    }
    async getCheckin() {
        return await this.page.getByTestId("change-dates-checkIn")
            .innerText();
    }
    async getCheckout() {
        return await this.page.getByTestId("change-dates-checkOut")
            .innerText();
    }

}