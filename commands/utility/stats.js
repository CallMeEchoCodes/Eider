module.exports = {
	name: 'stats',
	description: 'Show bot stats.',
	async execute(client, message) {
		const embed = {
			color: 'BLURPLE',
			title: 'Hi! I\'m Eider.',
			thumbnail: {
				url: 'https://i.imgur.com/Z73PC8h.gif',
			},
			fields: [
				{
					name: 'Servers I\'m In',
					value: `${client.guilds.cache.size}`,
					inline: true,
				},
				{
					name: 'Members I\'m Serving',
					value: `${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)}`,
					inline: true,
				},
				{
					name: 'Members in this guild',
					value: `${message.guild.memberCount}`,
					inline: true,
				},
				{
					name: 'Total Received Messages',
					value: `${client.data.get('msgCounterTotal')}`,
					inline: true,
				},
				{
					name: 'Total Received Commands',
					value: `${client.data.get('cmdCounterTotal')}`,
					inline: true,
				},
			],
			footer: {
				text: 'Last Refreshed',
			},
			timestamp: new Date(),
		};
		message.channel.send({ embeds: [embed] });
	},
};