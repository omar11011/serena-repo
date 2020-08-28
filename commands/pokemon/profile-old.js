module.exports = {
	name: 'profileaaaaaaaaaaaaaa',
    description: 'Mira tu perfil de entrenador pokemon.',
    aliases: ['perfilaaaaaaaaaaaaaaaaaaa'],
    guildOnly: true,
	async execute(message, args) {
        const Discord = require("discord.js")
        const canvas = require('canvas')

        const Trainers = require('../../../../models/Trainers')
        const pokedex = require('../../data/pokedex')
        const mencion = message.mentions.users.first()

        let user = message.author.id
        if(mencion) {
            if(mencion.bot) return
            else user = mencion.id
        }

        const trainer = await Trainers.findOne({ where: { User: user }, attributes: ['Name', 'Region', 'Vip', 'Credits', 'Pokedex', 'Medals', 'Date', 'Cups', 'Gender', 'Rep'] })
        if(!trainer) {
            if(mencion) return message.reply(`this user is not yet registered as a pokémon trainer.`)
            else return message.reply(`you are not yet registered as a pokémon trainer.`)
        }

        const lienzo = canvas.createCanvas(800, 600)
        const ctx = lienzo.getContext('2d')
        
        const fondo_img = 'https://i.imgur.com/QPXjlci.png'
        let fondo = 'https://i.imgur.com/QPNn1VO.png'
        let name = trainer.Name
        let pokeColumn = trainer.Pokedex
        let medalColumn = trainer.Medals
        let dateColumn = trainer.Date
        let pokes = 0
        let medals = 0
        let debut = `${dateColumn.getMonth() + 1}/${dateColumn.getDate()}/${dateColumn.getFullYear()}`
        let region

        if(trainer.Vip) fondo = 'https://i.imgur.com/idVsMmy.png'
        if(trainer.Gender === 'Female') profile = 'https://i.imgur.com/RT5TjzH.png'
        if(pokeColumn) pokes = pokeColumn.split(",").length
        if(medalColumn) medals = medalColumn.split(",").length
        if(!trainer.Region) region = 'Without region'
        else region = trainer.Region

        const capa1 = await canvas.loadImage(fondo)
        ctx.drawImage(capa1, 0, 0, lienzo.width, lienzo.height)
        
        const capa2 = await canvas.loadImage(fondo_img)
        ctx.drawImage(capa2, 0, 0, lienzo.width, lienzo.height)

        const capa3 = await canvas.loadImage(profile)
        ctx.drawImage(capa3, 470, 200, 300, 300)

        ctx.font = '20px Arial'
        ctx.fillStyle = '#000000'
        ctx.textAlign = "start"

        ctx.fillText(`Trainer: ${name}`, 50, 190)
        ctx.fillText(`Pokédex: ${pokes}/${pokedex.length}`, 50, 230)
        ctx.fillText(`Pokécuartos: $ ${trainer.Credits}`, 50, 270)
        ctx.fillText(`Region: ${region}`, 50, 330)
        ctx.fillText(`Points: ${trainer.Cups}`, 50, 370)
        ctx.fillText(`Medals: ${medals}/8 | Reputation: ${trainer.Rep}`, 50, 410)
        ctx.fillText(`Register: ${debut}`, 50, 470)

        const attachment = new Discord.MessageAttachment(lienzo.toBuffer(), 'profile.png')
        message.channel.send(attachment)
	},
};