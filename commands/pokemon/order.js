module.exports = {
	name: 'order',
    description: 'Ordenar tus pokémon según el orden o el iv.',
    aliases: ['order'],
    guildOnly: true,
	async execute(message, args) {
        const Trainers = require('../../../../models/Trainers')
        const uses = ["IV","ID"]

        const user = await Trainers.findOne({ where: { User: message.author.id }, attributes: ['ID'] })

        if(!user) return
        if(!args[0] || !uses.includes(args[0].toUpperCase())) return message.reply('you can sort your Pokémon by ID or IV.')

        let direction = 'ASC'
        if(args[1] && args[1].toLowerCase() === 'desc') direction = 'DESC'

        await Trainers.update({ Order: args[0].toUpperCase(), Direction: direction }, { where: { User: message.author.id } });
        return message.reply('the order of your Pokémon has been updated.')
	},
};