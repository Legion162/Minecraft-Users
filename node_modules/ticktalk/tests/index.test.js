const D = require('../src/index.js'); // Import the D class

describe('D class', () => {

    // Basic instantiation
    test('should instantiate with current date', () => {
        const now = new D();
        expect(now._date).toBeInstanceOf(Date);
    });

    // Getters
    describe('getters', () => {

        const instance = new D(2023, 3, 15, 12, 30, 45); // April 15, 2023, 12:30:45

        test('year', () => {
            expect(instance.year).toBe(2023);
        });

        test('yr', () => {
            expect(instance.yr).toBe(23);
        });

        test('month', () => {
            expect(instance.month).toBe('April');
        });

        test('mon', () => {
            expect(instance.mon).toBe('Apr');
        });

        test('day', () => {
            expect(instance.day).toBe('Saturday');
        });

        test('dy', () => {
            expect(instance.dy).toBe('Sat');
        });

        test('date', () => {
            expect(instance.date).toBe(15);
        });

        test('hours', () => {
            expect(instance.hours).toBe(12);
        });

        test('mins', () => {
            expect(instance.mins).toBe(30);
        });

        test('secs', () => {
            expect(instance.secs).toBe(45);
        });

        test('ordinal', () => {
            expect(instance.ordinal).toBe('15th');
        });

    });

    // format() method
    describe('format', () => {

        const instance = new D(2017, 0, 2, 3, 4, 5);

        test('Default format', () => {
            expect(instance.format()).toBe('2017 January 02');
        });

        test('Custom formats', () => {
            expect(instance.format('y/m/d')).toBe('17/Jan/2');
            expect(instance.format('H:I:S')).toBe('03:04:05');
            expect(instance.format('h:i:s')).toBe('3:4:5');
            expect(instance.format('Y-M-D h:I:S')).toBe('2017-January-02 3:04:05');
            expect(instance.format('M d, Y')).toBe('January 2, 2017');
            expect(instance.format('M #, Y')).toBe('January 2nd, 2017');
            expect(instance.format('W, M d, Y')).toBe('Monday, January 2, 2017');
            expect(instance.format('w, M d, Y')).toBe('Mon, January 2, 2017');
            expect(instance.format('y-m-d at h:i:s')).toBe('17-Jan-2 at 3:4:5');
        });

    });

    // when() method
    describe('when', () => {

        // Using Date.now() + time to simulate future or past dates for consistency
        const hoursInMilliseconds = (h) => h * 60 * 60 * 1000;
        const daysInMilliseconds = (d) => d * 24 * 60 * 60 * 1000;
        const monthsInMilliseconds = (m) => m * 30 * 24 * 60 * 60 * 1000;

        test('Past date', () => {
            const pastDate = new D(Date.now() - daysInMilliseconds(30));
            expect(pastDate.when()).toContain('ago');
        });

        test('Future date', () => {
            const futureDate = new D(Date.now() + daysInMilliseconds(30));
            expect(futureDate.when()).toContain('from now');
        });

        test('Today', () => {
            const today = new D();
            expect(today.when()).toBe('today');
        });
    });
});
