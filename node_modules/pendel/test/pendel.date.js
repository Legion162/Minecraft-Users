'use strict';
import test from 'ava';
import duration from '../';

test('should error when two timestrings are not supplied', t => {
	t.throws(() => {
		duration.date('one', new Date());
	}, 'pendel.date() expects two valid date strings');

	t.throws(() => {
		duration.date(new Date(), 'two');
	}, 'pendel.date() expects two valid date strings');
});

test('should get the time difference between two datestrings', t => {
	t.is(duration.date('01/01/00', '01/01/01').years, 1);
	t.is(duration.date('01/01/00', '02/02/00').months, 1);
	t.is(duration.date('01/01/00', '01/15/00').weeks, 2);
	t.is(duration.date('01/01/00', '01/15/00').days, 14);
	t.is(duration.date('01/01/00', '01/02/00').hours, 24);
	t.is(duration.date('01/01/00', '01/02/00').minutes, 24 * 60);
	t.is(duration.date('01/01/00', '01/02/00').seconds, 24 * 60 * 60);
});

test('should accept Date objects', t => {
	const date1 = new Date(2016, 1, 1, 14, 0, 0);
	const date2 = new Date(2018, 2, 2, 16, 10, 10);

	t.is(duration.date(date1, date2).years, 2);
	t.is(duration.date(date1, date2).months, 25);
	t.is(duration.date(date1, date2).weeks, 108);
	t.is(duration.date(date1, date2).days, 760);
	t.is(duration.date(date1, date2).hours, 18242);
	t.is(duration.date(date1, date2).minutes, 1094530);
	t.is(duration.date(date1, date2).seconds, 65671810);
});

test('should return specific units', t => {
	var diff = duration.date('01/01/01', '01/01/02');

	t.true(diff.hasOwnProperty("years"));
	t.true(diff.hasOwnProperty("months"));
	t.true(diff.hasOwnProperty("weeks"));
	t.true(diff.hasOwnProperty("days"));
	t.true(diff.hasOwnProperty("hours"));
	t.true(diff.hasOwnProperty("minutes"));
	t.true(diff.hasOwnProperty("seconds"));
});

test('should accept ISO Date strings', t => {
	const date1 = '2015-03-25';
	const date2 = '2015-03-26';

	const diff = duration.date(date1, date2);
	t.is(diff.years, 0);
	t.is(diff.months, 0);
	t.is(diff.weeks, 0);
	t.is(diff.days, 1);
	t.is(diff.hours, 24);
	t.is(diff.minutes, 24 * 60);
	t.is(diff.seconds, 24 * 60 * 60);
});

test('should accept Short Date strings', t => {
	const date1 = '1/1/2015';
	const date2 = '1/2/2015';

	const diff = duration.date(date1, date2);
	t.is(diff.years, 0);
	t.is(diff.months, 0);
	t.is(diff.weeks, 0);
	t.is(diff.days, 1);
	t.is(diff.hours, 24);
	t.is(diff.minutes, 24 * 60);
	t.is(diff.seconds, 24 * 60 * 60);
});

test('should accept Long Date strings', t => {
	const date1 = 'Mar 25 2015';
	const date2 = '26 Mar 2015';

	const diff = duration.date(date1, date2);
	t.is(diff.years, 0);
	t.is(diff.months, 0);
	t.is(diff.weeks, 0);
	t.is(diff.days, 1);
	t.is(diff.hours, 24);
	t.is(diff.minutes, 24 * 60);
	t.is(diff.seconds, 24 * 60 * 60);
});

test('should accept Full Date strings', t => {
	const date1 = 'Wednesday March 25 2015';
	const date2 = 'Wednesday March 26 2015';

	const diff = duration.date(date1, date2);
	t.is(diff.years, 0);
	t.is(diff.months, 0);
	t.is(diff.weeks, 0);
	t.is(diff.days, 1);
	t.is(diff.hours, 24);
	t.is(diff.minutes, 24 * 60);
	t.is(diff.seconds, 24 * 60 * 60);
});

test('should accept Long Date Time strings', t => {
	const date1 = 'Wed Sep 09 2015 23:11:46 GMT+0100 (WEST)';
	const date2 = 'Thu, 10 Sep 2015 22:11:47 GMT';

	const diff = duration.date(date1, date2);
	t.is(diff.years, 0);
	t.is(diff.months, 0);
	t.is(diff.weeks, 0);
	t.is(diff.days, 1);
	t.is(diff.hours, 24);
	t.is(diff.minutes, 24 * 60);
	t.is(diff.seconds, (24 * 60 * 60) + 1);
});

test('should accept TMZ Datetime strings', t => {
	const date1 = '2016-12-30T08:00:00.000Z';
	const date2 = '2016-12-31T08:00:01';

	const diff = duration.date(date1, date2);
	t.is(diff.years, 0);
	t.is(diff.months, 0);
	t.is(diff.weeks, 0);
	t.is(diff.days, 1);
	t.is(diff.hours, 24);
	t.is(diff.minutes, 24 * 60);
	t.is(diff.seconds, (24 * 60 * 60) + 1);
});

test('readme examples should pass', t => {
	const expected = {
		years: 1,
		months: 12,
		weeks: 52,
		days: 367,
		hours: 8808,
		minutes: 528480,
		seconds: 31708800
	};

	const example1 = duration.date('Mon Jan 01 2001 00:00:00 GMT+0000 (WET)', 'Thu, 03 Jan 2002 00:00:00 GMT');
	const example2 = duration.date('01/01/01', '01/03/02');

	t.deepEqual(example1, expected);
	t.deepEqual(example2, expected);
});
