const Discord = require('discord.js');
module.exports = {
	name: 'ping',
	description: 'See the bots ping.',
	cooldown: '5',
	aliases: ['latency', 'pong'],
	async execute(client, message) {
		message.channel.send('**The Ping-inator!**\nPinging...').then((msg) => {
			const ping = msg.createdTimestamp - message.createdTimestamp;
			const embed = new Discord.MessageEmbed()
				.setColor('RANDOM')
				.setTitle('Pong!')
				.setDescription(`The bots ping is ${ping}ms.`);
			message.channel.send(embed);
			msg.delete();
		});
	},
};
