import { SlashCommandBuilder } from '@discordjs/builders'
import { MessageEmbed } from 'discord.js'
import type { CommandInteraction } from 'discord.js'
import type { Command } from '../../Types/Command'
import type { Bot } from '../../Structures/Client'

const Ping: Command = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('See the bots latency.'),

  async run (Client: Bot, Interaction: CommandInteraction): Promise<void> {
    const embed = new MessageEmbed()
      .setColor('RANDOM')
      .setTitle('Pong!')
      .setDescription(`The bots ping is ${Client.ws.ping}ms.`)
    await Interaction.reply({ embeds: [embed] })
  }
}

module.exports = Ping
