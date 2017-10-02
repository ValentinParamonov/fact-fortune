import fs from 'fs';
import r from 'rethinkdb';

const connectionConfig = {
    host: 'localhost',
    port: 28015,
    pathname: '/',
    db: 'factslides'
};

const out = fs.createWriteStream('factslides');
out
    .once('open', () => {
        r
            .connect(connectionConfig)
            .then(retrieveFacts)
            .then(writeFactsTo(out))
            .catch(console.error);
    });

function retrieveFacts(connection) {
    return r
        .table('facts')
        .orderBy({index: r.asc('id')})
        .run(connection);
}

function writeFactsTo(out) {
    const writeFact = writeFactTo(out);
    return cursor => {
        out.cork();
        cursor
            .each((error, fact) => {
                    if (error) return console.error(error);
                    writeFact(fact.text);
                },
                () => {
                    out.uncork();
                    out.end();
                    process.exit(0);
                }
            );
    };
}

function writeFactTo(out) {
    return factText => {
        out.write(withLineWidth(factText, 75) + '\n');
        out.write('%\n');
    };
}

function withLineWidth(text, width) {
    return text
        .split(/\s/)
        .reduce(
            (a, b) => {
                const init = a.slice(0, -1);
                const [last] = a.slice(-1);
                return last.length + b.length + 1 > width ? [...init, last, b] : [...init, `${last} ${b}`]
            },
            ['']
        )
        .join('\n')
        .slice(1);
}
