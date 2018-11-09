const fs = require("fs")
const path = require("path")
const nmslParser = require("nsml")

const {argv} = process

if(argv.length != 4){
    throw "Usage: $ node parser.js scenario.txt output.json"
}

const scenarioText = argv[2]
const output = argv[3]

const scenario = fs.readFileSync(scenarioText)
const scenarioJson = nmslParser(scenario)
fs.writeFileSync(output, scenarioJson)

// const readFile = path => (
//     new Promise((resolve, reject) => {
//         fs.readFile(path, (err, data) => {
//             if(err) reject(err)
//             else resolve(data)
//         })
//     })
// )

// Promise.all([readFile(mediaJson), readFile(scenarioText)])
//     .then(values => {
//         const data = core(...(values.map(e => e.toString())))
//         fs.writeFile(output, data, err => {
//             if(err) throw err
//         })
//     })
