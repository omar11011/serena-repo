module.exports = {
	name: 'bal',
    description: 'Balance Pokémon.',
    aliases: ['balance'],
    guildOnly: true,
	async execute(message, args) {
        const Trainers = require('../../../../models/Trainers')

        const { Embed } = require('../../utils/embed')
        const { DataItem } = require('../../controllers/dataItem')

        const mencion = message.mentions.users.first()
        let person = message.author
        if(mencion) person = mencion

        let user = await Trainers.findOne({ where: { User: message.author.id }, attributes: ['Credits','Redeems'] })
        if(mencion && !mencion.bot) user = await Trainers.findOne({ where: { User: mencion.id }, attributes: ['Credits','Redeems'] })
        if(!user) return 

        Embed(message, `${person.username}'s Balance`, `• **Money**: ${user.Credits}${DataItem('Pokecuarto', 'Emoji')}\n\n• **Redeems**: ${user.Redeems} ${DataItem('Redeem', 'Emoji')}`)
	},
};