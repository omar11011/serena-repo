module.exports = {
	name: 'action',
    description: 'Acciones de tu mascota.',
    aliases: ['action'],
    guildOnly: true,
	async execute(message, args) {
        const { Embed } = require('../../utils/embed')

        const command = word => {
            let result = '`' + process.env.PREFIX + word + '`'
            return result
        }

        let description = `• To feed your pet: ${command('food')}\n\n• To clean your pet: ${command('clean')}\n\n• To play with your pet: ${command('play')}\n\n• To train your pet: ${command('train')}\n\n• To change the name of your pokémon: ${command('nickname [Name]')}`
        
        Embed(message, '', description, '', '')
	},
};