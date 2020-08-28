const { EmbedColor } = require('./embedcolor')

const Tenor = require("tenorjs").client({
    "Key": `${process.env.TENOR_TOKEN}`,
    "Filter": "off",
    "Locale": "en_US",
    "MediaFilter": "minimal",
    "DateFormat": "D/MM/YYYY - H:mm:ss A"
})

const Gif = (message, keyword, title) => {
    Tenor.Search.Random(keyword, "1").then(Results => {
        Results.forEach (async Post => {
            EmbedColor(message, title, message.author.avatarURL(), Post.media[0].gif.url)
        });
    }).catch(console.error)
}

module.exports = { Gif }