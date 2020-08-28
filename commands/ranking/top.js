module.exports = {
	name: 'top',
    description: 'Top por región.',
    aliases: ['top'],
    guildOnly: true,
	async execute(message, args) {
        const Trainers = require('../../../../models/Trainers')
        const Regions = require('../../../../models/Regions')

        const { Transform } = require('../../utils/transform')
        const { Embed } = require('../../utils/embed')

        const trainer = await Trainers.findOne({ where: { User: message.author.id }, attributes: ['Region'] })
        if(!trainer) return message.reply(`you are not yet registered as a pokémon trainer.`)

        let region
        
        if(args[0]) {
            region = Transform(args[0])

            const filter = await Regions.findOne({ where: { Region: region }, attributes: ['Region'] })
            if(!filter) return message.reply(`the region you are looking for does not exist or is not yet available.`)
            
        } else {
            if(!trainer.Region) return message.reply(`you have not chosen a region yet.`)
            region = trainer.Region
        }

        const positions = await Trainers.findAll({ where: { Region: region }, attributes: ['User', 'Name', 'Cups'], order: [ ['Cups', 'DESC'] ] })

        const all = []
        let list = []
        let end = 20
        if(positions.length < end) end = positions.length

        for(let i = 0; i < positions.length; i++) {
            all.push(positions[i].User)
        }

        for(let i = 0; i < end; i++) {
            let name = positions[i].User
            if(positions[i].Name) name = `**${positions[i].Name}**`

            list.push(`${i + 1}. ${name} | ${positions[i].Cups} Points`)
        }

        let myposition = all.indexOf(message.author.id) + 1
        let footer = `Your position is ${myposition}/${all.length}`
        if(myposition == 0) footer = ''

        Embed(message, `${region} Ranking: Top 20`, list.join("\n"), '', footer)
	},
};