const Command = require('../../Structures/Command')
const { get } = require('axios')
const { MessageEmbed } = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders')

class Meme extends Command {
  constructor (client) {
    const commandBuilder = new SlashCommandBuilder()
      .setName('meme')
      .setDescription('Replies with a random meme from r/dankmemes.')
    super(client, commandBuilder)

    this.data = commandBuilder
  }

  async run (client, interaction) {
    let res = await get('https://Reddit.com/r/memes/random.json')

    if (await res.data[0].data.children[0].data.over_18 === true) res = await get('https://Reddit.com/r/dankmemes/random.json')

    const embed = new MessageEmbed()
      .setColor('RANDOM')
      .setTitle(`${await res.data[0].data.children[0].data.title}`)
      .setImage(`${await res.data[0].data.children[0].data.url}`)
      .setFooter(`Author: u/${await res.data[0].data.children[0].data.author}`)
      .setURL(`https://reddit.com${await res.data[0].data.children[0].data.permalink}`)
    await interaction.reply({ embeds: [embed] })
  }
}

module.exports = Meme

// axios.get('https://Reddit.com/r/memes/random.json')
