import mysql from 'mysql'
import { Bot } from './Client'

export class Database {
  database: mysql.Pool

  constructor (Client: Bot) {
    const con = mysql.createConnection({
      host: Client.config.sql.host,
      user: Client.config.sql.user,
      password: Client.config.sql.password
    })

    con.connect(err => {
      if (err) throw err
      Client.Logger.info('Connected To Database!')
      con.query(`CREATE DATABASE IF NOT EXISTS ${Client.config.sql.database}`, err => {
        if (err) throw err
        Client.Logger.info('Database Initialized!')
      })
    })

    this.database = mysql.createPool({
      host: Client.config.sql.host,
      user: Client.config.sql.user,
      password: Client.config.sql.password,
      database: Client.config.sql.database
    })
  }

  public async query (query: string): Promise<any> {
    return await new Promise((resolve, reject) => {
      this.database.query(query, (err, result) => {
        if (err) reject(err)
        resolve(result)
      })
    })
  }

  public async createTable (table: string, columns: string[]): Promise<void> {
    const query = `CREATE TABLE IF NOT EXISTS ${table} (${columns.join(',' + ' ')})`
    this.query(query)
  }

  public async insert (table: string, columns: string[], values: any[]): Promise<void> {
    const query = `INSERT INTO ${table} (${columns.join(', ')}) VALUES (${values.join(', ')})`
    await this.query(query)
  }

  public async selectColumnAll (table: string, column: string): Promise<any> {
    const query = `SELECT ${column} FROM ${table}`
    const data = await this.query(query)
    return data
  }
}
