import fs from 'fs'
import r from 'rethinkdb'

const connectionConfig = {
    host: 'localhost',
    port: 28015,
    pathname: '/',
    db: 'factslides'
}

let out = fs.createWriteStream('factslides')
out.once('open', () => {
    r.connect(connectionConfig)
     .then(retrieveFacts)
     .then(writeFactsTo(out))
     .catch(console.error)
})

function retrieveFacts(connection) {
    return r.table('facts')
            .orderBy({index: r.asc('id')})
            .run(connection)
}

function writeFactsTo(out) {
    const writeFact = writeFactTo(out)
    return cursor => {
        out.cork()
        cursor.each((error, fact) => {
            if (error) return console.error(error)
            writeFact(fact.text)
        },
        () => {
            out.uncork()
            out.end()
            process.exit(0)
        })
    }
}

function writeFactTo(out) {
    return factText => {
        out.write(normalize(factText) + '\n')
        out.write('%\n')
    }
}

function normalize(factText) {
    return factText.replace(/\s+/g, ' ')
                   .replace(/\s(\.|,)/g, '$1')
                   .replace(/^\s+/g, '')
                   .replace(/\s+$/g, '')
}
