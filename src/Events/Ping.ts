import { MessageEmbed } from 'discord.js'
import type { Message } from 'discord.js'
import type { Bot } from '../Structures/Client'
import type { Event } from '../Types/Event'

const Ping: Event = {
  trigger: 'messageCreate',
  type: 'on',
  async run (Client: Bot, message: Message): Promise<void> {
    if (message.mentions.has(Client.user)) {
      const embed = new MessageEmbed()
        .setColor('BLURPLE')
        .setTitle('Hi! I\'m **Eider**. A fully free and open source Discord bot.')
        .setDescription('I\'m a Discord Bot made by [CallMeEcho#0253](https://discord.com/users/379035005231300608), built with [Node.js](https://nodejs.org) and [Discord.js v13](https://discord.js.org).\n')
        .setThumbnail('https://cdn.discordapp.com/attachments/858855894204678206/874231112686247956/eider-animate.gif')
        .addField('Note', '**This bot is *very* early in development. Please report bugs by sending a dm to CallMeEcho#0253**')
      await message.reply({ embeds: [embed] })
    }
  }
}

module.exports = Ping
