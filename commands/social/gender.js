module.exports = {
	name: 'gender',
    description: 'Mira el avatar de un usuario.',
    aliases: ['setgender'],
    guildOnly: true,
	async execute(message, args) {
        const Trainers = require('../../../../models/Trainers')

        const { Transform } = require('../../utils/transform')

        const options = ['Male', 'Female']

        if(!args[0] || !options.includes(Transform(args[0]))) return
        
        const trainer = await Trainers.findOne({ where: { User: message.author.id }, attributes: ['Gender'] })

        if(!trainer) return

        await Trainers.update({ Gender: Transform(args[0]) }, { where: { User: message.author.id } })
        message.reply(`your profile has been updated!`)
	},
};