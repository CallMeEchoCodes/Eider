import { PresenceData } from 'discord.js'

export type config = {
  token: string
  clientID: string
  guildID: string
  sql: {
    host: string
    user: string
    password: string
    database: string
  }
  presence: PresenceData
  apodToken?: string
}
