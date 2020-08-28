module.exports = {
	name: 'region',
    description: 'Elegir una región para explorar.',
    aliases: ['region'],
    guildOnly: true,
	async execute(message, args) {
        const Trainers = require('../../../../models/Trainers')
        const Regions = require('../../../../models/Regions')

        const { Embed } = require('../../utils/embed')
        const { Capitalize } = require('../../utils/capitalize')

        const user = await Trainers.findOne({ 
            where: { User: message.author.id },
            attributes: ['ID', 'Region'],
        })
        const regions = await Regions.findAll({
            attributes: ['Region'],
        })
        const list = () => {
            let regionlist = []
            for(let i = 0; i < regions.length; i++) {
                regionlist.push('``' + regions[i].Region +'`` ')
            }
            let cadena = regionlist.join(" | ")
            return cadena
        }
        const Info = () => {
            Embed(message, 'Choose your destination', `Available regions: ${list()}\n\nChoose one with ` + '``' + process.env.PREFIX + 'region [Region]``')
            return
        }

        if(!user) return
        if(user.Region) return message.reply(`you are already exploring the **${user.Region}** region`)
        if(!args[0]) {
            Info()
            return
        }

        const region = await Regions.findOne({
            where: { Region: Capitalize(args[0]) },
            attributes: ['Region'],
        })
        if(!region) {
            Info()
            return
        }

        await Trainers.update({ Region: region.Region }, { where: { User: message.author.id } })
        message.author.send(`Hello again ${message.author.tag}! I let you know that the region you chose will be useful for you to participate in the pokémon league by completing your 8 medals.`)
        Embed(message, `Traveling to ${region.Region}`, 'Your journey has started, now you must choose your initial pokémon with ``' + process.env.PREFIX + 'pick``')
	},
};