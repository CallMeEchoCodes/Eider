const Command = require('../../Structures/Command')
const { get } = require('axios')
const { MessageEmbed } = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders')

class Dog extends Command {
  constructor (client) {
    const commandBuilder = new SlashCommandBuilder()
      .setName('dog')
      .setDescription('Replies with an adorable dog 🐶!')
    super(client, commandBuilder)

    this.data = commandBuilder
  }

  async run (client, interaction) {
    const res = await get('https://dog.ceo/api/breeds/image/random')

    console.log(res.data)
    const embed = new MessageEmbed()
      .setColor('RANDOM')
      .setTitle('Woof! Here\'s your adorable dog picture 🐶.')
      .setImage(`${res.data.message}`)
    await interaction.reply({ embeds: [embed] })
  }
}

module.exports = Dog
