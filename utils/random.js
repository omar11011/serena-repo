const Color = () => {
    const module = require('../data/color')

    let color = module[Math.floor(Math.random() * module.length)][1]

    return color
}

const Footer = () => {
    const randomMessage = require('../data/randomMessage')

    let msgfooter = randomMessage[Math.floor(Math.random() * randomMessage.length)]

    return msgfooter
}

module.exports = { Color, Footer }