import { SlashCommandBuilder } from '@discordjs/builders'
import { MessageEmbed } from 'discord.js'
import nodeOS from 'os'
import si from 'systeminformation'
import type { CommandInteraction } from 'discord.js'
import type { Command } from '../../Types/Command'
import type { Bot } from '../../Structures/Client'

const Ping: Command = {
  data: new SlashCommandBuilder()
    .setName('system')
    .setDescription('See the hardware the bot is running on.'),

  async run (Client: Bot, Interaction: CommandInteraction): Promise<void> {
    function convToDays (totalSeconds: number): string {
      const days = Math.floor(totalSeconds / 86400)
      totalSeconds %= 86400
      const hours = Math.floor(totalSeconds / 3600)
      totalSeconds %= 3600
      const minutes = Math.floor(totalSeconds / 60)
      const seconds = Math.floor(totalSeconds % 60)
      const daysText = (days === 1 ? 'day' : 'days')
      const hoursText = (hours === 1 ? 'hour' : 'hours')
      const minutesText = (minutes === 1 ? 'minute' : 'minutes')
      const daysFinal = (days >= 1 ? days + ' ' + daysText + ', ' : '')
      const hoursFinal = (hours >= 1 ? hours + ' ' + hoursText + ', ' : '')
      const minutesFinal = (minutes >= 1 ? minutes + ' ' + minutesText + ' and ' : '')
      const finished = `${daysFinal}${hoursFinal}${minutesFinal}${seconds} seconds`
      return finished
    }
    Interaction.deferReply()
    si.cpu()
      .then(cpu => {
        si.mem()
          .then(mem => {
            si.osInfo()
              .then(os => {
                si.currentLoad()
                  .then(load => {
                    const totalSeconds = (Client.uptime / 1000)
                    const uptime = convToDays(totalSeconds)
                    const embed = new MessageEmbed()
                      .setColor('GREEN')
                      .setTitle(`System & Process Information for ${Client.user.username}`)
                      .setURL('https://discord.gg/fNPn8wa6J7')
                      .setTimestamp()
                      .addField('Process Information', `**Uptime** \n${uptime} \n**Serving** \n${Client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)} members \n**Running** \n${process.release.name} ${process.version}`)
                      .addField('System Information', `**Device Hostname** \n${os.hostname} \n**CPU** \n${cpu.cores} Core ${cpu.manufacturer} ${cpu.brand}@${cpu.speed}GHz ${process.config.variables.host_arch} \n**General CPU Load** \n${load.avgLoad}% \n**Device Uptime** \n${convToDays(nodeOS.uptime())} \n**Memory** \nTotal Memory: ${(mem.total / 1000000000).toFixed(2)}GB \nUsed Memory: ${(mem.used / 1000000000).toFixed(2)}GB \nFree Memory: ${(mem.free / 1000000000).toFixed(2)}GB \n**Operating System** \n${os.distro} ${os.release} ${os.arch}`)
                    Interaction.editReply({ embeds: [embed] })
                  })
              })
          })
      })
  }
}

module.exports = Ping
