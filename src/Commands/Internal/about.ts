import { SlashCommandBuilder } from '@discordjs/builders'
import { MessageEmbed } from 'discord.js'
import type { CommandInteraction } from 'discord.js'
import type { Command } from '../../Types/Command'
import type { Bot } from '../../Structures/Client'

const About: Command = {
  data: new SlashCommandBuilder()
    .setName('about')
    .setDescription('Shows info about the bot.'),

  async run (Client: Bot, Interaction: CommandInteraction): Promise<void> {
    const embed = new MessageEmbed()
      .setColor('BLURPLE')
      .setTitle('Hi! I\'m **Eider**. A fully free and open source Discord bot.')
      .setDescription('I\'m a Discord Bot made by [CallMeEcho#0253](https://discord.com/users/379035005231300608), built with [Node.js](https://nodejs.org) and [Discord.js v13](https://discord.js.org).\n')
      .setThumbnail('https://cdn.discordapp.com/attachments/858855894204678206/874231112686247956/eider-animate.gif')
      .addField('Note', '**This bot is *very* early in development. Please report bugs by sending a dm to CallMeEcho#0253**')
    await Interaction.reply({ embeds: [embed] })
  }
}

module.exports = About
