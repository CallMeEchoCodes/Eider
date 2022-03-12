import Uwuifier from 'uwuifier'
import { SlashCommandBuilder } from '@discordjs/builders'
import { MessageEmbed } from 'discord.js'
import type { CommandInteraction } from 'discord.js'
import type { Command } from '../../Types/Command'
import type { Bot } from '../../Structures/Client'

const Uwuify: Command = {
  data: new SlashCommandBuilder()
    .setName('uwuify')
    .setDescription('Uwuify some text')
    .addStringOption(option =>
      option.setName('text')
        .setDescription('The text to uwuify')
        .setRequired(true)
    ),

  async run (Client: Bot, Interaction: CommandInteraction): Promise<void> {
    const uwuifier = new Uwuifier()

    const uwuified = uwuifier.uwuifySentence(Interaction.options.getString('text'))
    const embed = new MessageEmbed()
      .setColor('BLUE')
      .setDescription(uwuified)
    Interaction.reply({ embeds: [embed] })
  }
}

module.exports = Uwuify
