import { SlashCommandBuilder } from '@discordjs/builders'
import { MessageActionRow, MessageButton, MessageEmbed } from 'discord.js'
import type { CommandInteraction } from 'discord.js'
import type { Command } from '../../Types/Command'
import type { Bot } from '../../Structures/Client'
import axios from 'axios'

const APOD: Command = {
  data: new SlashCommandBuilder()
    .setName('apod')
    .setDescription('Get the NASA Astronomy Picture of the Day'),

  async run (Client: Bot, Interaction: CommandInteraction): Promise<void> {
    type apodResponse = {
      copyright: string
      date: string
      explanation: string
      hdurl: string
      media_type: string
      service_version: string
      title: string
      url: string
    }

    let apikey = Client.config.apodToken
    if (apikey === undefined) { apikey = 'DEMO_KEY' }
    const { data } = await axios.get('https://api.nasa.gov/planetary/apod?api_key=' + apikey)
    const res = data as apodResponse
    let hdurl = res.hdurl
    if (hdurl === undefined) {
      hdurl = 'https://404.github.com'
    }
    const embed = new MessageEmbed()
      .setColor('#105BD8')
      .setTimestamp()
      .setTitle(res.title)
      .setImage(res.url)
      .setDescription(res.explanation)
      .setURL(res.url)
    const row = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setStyle('LINK')
          .setURL(hdurl)
          .setLabel('View Full Image')
      )
    Interaction.reply({ embeds: [embed], components: [row] })
      .catch(function (error) {
        console.log(error)
        Interaction.reply('There was an error loading the image. Please try again later.')
      })
  }
}

module.exports = APOD
