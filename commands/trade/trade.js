module.exports = {
	name: 'trade',
    description: 'Manda solicitud de intercambio a un usuario.',
    aliases: ['trade'],
    guildOnly: true,
    cooldown: 10,
    alert: true,
	async execute(message, args) {
        const Trainers = require('../../../../models/Trainers')
        const Duels = require('../../../../models/Duels')

        const { SendTrade } = require('../../db/megadb/sendtrade')

        let mencion = message.mentions.users.first()

        if(!mencion || mencion.bot || mencion.id === message.author.id) return

        const trainer = await Trainers.findOne({ where: { User: message.author.id }, attributes: ['ID'] })
        if(!trainer) return

        const other = await Trainers.findOne({ where: { User: mencion.id }, attributes: ['ID'] })
        if(!other) return

        const duel = await Duels.findOne({ where: { FirstUser: message.author.id, Accept: true }, attributes: ['ID'] })
        if(duel) return

        SendTrade(message, mencion.id)
	},
};