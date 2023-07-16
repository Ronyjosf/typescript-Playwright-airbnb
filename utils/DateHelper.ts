// @ts-ignore
import moment from 'moment';
export class DateHelper {
    private static today = moment();

    static getToday() {
        return this.today.format('D, dddd, MMMM YYYY');
    }

    static getTodayPlus(moreDays: number) {
        return moment(this.today).add(moreDays, 'days').format('D, dddd, MMMM YYYY');
    }
}