import { SlashCommandBuilder } from '@discordjs/builders'
import type { CommandInteraction } from 'discord.js'
import type { Command } from '../../Types/Command'
import type { Bot } from '../../Structures/Client'

const Coinflip: Command = {
  data: new SlashCommandBuilder()
    .setName('flipacoin')
    .setDescription('Flips a coin!'),

  async run (Client: Bot, Interaction: CommandInteraction): Promise<void> {
    const flip = ['heads', 'tails']
    const result = flip[Math.floor(Math.random() * flip.length)]

    await Interaction.reply(`It's ${result}!`)
  }
}

module.exports = Coinflip
