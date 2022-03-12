import { SlashCommandBuilder } from '@discordjs/builders'
import { ColorResolvable, MessageEmbed } from 'discord.js'
import type { CommandInteraction } from 'discord.js'
import type { Command } from '../../Types/Command'
import type { Bot } from '../../Structures/Client'
import Vibrant from 'node-vibrant'

const Jumbo: Command = {
  data: new SlashCommandBuilder()
    .setName('jumbo')
    .setDescription('Enlarge an emoji')
    .addStringOption(option =>
      option.setName('emoji')
        .setDescription('The emoji to enlarge')
        .setRequired(true)
    ),

  async run (Client: Bot, Interaction: CommandInteraction): Promise<void> {
    const msg = Interaction.options.getString('emoji')
    if (/<:.+:(\d+)>/gm.exec(msg) === null || undefined) return await Interaction.reply({ content: 'That emoji is invalid! It might be a Unicode emoji or an external/animated emoji that you don\'t have access to.', ephemeral: true })
    const url = 'https://cdn.discordapp.com/emojis/' + /<:.+:(\d+)>/gm.exec(msg)[1] + '.png?v=1'
    if (url) {
      const color = await Vibrant.from(url).getPalette()
      const embed = new MessageEmbed()
        .setColor(color.Vibrant.hex as ColorResolvable)
        .setImage(url)
      return await Interaction.reply({ embeds: [embed] })
    } if (!url) {
      return await Interaction.reply({ content: 'That emoji is invalid! It might be a Unicode emoji or an external/animated emoji that you don\'t have access to.', ephemeral: true })
    }
  }
}

module.exports = Jumbo
