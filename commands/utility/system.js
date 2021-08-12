/* eslint-disable max-nested-callbacks */
const Discord = require('discord.js');
const si = require('systeminformation');
const nodeOS = require('os');
module.exports = {
	name: 'system',
	aliases: [ 'systeminfo', 'sysinfo', 'sysstat', 'sysstats' ],
	cooldown: 20,
	description: 'Get information of the bot process and server hardware',
	async execute(client, message) {
		function convToDays(totalSeconds) {
			const days = Math.floor(totalSeconds / 86400);
			totalSeconds %= 86400;
			const hours = Math.floor(totalSeconds / 3600);
			totalSeconds %= 3600;
			const minutes = Math.floor(totalSeconds / 60);
			const seconds = Math.floor(totalSeconds % 60);
			const daysText = (days == 1 ? 'day' : 'days');
			const hoursText = (hours == 1 ? 'hour' : 'hours');
			const minutesText = (minutes == 1 ? 'minute' : 'minutes');
			const daysFinal = (days >= 1 ? days + ' ' + daysText + ', ' : '');
			const hoursFinal = (hours >= 1 ? hours + ' ' + hoursText + ', ' : '');
			const minutesFinal = (minutes >= 1 ? minutes + ' ' + minutesText + ' and ' : '');
			const finished = `${daysFinal}${hoursFinal}${minutesFinal}${seconds} seconds`;
			return finished;
		}
		const sysmsg = await message.channel.send('Getting information...');
		si.cpu()
			.then(cpu => {
				si.mem()
					.then(mem => {
						si.osInfo()
							.then(os => {
								si.cpuTemperature()
									.then(temp => {
										si.currentLoad()
											.then(load => {
												const totalSeconds = (client.uptime / 1000);
												const uptime = convToDays(totalSeconds);
												const embed = new Discord.MessageEmbed()
													.setColor('RANDOM')
													.setTitle(`System & Process Information for ${client.user.username}`)
													.setURL('https://discord.gg/fNPn8wa6J7')
													.setTimestamp()
													.setFooter('Requested by ' + message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
													.addField('Process Information', `**Uptime** \n${uptime} \n**Serving** \n${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)} members \n**Running** \n${process.release.name} ${process.version}`)
													.addField('System Information', `**Device Hostname** \n${os.hostname} \n**CPU** \n${cpu.cores} Core ${cpu.manufacturer} ${cpu.brand}@${cpu.speed}GHz ${process.config.variables.host_arch} \n**General CPU Load** \n${load.avgLoad}% \nCurrently ${temp.main}°c \n**Device Uptime** \n${convToDays(nodeOS.uptime())} \n**Memory** \nTotal Memory: ${(mem.total / 1000000000).toFixed(2)}GB \nUsed Memory: ${(mem.used / 1000000000).toFixed(2)}GB \nFree Memory: ${(mem.free / 1000000000).toFixed(2)}GB \n**Operating System** \n${os.distro} ${os.release} ${os.arch}`);
												sysmsg.delete();
												message.channel.send({ embeds: [embed] });
											});
									});
							});
					});
			});
	},
};