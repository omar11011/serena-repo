module.exports = {
	name: 'rep',
    description: 'Reputación',
    aliases: ['rep'],
    guildOnly: true,
	async execute(message, args) {
        const Trainers = require('../../../../models/Trainers')
        const Commands = require('../../../../models/Commands')

        const { TimeAwait } = require('../../utils/timeAwait')
        const { Embed } = require('../../utils/embed')

        const trainer = await Trainers.findOne({ where: { User: message.author.id }, attributes: ['Rep'] })
        const mencion = message.mentions.users.first()
        
        if(!trainer || !mencion || mencion.id === message.author.id || mencion.bot) return

        const other = await Trainers.findOne({ where: { User: mencion.id }, attributes: ['Rep'] })
        if(!other) return message.reply(`this user has not yet registered as a pokémon trainer.`)

        const command = await Commands.findOne({ where: { User: message.author.id, Command: 'rep' }, attributes: ['Date'] })

        let time = Math.round((new Date()).getTime() / 1000)
        let cd = 28800

        if(!command) {
            await Commands.create({ User: message.author.id, Guild: message.guild.id, Command: 'rep', Date: time })
            await Trainers.update({ Rep: other.Rep + 1 }, { where: { User: mencion.id } })
            Embed(message, '', `**${mencion.tag}** received a reputation point from you. Great!`, '', '')
            return
        } else {
            let transcurrido = time - command.Date
            let falta = cd - transcurrido

            if(falta > 0) {
                message.reply(TimeAwait(message, falta))
                return
            } else {
                await Commands.update({ Guild: message.guild.id, Date: time }, { where: { User: message.author.id, Command: 'rep' } })
                await Trainers.update({ Rep: other.Rep + 1 }, { where: { User: mencion.id } })
                Embed(message, '', `**${mencion.tag}** received a reputation point from you. Great!`, '', '')
                return
            }
        }
	},
};