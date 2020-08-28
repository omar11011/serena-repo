const { UserFlags } = require('discord.js')

module.exports = {
	name: 'time',
    description: 'Tiempo en pokémon',
    aliases: ['tiempo'],
    guildOnly: true,
	execute(message, args) {
        const { EmbedColor } = require('../../utils/embedcolor')

        let time = new Date()

        let moment = 'Day'
        let emoji = ':sunny:'
        let abrev = 'AM'

        if(time.getHours() < 18) {
            if(time.getHours() >= 6) {
                if(time.getHours() >= 12) emoji = ':sunny:', abrev = 'PM'
                else abrev = 'AM'
            }
            else abrev = 'AM', emoji = ':full_moon:'
        }
        else if(time.getHours() >= 18 && time.getHours() < 19) moment = 'Sunset', emoji = ':city_sunset:', abrev = 'PM'
        else if(time.getHours() > 19) moment = 'Night', emoji = ':full_moon:', abrev = 'PM'

        let hour = `${time.getHours()}:${time.getMinutes()}`

        EmbedColor(message, `Weather`, '', '', `${emoji} ${hour} ${abrev}`)
	},
};