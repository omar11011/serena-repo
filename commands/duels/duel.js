module.exports = {
	name: 'duel',
    description: 'Reta a un compañero a una batalla.',
    aliases: ['duel'],
    guildOnly: true,
	async execute(message, args) {
        return message.reply(`this command is temporarily disabled.`)
        const Duels = require('../../../../models/Duels')
        const Pokemon = require('../../../../models/Pokemon')
        const Traders = require('../../../../models/Traders')
        const Contests = require('../../../../models/Contests')


        let time = Math.round((new Date()).getTime() / 1000)
        let mencion = message.mentions.users.first()

        if(!mencion || mencion.id === message.author.id || mencion.bot) return
        
        const pokemon = await Pokemon.findOne({ where: { User: message.author.id, Select: 1 }, attributes: ['ID'] })
        if(!pokemon) return

        const trade = await Traders.findOne({ where: { FirstUser: message.author.id, Accept: true }, attributes: ['ID'] })
        if(trade) return

        const contest = await Contests.findOne({ where: { Guild: message.guild.id, Channel: message.channel.id }, attributes: ['ID'] })
        if (contest) return message.reply(`someone is currently in competition on this channel.`)

        const duel = await Duels.findOne({ where: { FirstUser: message.author.id, Accept: true }, attributes: ['ID'] })
        if(duel) return message.reply('you are currently in a battle.')

        const rival = await Pokemon.findOne({ 
            where: { User: mencion.id, Select: 1 },
            attributes: ['ID'],
        })
        const duelRival = await Duels.findOne({ 
            where: { FirstUser: mencion.id, Accept: true },
            attributes: ['ID'],
        })
        
        if(!rival) return message.reply(`${mencion.tag} doesn't have a pokémon yet.`)
        if(duelRival) return message.reply(`${mencion.tag} is currently in battle.`)

        Duels.destroy({ where: { FirstUser: message.author.id, Accept: false } })
        Duels.destroy({ where: { SecondUser: message.author.id, Accept: false } })
        Duels.destroy({ where: { FirstUser: mencion.id, Accept: false } })
        Duels.destroy({ where: { SecondUser: mencion.id, Accept: false } })
        await Duels.create({
            FirstUser: message.author.id,
            SecondUser: mencion.id,
            Time: time,
        })

        message.channel.send(`<@${mencion.id}>, ${message.author.tag} has challenged you to a combat, accept him with ` + '``' + process.env.PREFIX + 'accept``')

        setTimeout(async () => {
            await Duels.destroy({ where: { FirstUser: message.author.id, Accept: false } })
        }, 15000)
	},
};