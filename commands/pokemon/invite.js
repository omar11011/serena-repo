const linkfooter = 'https://discord.gg/P3nxWuc'
const {
  Embed
} = require('../../utils/embed')
module.exports = {
	name: 'invite',
    description: 'Invite user',
    aliases: ['invite'],
    guildOnly: true,
	async execute(message, args) {
    sendInvite(message)
  },
};

const sendInvite = (message) => {
  Embed(message, 'Invite me!', `[Join to the official server](${linkfooter})\n[Invite me to your server!](${process.env.INVITE})`,'https://media0.giphy.com/media/13G7hmmFr9yuxG/source.gif',)
}