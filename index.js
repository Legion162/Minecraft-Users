const ascii = `
██▓    ▓█████   ▄████  ██▓ ▒█████   ███▄    █      ▄████ ▓█████  ███▄    █ 
▓██▒    ▓█   ▀  ██▒ ▀█▒▓██▒▒██▒  ██▒ ██ ▀█   █     ██▒ ▀█▒▓█   ▀  ██ ▀█   █ 
▒██░    ▒███   ▒██░▄▄▄░▒██▒▒██░  ██▒▓██  ▀█ ██▒   ▒██░▄▄▄░▒███   ▓██  ▀█ ██▒
▒██░    ▒▓█  ▄ ░▓█  ██▓░██░▒██   ██░▓██▒  ▐▌██▒   ░▓█  ██▓▒▓█  ▄ ▓██▒  ▐▌██▒
░██████▒░▒████▒░▒▓███▀▒░██░░ ████▓▒░▒██░   ▓██░   ░▒▓███▀▒░▒████▒▒██░   ▓██░
░ ▒░▓  ░░░ ▒░ ░ ░▒   ▒ ░▓  ░ ▒░▒░▒░ ░ ▒░   ▒ ▒     ░▒   ▒ ░░ ▒░ ░░ ▒░   ▒ ▒ 
░ ░ ▒  ░ ░ ░  ░  ░   ░  ▒ ░  ░ ▒ ▒░ ░ ░░   ░ ▒░     ░   ░  ░ ░  ░░ ░░   ░ ▒░
  ░ ░      ░   ░ ░   ░  ▒ ░░ ░ ░ ▒     ░   ░ ░    ░ ░   ░    ░      ░   ░ ░ 
    ░  ░   ░  ░      ░  ░      ░ ░           ░          ░    ░  ░         ░ 
                                                                            `                                                                          

const axios = require(`axios`)
const colors = require(`colors162`)
const fs = require(`fs`)
const chalk = require(`chalk`);
const sleep = ms => new Promise(r => setTimeout(r, ms));
var requests = require('requests');
const json = require(`json`)

console.clear()
console.log(chalk.red(ascii))  

var url = `https://api.mojang.com/users/profiles/minecraft/`

const readFilePro = file => {
    return new Promise((resolve, reject) =>{
        fs.readFile(file, (err, data) => {
            if(err) reject(`I could not find that file 😭`)
            resolve(data);
        })
    })
}


const checkign = name => {
    return new Promise(async (resolve, reject) =>{
        requests(url+name)
        .on('data',(chunk) => {
            resolve(chunk)
        })
        .on('end', function (err) {
            if (err) reject(`there was an error`);
        })
    })
}

async function main(){
    var data = await readFilePro('words.txt')
    var words = data.toString().split(`\n`)
    for(let i=0;i<words.length ;i++){
        let name = words[i]
        var res = await checkign(name)
        var res2 = JSON.parse(res)
        if(res2.id){
            console.log(chalk.redBright(name))
            await sleep(1000)
        }
        else{
            console.log(chalk.greenBright(name))
            await sleep(1000)
        }
} 
}

main()
