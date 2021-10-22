import { SlashCommandBuilder } from '@discordjs/builders'
import { MessageEmbed } from 'discord.js'
import axios from 'axios'
import type { CommandInteraction } from 'discord.js'
import type { Command } from '../../Types/Command'
import type { Bot } from '../../Structures/Client'

const Cat: Command = {
  data: new SlashCommandBuilder()
    .setName('cat')
    .setDescription('Replies with an adorable cat 😺!'),
  guildonly: false,
  cooldown: 5,
  permissions: [],

  async run (Client: Bot, Interaction: CommandInteraction): Promise<void> {
    type CatObj = {
      file: string
    }

    const { data } = await axios.get('https://aws.random.cat/meow')
    const res = data as CatObj

    const embed = new MessageEmbed()
      .setColor('RANDOM')
      .setTitle('Meow! Here\'s your adorable cat picture 🐱.')
      .setImage(`${res.file}`)
    await Interaction.reply({ embeds: [embed] })
  }
}

module.exports = Cat