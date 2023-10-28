'use strict';
var dateComponents = require('date-components');
var moment = require('moment');
var twelveTwentyfour = require('twelve-to-twentyfour');
require('moment-range');

/**
 * Get the time diffrence between two timestrings.
 *
 * @param {string} timestr1 - a time string.
 * @param {string} timestr2 - a time string.
 * @returns {object}
 */
function getTimeDifference(timestr1, timestr2) {
	if (typeof timestr1 !== 'string' || typeof timestr2 !== 'string') {
		throw new Error('pendel.time() expects string arguments');
	}

	// Check if we are getting the short timecode formats
	// like 1:32PM or 13:32. If Yes, convert it into a
	// generic datestring so that we can support the old API.
	var date1 = shortTimeToDateString(timestr1);
	var date2 = shortTimeToDateString(timestr2);

	if (!date1) {
		date1 = new Date(timestr1).toString();
	}

	if (!date2) {
		date2 = new Date(timestr2).toString();
	}

	var time1 = dateComponents(date1);
	var time2 = dateComponents(date2);

	var results = getTotalResultsFromEpochs(time1.epoch, time2.epoch);

	return {
		hours: Math.floor(results.totalSeconds / 60 / 60),
		minutes: Math.floor((results.totalSeconds / 60) % 60),
		seconds: Math.floor(results.totalSeconds % 60),
		totalMinutes: results.totalMinutes,
		totalSeconds: results.totalSeconds
	};
}

/**
 * Get the time diffrence between two datestrings.
 * Example: '1:32PM' => 'Mon Feb 13 2017 13:32 GMT+0000 (WET)'
 *
 * @param {string} timestr1 - a date string.
 * @param {string} timestr2 - a date string.
 * @returns {object}
 */
function getDateDifference(timestr1, timestr2) {
	// Force into predictable date format
	var start = timestr1.toLocaleDateString ? timestr1 : new Date(timestr1);
	var end = timestr2.toLocaleDateString ? timestr2 : new Date(timestr2);

	if (start.toString() === 'Invalid Date' || end.toString() === 'Invalid Date') {
		throw new TypeError('pendel.date() expects two valid date strings');
	}

	var dr = moment.range(start, end);

	return {
		years: dr.diff('years'),
		months: dr.diff('months'),
		weeks: dr.diff('weeks'),
		days: dr.diff('days'),
		hours: dr.diff('hours'),
		minutes: dr.diff('minutes'),
		seconds: dr.diff('seconds')
	};
}

/**
 * Convert 12-hour or 24-hour clock time formats to valid date strings.
 * Example: '1:32PM' => 'Mon Feb 13 2017 13:32 GMT+0000 (WET)'
 *
 * @param {string} - the clock time you want to convert to a date.
 * @returns {string|undefined}
 */
function shortTimeToDateString(shortTime) {
	// valid 24-hour string 00:00
	var reg24 = /^[0-9]{2}:[0-9]{2}(:[0-9]{2})?$/;

	// valid 12-hour strings: '0:00AM' || '0:00 AM' || '00:00PM' || '00:00 PM' || '00:00:00 AM' || '00:00:00AM'
	var reg12 = /^[0-9]{1,2}:[0-9]{2}(:[0-9]{2})?\s?(AM|PM)$/i;

	if (reg24.test(shortTime)) {
		return twentyFourHourTimeToDateString(shortTime);
	}

	if (reg12.test(shortTime)) {
		return twentyFourHourTimeToDateString(twelveTwentyfour(shortTime));
	}
}

/**
 * Place a clocktime into a generic datetime string.
 * Example: '1:32PM' => 'Mon Feb 13 2017 13:32 GMT+0000 (WET)'
 *
 * @param {string} time - the clocktime you want to convert to a date.
 */
function twentyFourHourTimeToDateString(time) {
	return 'Mon Feb 13 2017 ' + time + ' GMT+0000 (WET)';
}

/**
 * Place a clocktime into a generic datetime string.
 * Example: '1:32PM' => 'Mon Feb 13 2017 13:32 GMT+0000 (WET)'
 *
 * @param {number} epoch1 - an epoch time.
 * @param {number} epoch2 - an epoch time.
 * @returns {object}
 */
function getTotalResultsFromEpochs(epoch1, epoch2) {
	var millisecs = Math.abs(epoch1 - epoch2);
	var seconds = millisecs / 1000;

	return {
		totalSeconds: seconds,
		totalMinutes: Math.floor(seconds / 60),
		totalHours: Math.floor(seconds / 60) * 60
	};
}

module.exports = {
	time: getTimeDifference,
	date: getDateDifference
};
