const Guilds = require('../../../models/Guilds')

module.exports = async (client, guild) => {

    client.user.setActivity(`${process.env.PREFIX}help | ${client.guilds.cache.size} servers`)

    try {
        await Guilds.create({ Guild: guild.id })
        console.log(`Servidor ${guild.id} añadido.`)
    } catch (error) {
        console.log(error)
    }
}