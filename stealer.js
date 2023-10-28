const { default: axios } = require('axios');
const chalk = require(`chalk`);
const rl = require(`readline-sync`);
const fs = require(`fs`);
const baggie = require(`@baggie/core`);
const duration = require('pendel');
const { HttpsProxyAgent } = require('https-proxy-agent');
const { abort } = require('process');
const { EmbedBuilder, WebhookClient } = require('discord.js');
const prefix = chalk.redBright('[+]');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
require('dotenv').config();

let ascii = `
                                                888                       d8b                         .d8888b.           d8b                           
                                                888                       Y8P                        d88P  Y88b          Y8P                           
                                                888                                                  Y88b.                                             
                                                888      .d88b.   .d88b.  888  .d88b.  88888b.        "Y888b.   88888b.  888 88888b.   .d88b.  888d888 
                                                888     d8P  Y8b d88P"88b 888 d88""88b 888 "88b          "Y88b. 888 "88b 888 888 "88b d8P  Y8b 888P"   
                                                888     88888888 888  888 888 888  888 888  888            "888 888  888 888 888  888 88888888 888     
                                                888     Y8b.     Y88b 888 888 Y88..88P 888  888      Y88b  d88P 888  888 888 888 d88P Y8b.     888     
                                                88888888 "Y8888   "Y88888 888  "Y88P"  888  888       "Y8888P"  888  888 888 88888P"   "Y8888  888     
                                                                      888                                                    888                       
                                                                 Y8b d88P                                                    888                       
                                                                  "Y88P"                                                     888                       
                                                                                        
                                                                                                                                                  
                                                                [1] Config                [2] Quick start                  [3] Credits                      `;

let asciiCredits = `

                                                                                                                
                                                                                                                
                                                                                                                
                                                                                                                
                                                                                                ${chalk.white(
																																																	`Made by Legion162`
																																																)}                                                                                                                
                                                                                                                
                                                                                                                
                                                                                                                
Github : https://github.com/Legion162
Discord : legion162                                                                                                            
                                                                                                                
                                                                                                                `;

const token = process.env.LEGION;

const readFilePro = (file) => {
	return new Promise((resolve, reject) => {
		fs.readFile(file, (err, data) => {
			if (err) reject(`I could not find that file 😭`);
			resolve(data);
		});
	});
};

async function onSuccessWebhook(username) {
	const ogu = await getUsername(token);
	const uuid = await getUuid(ogu);
	const webhookClient = new WebhookClient({
		id: `1165999071832584303`,
		token: `LYPHRaPNe9uzlc143S15xHMOXrfTzQ8Z6ZeyTOU7loi4KGKMt8aUnJ8cJuLfifIqZw_n`,
	});

	const embed = new EmbedBuilder()
		.setTitle(`${ogu} was changed to ${username}`)
		.setColor(0x2596be)
		.setAuthor({
			name: 'Legion162',
			iconURL: 'https://i.imgur.com/Yqu2wa3.png',
			url: 'https://github.com/Legion162',
		})
		.addFields(
			{ name: 'UUID', value: uuid },
			{ name: 'Account', value: ogu, inline: true }
		);

	webhookClient.send({
		username: 'Legion Sniper',
		avatarURL: 'https://i.imgur.com/Yqu2wa3.png',
		embeds: [embed],
	});
}

async function userDataJson(
	username,
	day,
	month,
	year,
	hour,
	minute,
	second,
	dateLitteral,
	dateThen,
	dateNow,
	d
) {
	var userData = JSON.stringify({
		username: username,
		date: dateLitteral,
		dateinfo: {
			day: day,
			month: month,
			year: year,
			hour: hour,
			minute: minute,
			second: second,
		},
		durationRaw: d,
		durationSecs: d.totalSeconds,
		dateNow: dateNow,
		dateThen: dateThen,
	});
	return userData;
}

async function replaceConfigFile(userData) {
	fs.writeFileSync(`./config/config.json`, userData);
}

async function checkConfigFile() {
	var exists = fs.existsSync(`./config/config.json`);
	if (exists == true) {
		return `true`;
	} else if (exists == false) {
		return `false`;
	}
}

async function writeConfigFile(userData, checkResult) {
	var folderExists = fs.existsSync(`./config`);
	var fileExists = fs.existsSync(`./config/config.json`);
	if (folderExists == false) {
		fs.mkdirSync(`./config`);
		fs.writeFileSync(`./config/config.json`, userData);
	} else if (folderExists == true && fileExists == false) {
		fs.writeFileSync(`./config/config.json`, userData);
	} else if (checkResult == `true`) {
		return `exists`;
	}
}

async function parseConfigFile() {
	var userData = fs.readFileSync(`./config/config.json`);
	userData = JSON.parse(userData);
	return userData;
}

async function quickStart() {
	var check = await checkConfigFile();
	if (check == `false`) {
		console.log(`\n${prefix} No config file found !`);
		console.log(`\n${prefix} Do you want to create one ?`);
		const answer = rl.question('\n    y/n: ');
		if (answer == `y`) {
			config();
		} else {
			abort();
		}
	} else if (check == `true`) {
		var userData = await parseConfigFile();
		var username = userData.username;
		var dateRaw = userData.date;
		let ogu = await getUsername(token);
		console.log(`\n${prefix} Will snipe ${username} on ${dateRaw}`);
		console.log(`\n${prefix} Please wait...`);
		await sleep(userData.durationSecs * 1000);
		console.log(`${prefix} Sniping ...`);
		for (let i = 0; i < 1000; i++) {
			snipe2(username, ogu);
		}
	}
}

async function credits() {
	console.clear();
	console.log(chalk.blueBright(asciiCredits));
	var i = rl.question(`Press enter to go back ...`);
    if(i == ``){
        main()
    }
}

async function config() {
	console.log(`\n${prefix} What is the username you want to snipe ? `); //'{"username":"Asian","date":"4/11/2023 | 11:43:49","dateinfo":{"day":"4","month":"11","year":"2023","hour":"11","minute":"43","second":"49"},"durationRaw":{"hours":289,"minutes":41,"seconds":50,"totalMinutes":17381,"totalSeconds":1042910},"durationSecs":1042910,"dateNow":"2023-10-23T09:01:59.459Z","dateThen":"2023-11-04T10:43:49.000Z"}'
	var username = rl.question(`\n--> `);
	console.log(`\n${prefix} When is the username going to be avaible ?`);
	var day = rl.question(`    Day : `);
	var month = rl.question(`    Month : `);
	var year = rl.question(`    Year : `);
	var hour = rl.question(`    Hour : `);
	var minute = rl.question(`    Minute : `);
	var second = rl.question(`    Second : `);
	var dateLitteral = `${day}/${month}/${year} | ${hour}:${minute}:${second}`;
	var dateThen = new Date(
		year,
		month - 1,
		day,
		hour,
		minute,
		second
	).toISOString();
	var dateNow = new Date().toISOString();
	var d = duration.time(dateNow, dateThen);
	// console.log(`\n${prefix} Will snipe the ${username} on ${dateLitteral}`)
	console.log(`\n${prefix} Do you want to save this in your config file ?`);
	var save = rl.question('\n    y/n: ');
	if (save.toLowerCase() == `y`) {
		var userData = await userDataJson(
			username,
			day,
			month,
			year,
			hour,
			minute,
			second,
			dateLitteral,
			dateThen,
			dateNow,
			d
		);
		var check = await checkConfigFile();
		var check2 = await writeConfigFile(userData, check);
		if (check2.toLowerCase() == `exists`) {
			console.log(
				`\n${prefix} Config already exist, do you want to update it ?`
			);
			var replace = rl.question('\n     y/n: ');
			if (replace.toLowerCase() == `y`) {
				await replaceConfigFile(userData);
				console.log(`\n${prefix} Your file has been updated .`);
			} else if (replace.toLowerCase() == `n`) {
				console.log(`\n${prefix} Your file has not been updated .`);
			}
		}
		console.log(`\n${prefix} Do you want to start sniping ?`);
		const startSniper = rl.question('\n    y/n: ');
		if (startSniper.toLowerCase() == `y`) {
			quickStart();
		}
	} else if (save.toLowerCase() == `n`) {
		var userData = await userDataJson(
			username,
			day,
			month,
			year,
			hour,
			minute,
			second,
			dateLitteral,
			dateThen,
			dateNow,
			d
		);
	}
    return [userData, `false`];
}

async function notSoQuickStart(userData) {
	console.log(`${prefix} Will snipe without a config file`);
	u = JSON.parse(userData);
	var username = u.username;
	var dateRaw = u.date;
	let ogu = await getUsername(token);
	console.log(`\n${prefix} Will snipe ${username} on ${dateRaw}`);
	console.log(`\n${prefix} Please wait...`);
	await sleep(userData.durationSecs * 1000);
	console.log(`${prefix} Sniping ...`);
	for (let i = 0; i < 1000; i++) {
		snipe2(username, ogu);
	}
}

async function check(response, ogu, knu) {
	if (response.status == 403) {
		return chalk.red(`This username is not avaible yet !`);
	} else if (response.status == 401) {
		return chalk.red(`Invalid Token !`);
	} else if (response.status == 400) {
		return chalk.red(`This username is invalid !`);
	} else if (response.status == 429) {
		return chalk.yellow(`Slow down, you're sending too many requests !`);
	} else if (response.status == 500) {
		return chalk.red(`API is down !`);
	} else if (response.status == 200) {
		onSuccessWebhook(knu);
		return chalk.greenBright(`${ogu} was changed to ${knu} succesfully !`);
	}
}

async function getUsername(t) {
	const config = {
		headers: {
			Authorization: 'Bearer ' + t,
		},
	};
	const response = await axios.get(
		`https://api.minecraftservices.com/minecraft/profile`,
		config
	);
	var ign = response.data.name;
	return ign;
}

async function snipe2(knu, ogu) {
	// var proxyList = await scrapeProxies(`proxy.txt`)
	const response = await fetch(
		`https://api.minecraftservices.com/minecraft/profile/name/${knu}`,
		{
			method: 'PUT',
			headers: { Authorization: `Bearer ${token}` },
		}
	);
	var verdict = await check(response, ogu, knu);
	console.log(verdict);
}
async function getUuid(username) {
	a = await axios.get(
		`https://api.mojang.com/users/profiles/minecraft/${username}`
	);
	return a.data.id;
}

async function main() {
	console.clear();
	console.log(chalk.redBright(ascii));
	var q = rl.question(`\n\n--> `);
	if (q == 1) {
		var info = await config();
		if (info[1] == `false`) {
			notSoQuickStart(info[0]);
		} else {
		}
	} else if (q == 2) {
		quickStart();
	} else if (q == 3) {
		credits();
	}
}

main();

async function uuidlol(){
	var uuid = await getUuid(`legion8`)
	console.log(uuid)
}
