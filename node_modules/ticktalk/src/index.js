const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const mon = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const day = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const dy = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

/**
 * D Class
 * A custom utility for handling and formatting dates.
 */
class D {

    /**
     * Initializes a new D instance with the given date.
     * @param {...*} args - Arguments for the native Date constructor.
     */
    constructor(...args) {
        this._date = new Date(...args)
    }

    // GETTERS
    /** @returns {number} - Full year, e.g. 2023 */
    get year() {
        return this._date.getFullYear()
    }

    /** @returns {number} - Last two digits of the year, e.g. 23 for 2023 */
    get yr() {
        return this._date.getFullYear() % 100; // using MOD here to get the last two digits
    }

    /** @returns {string} - Full month name, e.g. 'January' */
    get month() {
        return month[this._date.getMonth()]
    }

    /** @returns {string} - Three-letter abbreviated month name, e.g. 'Jan' */
    get mon() {
        return mon[this._date.getMonth()]
    }

    /** @returns {string} - Full day name, e.g. 'Sunday' */
    get day() {
        return day[this._date.getDay()]
    }

    /** @returns {string} - Three-letter abbreviated day name, e.g. 'Sun' */
    get dy() {
        return dy[this._date.getDay()]
    }

    /** @returns {number} - Day of the month (1-31) */
    get date() {
        return this._date.getDate()
    }

    /** @returns {number} - Hour of the day (0-23) */
    get hours() {
        return this._date.getHours()
    }

    /** @returns {number} - Minute of the hour (0-59) */
    get mins() {
        return this._date.getMinutes()
    }

    /** @returns {number} - Seconds of the minute (0-59) */
    get secs() {
        return this._date.getSeconds()
    }

    /** @returns {string} - Day of the month with an ordinal suffix (e.g., '1st', '2nd') */
    get ordinal() {
        const date = this._date.getDate(); // get the date
        const lastDigit = date % 10; // get the last digit using MOD

        if (date >= 11 && date <= 13) { // if the date is between 11 and 13, return 'th' - special case for 11, 12, 13 as we don't want 11st, 12nd, 13rd
            return `${date}th`;
        } else {
            switch (lastDigit) {
                case 1:
                    return `${date}st`; // 1 becomes 1st
                case 2:
                    return `${date}nd`; // 2 becomes 2nd
                case 3:
                    return `${date}rd`; // 3 becomes 3rd
                default:
                    return `${date}th`; // everything else becomes th
            }
        }
    }

    // FORMAT
    /**
     * Returns the date formatted as per the given mask.
     * @param {string} [mask='Y M D'] - Pattern for the output format.
     * @returns {string} - Formatted date string.
    */
    format(mask = 'Y M D') { // mask string is something like 'y/m/d'
        const dateStr = mask.split('').map(char => { // split the mask string into an array of characters
            switch (char) { // switch on each character
                case 'Y':
                    return this.year
                case 'y':
                    return this.yr
                case 'M':
                    return this.month
                case 'm':
                    return this.mon
                case 'D':
                    return String(this.date).padStart(2, '0');
                case 'd':
                    return this.date
                case 'H':
                    return String(this.hours).padStart(2, '0');
                case 'h':
                    return this.hours
                case 'I':
                    return String(this.mins).padStart(2, '0');
                case 'i':
                    return this.mins
                case 'S':
                    return String(this.secs).padStart(2, '0');
                case 's':
                    return this.secs
                case 'W':
                    return this.day
                case 'w':
                    return this.dy
                case '#':
                    return this.ordinal
                default:
                    return char
            }
        }).join('') // join the array back to a string

        return dateStr;
    }

    // WHEN
    /** @private
     * Calculates the difference in days between the current and target dates.
     * @param {Date} targetDate - The target date.
     * @returns {number} - Difference in days.
    */
    _differenceInDays(targetDate) { // targetDate is a Date object
        const currentDate = new Date(); // get the current date
        const diffTime = targetDate - currentDate; // get the difference in milliseconds
        return Math.floor(diffTime / (1000 * 60 * 60 * 24)); // convert milliseconds to days
    }

    /** @private
     * Calculates the difference in seconds between the current and target dates.
     * @param {Date} targetDate - The target date.
     * @returns {number} - Difference in seconds.
    */
    _differenceInSeconds(targetDate) {
        const currentDate = new Date();
        const diffTime = targetDate - currentDate;
        return diffTime / 1000; // convert milliseconds to seconds
    }

    /**
     * Returns a string describing the time difference between the current and target dates.
     * @returns {string} - Time difference string.
     * @example
     * const d = new D(2021, 1, 1, 0, 0, 0); // 1st Jan 2021
     * d.when(); // '1 year 2 months 3 days 4 hours 5 minutes 6 seconds from now'
    */
    when() {
        const currentDate = new Date(); // get the current date
        const daysDiff = this._differenceInDays(this._date); // get the difference in days
        const totalSecondsDiff = this._differenceInSeconds(this._date); // get the difference in seconds
        const hoursDiff = Math.floor(totalSecondsDiff / 3600) % 24; // get the difference in hours
        const minutesDiff = Math.floor(totalSecondsDiff / 60) % 60; // get the difference in minutes
        const secondsDiff = Math.floor(totalSecondsDiff) % 60; // get the difference in seconds

        let output = []; // create an empty array to store the output

        let remainingDays = Math.abs(daysDiff); // get the absolute value of the days difference

        if (remainingDays > 365) { // if the remaining days is greater than 365
            const years = Math.floor(remainingDays / 365); // get the number of years
            output.push(`${years} years`); // push the number of years to the output array
            remainingDays -= years * 365;  // subtract the number of years from the remaining days
        }

        if (remainingDays > 30) {
            const months = Math.floor(remainingDays / 30);
            output.push(`${months} months`);
            remainingDays -= months * 30;
        }

        if (remainingDays > 0) { // if there are remaining days
            output.push(`${remainingDays} days`); // push the remaining days to the output array
        }

        if (hoursDiff !== 0) { // if there are hours difference
            output.push(`${Math.abs(hoursDiff)} hours`);
        }

        if (minutesDiff !== 0) {
            output.push(`${Math.abs(minutesDiff)} minutes`);
        }

        // if there are no output, it means the date is today
        if (output.length === 0) {
            if (secondsDiff !== 0) {
                return secondsDiff > 0 ? `${Math.abs(secondsDiff)} seconds from now` : `${Math.abs(secondsDiff)} seconds ago`;
            }
            return "today";
        }

        let suffix = this._date > currentDate ? "from now" : "ago"; // if the date is in the future, use "from now", otherwise use "ago"
        return output.join(" ") + " " + suffix; // join the output array to a string
    }
}


const now = new D()
const bday = new D('4/6/1987')
const epoch = new D(1970, 0, 1)

console.log(now._date.getDate())
console.log(bday._date.getFullYear())
console.log(epoch._date)

console.log(`Short year for now: ${now.yr}`)  // Expected: Current year's last two digits
console.log(`Short year for bday: ${bday.yr}`)  // Expected: 87
console.log(`Short year for epoch: ${epoch.yr}`)  // Expected: 70

console.log(now.day)
console.log(now.dy)
console.log(now.month)
console.log(now.mon)
console.log(bday.format('m/d/y'))
console.log(bday.format('M d, Y'))
console.log(bday.format('M #, Y'))

console.log("------ FORMAT METHOD ------")
const d = new D(2017, 0, 2, 3, 4, 5);
console.log(d.format());              // 2017 January 02
console.log(d.format('y/m/d'));       // 17/Jan/2
console.log(d.format('H:I:S'));       // 03:04:05
console.log(d.format('h:i:s'));       // 3:4:5
console.log(d.format('Y-M-D h:I:S')); // 2017-January-02 3:04:05
console.log(d.format('M d, Y'));      // January 2, 2017
console.log(d.format('M #, Y'));      // January 2nd, 2017
console.log(d.format('W, M d, Y'));      // Monday, January 2, 2017
console.log(d.format('w, M d, Y'));      // Mon, January 2, 2017
// Including characters that aren't recognized formatting characters
console.log(d.format('y-m-d at H:I:S'));  // Expected: 17-Jan-2 at 3:4:5

console.log("------ WHEN METHOD ------")
console.log((new D(2019, 0, 2, 3, 4, 5)).when());  // Approx. 4 years 7 months ago
console.log((new D(2019, 9, 2, 3, 4, 5)).when());  // Approx. 3 years 10 months ago
console.log((new D(2024, 9, 2, 3, 4, 5)).when());  // Approx. 1 year 2 months from now
console.log((new D(2019, 6, 30, 3, 4, 5)).when()); // Approx. 4 years ago (given the current month is August)
console.log((new D()).when());                      // today
console.log((new D(2023, 7, 16, 14, 45, 30)).when());  // Approx. 6 hours 34 minutes from now (considering 1:11pm MST or 8:11pm UTC current time)

module.exports = D;
