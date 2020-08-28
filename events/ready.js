const Duels = require('../../../models/Duels')

const { Sync } = require('../db/sync')

module.exports = async client => {
    Sync()
    await Duels.destroy({ where: { Accept: true } })

    console.log(`${process.env.NAMEBOT} en marcha`)

    client.user.setActivity(`${process.env.PREFIX}help | ${client.guilds.cache.size} servidores`)
}