const ImgBattle = async (message, pokemon1, shiny1, hp1, id1, ball1, pokemon2, shiny2, hp2, id2, ball2) => {
    const Discord = require("discord.js")
    const canvas = require('canvas')

    const { GetImage } = require('../controllers/image')
    const { DataItem } = require('../controllers/dataItem')
    const { EmbedAttachment } = require('../utils/embedcolor')

    const lienzo = canvas.createCanvas(1024, 576)
    const ctx = lienzo.getContext('2d')
    let day = new Date()
    let color = '#000000'
    let defaultImage = 'https://i.imgur.com/QPNn1VO.png'
    if(day.getHours() > 18) defaultImage = 'https://i.imgur.com/zThrnlm.png', color = '#ffffff'

    let img1 = GetImage(pokemon1, shiny1)
    let img2 = GetImage(pokemon2, shiny2)

    const fondo = await canvas.loadImage(defaultImage)
    ctx.drawImage(fondo, 0, 0, lienzo.width, lienzo.height)

    const poke1 = await canvas.loadImage(img1)
    ctx.drawImage(poke1, 100, 138, 300, 300)

    const vs = await canvas.loadImage('https://userscontent2.emaze.com/images/fd17b425-c32f-4bc6-bd65-54f131d3d451/799dc45a4ecc95fdc91ad640051453c5.png')
    ctx.drawImage(vs, 462, 238, 100, 100)

    const poke2 = await canvas.loadImage(img2)
    ctx.drawImage(poke2, 624, 138, 300, 300)

    ctx.font = '50px Arial'
    ctx.fillStyle = color
    ctx.textAlign = "center"

    ctx.fillText(`HP: ${hp1}`, 250, 480)
    ctx.fillText(`HP: ${hp2}`, 774, 480)
    
    const attachment = new Discord.MessageAttachment(lienzo.toBuffer(), 'battle.png')
    
    EmbedAttachment(message, '', '', `${DataItem(ball1, 'Emoji')} | <@${id1}> has chosen  **${pokemon1}** for battle.\n${DataItem(ball2, 'Emoji')} | <@${id2}> chooses  **${pokemon2}** to face him.\n\nThey will be able to make movements every 10 seconds, good luck to both!`, attachment, 'attachment://battle.png')
}

module.exports = { ImgBattle }