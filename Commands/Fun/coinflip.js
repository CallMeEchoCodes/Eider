const Command = require('../../Structures/Command')
const { SlashCommandBuilder } = require('@discordjs/builders')

class Coinflip extends Command {
  constructor (client) {
    const commandBuilder = new SlashCommandBuilder()
      .setName('coinflip')
      .setDescription('Flips a coin!')
    super(client, commandBuilder)

    this.data = commandBuilder
  }

  async run (client, interaction) {
    const flip = ['heads', 'tails']
    const result = flip[Math.floor(Math.random() * flip.length)]

    await interaction.reply(`It's ${result}!`)
  }
}

module.exports = Coinflip
