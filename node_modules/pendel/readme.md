# pendel [![Build Status](https://travis-ci.org/radiovisual/pendel.svg)](https://travis-ci.org/radiovisual/pendel)

> Get the time difference between two date strings or two time strings.

**[Pendel](https://de.wikipedia.org/wiki/Pendel):** German word for pendulum.

## v3.0

Version 3.0 allows you to pass in fully-qualified datetime strings to both
`pendel.date()` and `pendel.time()`. Per the v2.0 API, you can still pass in 12-hour
and 24-hour clocktime strings to `pendel.time()`.

## Install

```
$ npm install --save pendel
```


## Usage

```js
const duration = require('pendel');

// Difference in CLOCK TIMES via pendel.time()
duration.time('2:00PM', '5:30PM');
duration.time('14:00', '17:30');
duration.time('Mon Jan 01 2001 14:00:00 GMT+0000 (WET)', 'Mon Jan 01 2001 17:30:00 GMT+0000 (WET)');
/*
  {
    hours: 3,
    minutes: 30,
    seconds: 0,
    totalSeconds: 12600,
    totalMinutes: 210
  }
*/

// Difference in CALENDAR DATES via pendel.date()
duration.date('Mon Jan 01 2001 00:00:00 GMT+0000 (WET)', 'Thu, 03 Jan 2002 00:00:00 GMT');
duration.date('01/01/01', '01/03/02');
/*
  { years: 1,
    months: 12,
    weeks: 52,
    days: 367,
    hours: 8808,
    minutes: 528480,
    seconds: 31708800
  }
*/
```


## API

### `pendel.time(startTime, endTime)`

Get the time difference between `startTime` and `endTime`.

Returns an `object` with the following time properties:

Property | Description
:--- | :---
`hours` | The difference in hours
`minutes` | The difference in minutes
`seconds` | The difference in seconds
`totalSeconds` | The total elapsed time in seconds
`totalMinutes` | The total elapsed time in minutes


#### startTime

Type: `string`  

A datestring or clocktime string.


#### endTime

Type: `string`

A datestring or clocktime string.

**Note:** `startTime` & `endTime` recognize any of the following formats
to be 12-hour or 24-hour clocktime string:

12-hour formats: *(space after time optional)*

- `1:00 AM`
- `1:00AM`
- `1:00:00 AM`
- `1:00:00AM`

24-hour formats:

- `00:00`
- `00:00:00`


### `pendel.date(startDate, endDate)`

Get the elapsed (delta) time between startDate and endDate

Returns an `object` with the following Date properties:

Property | Description
:--- | :---
`years` | The difference in years
`months` | The difference in months
`weeks` | The difference in weeks
`days` | The total elapsed time in days
`hours` | The total elapsed time in hours
`minutes` | The total elapsed time in minutes
`seconds` | The total elapsed time in seconds


#### startDate

Type: `string` | `Date`

The datestring or Date object you want to use as the start date.


#### endDate

Type: `string` | `Date`

The datestring or Date object you want to use as the end date.


## License

MIT @ [Michael Wuergler](http://www.numetriclabs.com)
