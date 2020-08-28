module.exports = {
    name: 'bonus',
    description: 'Recibe premios cada 5 minutos.',
    aliases: ['bonus'],
    guildOnly: true,
    cooldown: 300,
    alert: true,
    async execute(message, args) {
        const Trainers = require('../../../../models/Trainers')
        const Discord = require('discord.js')

        const { DataItem } = require('../../controllers/dataItem')

        const trainer = await Trainers.findOne({ where: { User: message.author.id }, attributes: ['Credits'] })
        if (!trainer) return

        let gift = Math.round(300 * (Math.random() + 1))

        await Trainers.update({ Credits: trainer.Credits + gift }, { where: { User: message.author.id } })

        message.reply(`you have received **${gift}**${DataItem('Pokecuarto', 'Emoji')}`)
        message.reply("Do you want me to remind you when this command will be available again? type `yes` or `no`");
        const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 10000 })
        collector.on('collect', message => {
            if(message.content.toLowerCase() == "yes") {
                message.reply("Your reminder has been set. I will remind you in 5m.")
                setTimeout(() => {
                    message.reply("claim your bonus!")
                }, 300000)
            } else return
        })
    },
};
