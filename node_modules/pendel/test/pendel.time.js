'use strict';
import test from 'ava';
import duration from '../';

test('should error when two timestrings are not supplied', t => {
	t.throws(() => {
		duration.time({}, {});
	}, 'pendel.time() expects string arguments');
});

test('should get the time difference between two timestrings', t => {
	t.is(duration.time('1:00AM', '2:00AM').hours, 1);
	t.is(duration.time('1:30AM', '3:45AM').hours, 2);
	t.is(duration.time('1:30AM', '3:45AM').totalMinutes, 135);
	t.is(duration.time('1:00AM', '3:30AM').minutes, 30);
	t.is(duration.time('00:00', '23:59').hours, 23);
	t.is(duration.time('00:00', '23:59').minutes, 59);
	t.is(duration.time('12:00AM', '00:00').minutes, 0);
	t.is(duration.time('12:00AM', '00:12').minutes, 12);
	t.is(duration.time('8:00PM', '9:30PM').totalMinutes, 90);
});

test('should support timestrings with seconds', t => {
	t.is(duration.time('1:00:01 AM', '1:00:10 AM').seconds, 9);
	t.is(duration.time('1:00:05 AM', '1:00:03 AM').totalSeconds, 2);
	t.is(duration.time('1:00:01 AM', '2:00:01 AM').totalSeconds, 3600);
	t.is(duration.time('1:00:00 AM', '1:10:01 AM').totalSeconds, 601);
	t.is(duration.time('11:59:59AM', '13:38:39').totalSeconds, 5920);
	t.is(duration.time('11:59:59AM', '13:38:39').totalMinutes, 98);
	t.is(duration.time('11:59:59AM', '16:55:03').totalSeconds, 17704);
});

test('should support both 12-hour and 24-hour formats', t => {
	t.is(duration.time('00:00', '11:59PM').hours, 23);
	t.is(duration.time('00:00', '11:59PM').minutes, 59);
	t.is(duration.time('12:00PM', '18:01').hours, 6);
	t.is(duration.time('12:00PM', '18:01').minutes, 1);
});

test('should return specific units', t => {
	const diff = duration.time('1:00AM', '3:30AM');
	t.true(diff.hasOwnProperty("totalMinutes"));
	t.true(diff.hasOwnProperty("totalSeconds"));
	t.true(diff.hasOwnProperty("hours"));
	t.true(diff.hasOwnProperty("minutes"));
	t.true(diff.hasOwnProperty("seconds"));
});

test('should accept Long Date Time strings', t => {
	const date1 = 'Wed Sep 09 2015 23:11:46 GMT+0100 (WEST)';
	const date2 = 'Wed Sep 10 2015 23:11:47 GMT+0100 (WEST)';

	const diff = duration.time(date1, date2);
	t.is(diff.hours, 24);
	t.is(diff.totalMinutes, 24 * 60);
	t.is(diff.totalSeconds, (24 * 60 * 60) + 1);
});

test('should accept TMZ Datetime strings', t => {
	const date1 = '2016-12-30T08:00:00.000Z';
	const date2 = '2016-12-31T08:00:01';

	const diff = duration.time(date1, date2);
	t.is(diff.hours, 24);
	t.is(diff.totalMinutes, 24 * 60);
	t.is(diff.totalSeconds, (24 * 60 * 60) + 1);
});

test('readme examples should pass', t => {
	const expected = {
		hours: 3,
		minutes: 30,
		seconds: 0,
		totalSeconds: 12600,
		totalMinutes: 210
	};
	const example1 = duration.time('2:00PM', '5:30PM');
	const example2 = duration.time('14:00', '17:30');
	const example3 = duration.time('Mon Jan 01 2001 14:00:00 GMT+0000 (WET)', 'Mon Jan 01 2001 17:30:00 GMT+0000 (WET)');

	t.deepEqual(example1, expected);
	t.deepEqual(example2, expected);
	t.deepEqual(example3, expected);
});
