const { MessageEmbed, Permissions } = require('discord.js');

module.exports = {
	name: 'prefix',
	description: 'Set this guilds prefix',
	cooldown: 10,
	permissions: [ Permissions.FLAGS.ADMINISTRATOR ],
	aliases: [ 'setprefix', 'guildprefix' ],
	args: true,
	guildOnly: true,
	async execute(client, message, args) {
		client.data.set(`guild.${message.guild.id}.prefix`, args[0]);
		const embed = new MessageEmbed()
			.setColor('#00B300')
			.setTitle('Success!')
			.setDescription(`My prefix is now \`${client.data.get(`guild.${message.guild.id}.prefix`)}\` `);
		message.channel.send({ embeds: [embed] });
	},
};