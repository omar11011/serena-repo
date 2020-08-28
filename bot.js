const fs = require('fs')
const discord = require('discord.js')
const express = require('express')
const env = require('node-env-file')
env(__dirname + '/.env')

const Trainers = require('../../models/Trainers')

const client = new discord.Client()
const cooldowns = new discord.Collection()
client.commands = new discord.Collection()

const modules = ['pokemon', 'reaction', 'interaction', 'security', 'social', 'admin', 'roles', 'info', 'refs', 'pet', 'contest', 'duels', 'trade', 'ranking', 'rewards']

modules.forEach(c => {
    fs.readdir(`./commands/${c}/`, (err, files) => {
        if(err) throw err
        console.log(`[${process.env.NAMEBOT}] Cargando ${files.length} comandos del módulo ${c}`)
        files.forEach(f => {
            const command = require(`./commands/${c}/${f}`)
            client.commands.set(command.name, command)
        })
    })
})

fs.readdir(`./events/`, (err, files) => {
    if(err) return console.log(err)
    files.forEach(f => {
        const event = require(`./events/${f}`)
        const eventName = f.split(".")[0]
        client.on(eventName, event.bind(null, client))
    })
})

client.on("userUpdate", async (oldUser, newUser) => {
    const trainer = await Trainers.findOne({ where: { User: oldUser.id }, attributes: ['User', 'Name'] })

    if(trainer && oldUser.username !== newUser.username) {
        await Trainers.update({ Name: newUser.username }, { where: { User: oldUser.id } })
    }
})

client.login(process.env.TOKEN)

const app = express();
const {getAll, getUserById} = require('./api/lib/users.lib')

app.get('/api/v1/users', getAll)
app.get('/api/v1/users/:id',() => {
    console.log('Example app listening on port 3000!')
})

module.exports = cooldowns