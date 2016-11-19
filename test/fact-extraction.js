import request from 'request'
import cheerio from 'cheerio'

request('http://www.factslides.com/p-702', (err,res,html) => {
    let txt = extractFactTexts(cheerio.load(html))
    console.log(txt)
})


function extractFactTexts($) {
    return $('#items .i').not('#fe').map((i, e) =>
        normalize($(e).text())
    ).get()
}

function normalize(factText) {
    return factText.trim()
                   .replace(/\s+/g, ' ') 
                   .replace(/\s(\.|,)/g, '$1')
}

