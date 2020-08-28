module.exports = {
  name: 'ping',
  description: '...',
  aliases: ['ping'],
  guildOnly: true,
  async execute(message, args) {
    let output = '';
    let pong = await message.channel.send('`Pinging...`', message);

    const synusLatency = `${pong.createdTimestamp - message.createdTimestamp}ms`;

    output += `\`Synus latency: ${synusLatency}\`  `;

    pong.edit(output);
  }
}