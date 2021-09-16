const Command = require('../../Structures/Command')
const { MessageEmbed } = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders')

class Ping extends Command {
  constructor (client) {
    const commandBuilder = new SlashCommandBuilder()
      .setName('ping')
      .setDescription('Replies with the bots ping!')
    super(client, commandBuilder)

    this.data = commandBuilder
  }

  async run (client, interaction) {
    const embed = new MessageEmbed()
      .setColor('RANDOM')
      .setTitle('Pong!')
      .setDescription(`The bots ping is ${client.ws.ping}ms.`)
    await interaction.reply({ embeds: [embed] })
  }
}

module.exports = Ping
