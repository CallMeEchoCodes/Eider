const Discord = require('discord.js');
const fs = require('fs');

module.exports = {
	name: 'help',
	description: 'See all of the bots commands',
	async execute(client, message, args) {
		if (!args[0]) {
			const helpEmbed = new Discord.MessageEmbed()
				.setTitle('Help Menu')
				.setDescription(`Showing directory *\`./commands/\`*\n\n***${fs.readdirSync('./commands/').join('\n')}***`)
				.setThumbnail(`https://github.com/llsc12/Aquacious/raw/main/aicon.gif`)
				.setColor('BLUE')
				.setFooter('Aquacious','https://github.com/llsc12/Aquacious/raw/main/aicon.gif')
		}
	},
};
