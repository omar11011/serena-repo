const Guilds = require('../../../models/Guilds')

module.exports = async (client, guild) => {
    client.user.setActivity(`${process.env.PREFIX}help | ${client.guilds.cache.size} servidores`)

    await Guilds.destroy({ where: { Guild: guild.id } })

    console.log(`Servidor ${guild.id} eliminado.`)
}