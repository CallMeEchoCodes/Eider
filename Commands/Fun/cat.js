const Command = require('../../Structures/Command')
const { get } = require('axios')
const { MessageEmbed } = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders')

class Cat extends Command {
  constructor (client) {
    const commandBuilder = new SlashCommandBuilder()
      .setName('cat')
      .setDescription('Replies with an adorable cat 😺!')
    super(client, commandBuilder)

    this.data = commandBuilder
  }

  async run (client, interaction) {
    const res = await get('https://aws.random.cat/meow')

    const embed = new MessageEmbed()
      .setColor('RANDOM')
      .setTitle('Meow! Here\'s your adorable cat picture 🐱.')
      .setImage(`${await res.data.file}`)
    await interaction.reply({ embeds: [embed] })
  }
}

module.exports = Cat
