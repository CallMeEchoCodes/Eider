import { PresenceData } from 'discord.js'

export type config = {
  token: string
  clientID: string
  guildID: string
  presence: PresenceData
  production: boolean
  apodToken?: string
}
