import { SlashCommandBuilder } from '@discordjs/builders'
import { MessageEmbed } from 'discord.js'
import axios from 'axios'
import type { CommandInteraction } from 'discord.js'
import type { Command } from '../../Types/Command'
import type { Bot } from '../../Structures/Client'

const Dog: Command = {
  data: new SlashCommandBuilder()
    .setName('dog')
    .setDescription('Replies with an adorable dog 🐶!'),

  async run (Client: Bot, Interaction: CommandInteraction): Promise<void> {
    type DogObj = {
      message: string
      status: string
    }

    const { data } = await axios.get('https://dog.ceo/api/breeds/image/random')
    const res = data as DogObj

    if (res.message === undefined) return await Interaction.reply({ content: 'There was an error while executing that command!', ephemeral: true })

    const embed = new MessageEmbed()
      .setColor('RANDOM')
      .setTitle('Woof! Here\'s your adorable dog picture 🐶.')
      .setImage(`${res.message}`)
    await Interaction.reply({ embeds: [embed] })
  }
}

module.exports = Dog
