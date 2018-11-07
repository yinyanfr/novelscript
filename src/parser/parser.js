const fs = require("fs")
const path = require("path")
const core = require("./parser-core")

const {argv} = process

if(argv.length != 5){
    throw "Usage: $ node parser.js media.json scenario.txt output.json"
}

const mediaJson = argv[2]
const scenarioText = argv[3]
const output = argv[4]

const readFile = path => (
    new Promise((resolve, reject) => {
        fs.readFile(path, (err, data) => {
            if(err) reject(err)
            else resolve(data)
        })
    })
)

Promise.all([readFile(mediaJson), readFile(scenarioText)])
    .then(values => {
        const data = core(...(values.map(e => e.toString())))
        fs.writeFile(output, data, err => {
            if(err) throw err
        })
    })