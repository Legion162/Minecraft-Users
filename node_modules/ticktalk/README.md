# TickTalk.js 🕰️💬
[![npm version](https://img.shields.io/npm/v/ticktalk.svg)](https://www.npmjs.com/package/ticktalk)
[![npm downloads](https://img.shields.io/npm/dt/ticktalk.svg)](https://www.npmjs.com/package/ticktalk)
[![GitHub license](https://img.shields.io/github/license/alexa-whitney/ACS3310-Date-Library.svg)](https://github.com/alexa-whitney/ACS3310-Date-Library/blob/master/LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/alexa-whitney/ACS3310-Date-Library.svg)](https://github.com/alexa-whitney/ACS3310-Date-Library/issues)

[NPM Package](https://www.npmjs.com/package/ticktalk)

Hello, time-traveler! Welcome to **TickTalk.js**, where we're always up for a *date night* with your code. Want to manage your dates without the dread? Let's **talk ticks!** 🗓️

## Description 📖

**TickTalk.js** isn't just another date library – it's your trusty sidekick in the ever-ticking world of JavaScript dates. Consider it a rendezvous between clarity and functionality, making your date operations more intuitive and less... *date-ing* (pun absolutely intended).

## Why TickTalk.js? 🤔

Every developer knows the classic JS Date Object is like a flaky date – unpredictable and often disappointing. That's why we've wrapped it up and presented it in a way that's more approachable and, dare we say, fun!

## Setting Up the Date 🌹

### Project Structure:

1. 📁 **src** - All your source code sits here, waiting for the next date!
2. 📁 **tests** - This is where we ensure our dates go smoothly.

### Initialization:

- Set up a new rendezvous: `npm init -y`
- Invite Jest over for some testing fun: `npm install --save-dev jest`

Don't forget the `.gitignore` – because some things, like `node_modules`, are better left unsaid.

## Features & Usage 🌟

Our library lets you dance around date problems:

- **Easy Instantiation** - Initialize just like you would with the classic Date object.
  
    ```javascript
    const d = new D('9/26/1965');  // Let's have a retro date night!
    ```

- **Human Readable Values** - Dates are more than numbers, they have names!

    ```javascript
    console.log(d.year);   // Get the full year
    console.log(d.mon);    // Just the short month
    console.log(d.dy);     // And a snazzy day!
    ```

- **Flexible Formatting** - Want your date to wear a different outfit? You got it.

    ```javascript
    console.log(d.format('y/m/d h:i:s'));
    ```

- **Relative Dating with `when()`** - Know if you're reminiscing about the past or dreaming about the future.

    ```javascript
    console.log(d.when()); // Was it 6 months ago or 3 months from now?
    ```

- **Documented Affair** - JS Doc string comments ensure that this isn't a mysterious date.

... and so much more!

## Documentation 📜
# D Class: Custom Date Utility

A custom utility for handling and formatting dates.

## Constructor

`constructor(...args)`
- **args**: Arguments for the native Date constructor. Can be anything that the native Date constructor accepts.

## Getters

- **year**: Returns the full year, e.g. 2023.
- **yr**: Returns the last two digits of the year, e.g. 23 for 2023.
- **month**: Returns the full month name.
- **mon**: Returns the abbreviated month name.
- **day**: Returns the full day name.
- **dy**: Returns the abbreviated day name.
- **date**: Returns the day of the month.
- **hours**: Returns the hours of the day.
- **mins**: Returns the minutes of the hour.
- **secs**: Returns the seconds of the minute.
- **ordinal**: Returns the ordinal representation of the day of the month.

## Methods

### `format(mask = 'Y M D')`
Formats the date based on the given mask.
- **mask**: A pattern string for formatting the output. Defaults to 'Y M D'.
- Returns: Formatted date string.

### `when()`
Provides a relative string representation (e.g., "2 days ago", "3 months from now").
- Returns: The relative string representation of the date.

### `_differenceInDays(targetDate)`
*Private method*. Calculates the difference in days between the current and target dates.
- **targetDate**: A Date object representing the target date.
- Returns: Difference in days between current and target dates.

### `_differenceInSeconds(targetDate)`
*Private method*. Calculates the difference in seconds between the current and target dates.
- **targetDate**: A Date object representing the target date.
- Returns: Difference in seconds between current and target dates.

*For further implementation details, refer to the source code. The provided methods offer flexible date operations suitable for a variety of applications.*

## Testing the Waters 🧪

Every good date deserves a follow-up, right? We've got unit tests to ensure that every interaction with **TickTalk.js** is as smooth as your best pickup line.

## Want to Contribute? 🍷

Feel like joining our date night? Contributions are welcome! Just ensure your code is pun-ctual and doesn't stand up our existing features.

## TickTalk To Us! 💌

Found a bug or just want to share your experience on this date? Raise an issue or send a pull request. We're all ears (and a bit of code)!

---

Happy dating with **TickTalk.js** – where every tick leads to meaningful talk! 🕰️💖💬