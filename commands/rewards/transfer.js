module.exports = {
    name: 'transfer',
    description: 'Dar dinero a otro usuario.',
    aliases: ['transferir', 'transferencia'],
    guildOnly: true,
    async execute(message, args) {
        const Trainers = require('../../../../models/Trainers')
        const { DataItem } = require('../../controllers/dataItem')

        const trainer = await Trainers.findOne({ where: { User: message.author.id }, attributes: ['Credits'] })
        if(!trainer) return

        const mencion = message.mentions.users.first()
        if(!mencion || mencion.id === message.author.id || mencion.bot) return

        const filter = await Trainers.findOne({ where: { User: mencion.id }, attributes: ['Credits'] })
        if(!filter) return message.reply(`the user you are trying to give a box to has not yet registered as a pokémon trainer.`)

        if(!args[1] || isNaN(args[1])) return
        let quantity = parseInt(args[1])

        if(quantity > trainer.Credits) return message.reply(`you don't have enough pokécuartos in your pocket.`)

        await Trainers.update({ Credits: trainer.Credits - quantity }, { where: { User: message.author.id } })
        await Trainers.update({ Credits: filter.Credits + quantity }, { where: { User: mencion.id } })

        message.channel.send(`**${mencion.username}** has received ${quantity}${DataItem('Pokecuarto', 'Emoji')} from **${message.author.username}**`)
    },
};
