import moment from "moment";
export const TIME_PERIODS = {
    UNTIL_DONE: 'until done',
    DAY: 'day',
    WEEK: 'week',
    MONTH: 'month',
    QUARTER: 'quarter',
    YEAR: 'year'
};

/** contains some utility function for date */
class JustDate {
    constructor(date) {
        date = date ?? new Date();
        this._date = new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate()
        );
        this._day = this._date.getDate();
        this._month = this._date.getMonth() + 1;
        this._year = this._date.getFullYear();
    }
    date() {
        return this._date;
    }

    day() {
        return this._day;
    }
    dayName() {
        return this._date.toLocaleDateString(undefined, { weekday: 'long' });
    }
    week() {
        return moment(this.date()).isoWeek();
    }
    month() {
        return this._month;
    }
    monthName() {
        return this._date.toLocaleString('default', { month: 'long' });
    }
    year() {
        return this._year;
    }
    toString() {
        const zeroPad = (num, places) => String(num).padStart(places, "0");
        return `${this.year()}-${zeroPad(this.month(), 2)}-${zeroPad(this.day(), 2)}`;
    }
    valueOf() {
        return this.day() + this.month() * 100 + this.year() * 10000;
    }
    clone() {
        const date = new Date(this._year, this._month - 1, this._day);
        return new JustDate(date);
    }
    next() {
        return this.addDay(1);
    }
    previous() {
        return this.addDay(-1);
    }
    addDay(dayCount) {
        const date = new Date(this._year, this._month - 1, this._day);
        date.setDate(date.getDate() + dayCount);
        return new JustDate(date);
    }
    diff(otherDate) {
        return moment(this.date()).diff(otherDate.date(), "day");
    }
    endOfWeek() {
        return this.endOf("week");
    }
    endOfMonth() {
        return this.endOf("month");
    }
    isToday() {
        const today = new Date()
        return this._day === today.getDate() &&
            this._month === today.getMonth() + 1 &&
            this._year === today.getFullYear()
    }
    startOfMonth() {
        return this.startOf("month");
    }
    endOfQuarter() {
        return this.endOf("quarter");
    }
    endOfYear() {
        return this.endOf("year");
    }
    endOf(period) {
        let endOf = moment(this.date()).endOf(period).toDate();
        //console.log(endOf);
        return new JustDate(endOf);
    }
    startOf(period) {
        let endOf = moment(this.date()).startOf(period).toDate();
        //console.log(endOf);
        return new JustDate(endOf);
    }
    static getStartOf(date, period) {
        return (new JustDate(date)).startOf(period);
    }
    static Now() {
        return new JustDate();
    }
}

export default JustDate