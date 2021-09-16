const Command = require('../../Structures/Command')
const { MessageEmbed } = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders')

class About extends Command {
  constructor (client) {
    const commandBuilder = new SlashCommandBuilder()
      .setName('about')
      .setDescription('Shows info about the bot.')
    super(client, commandBuilder)

    this.data = commandBuilder
  }

  async run (client, interaction) {
    const embed = new MessageEmbed()
      .setColor('BLURPLE')
      .setTitle('Hi! I\'m **Eider**. A fully free and open source Discord bot.')
      .setDescription('I\'m a Discord Bot made by CallMeEcho#0253, built with [Node.js](https://nodejs.org) and [Discord.js v13](https://discord.js.org).\n')
      .setThumbnail('https://cdn.discordapp.com/attachments/858855894204678206/874231112686247956/eider-animate.gif')
      .addField('Note', '**This bot is *very* early in development. Please report bugs by sending a dm to CallMeEcho#0253**')
    await interaction.reply({ embeds: [embed] })
  }
}

module.exports = About
