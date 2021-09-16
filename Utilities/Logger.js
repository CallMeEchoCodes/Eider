const chalk = require('chalk')
const moment = require('moment')

module.exports.Logger = class Logger {
  /**
   * A Basic Logger
   * @param {String} content - The text to log
   * @param {String} type    - The type of output
  */
  static log (content, type) {
    const timestamp = chalk.gray(moment().format('kk:mm:ss'))
    switch (type) {
      case 'debug': console.log(`${timestamp} ${chalk.blueBright('DEBUG')} ${content}`)
        break
      case 'info': console.log(`${timestamp} ${chalk.green('INFO')} ${content}`)
        break
      case 'warn': console.warn(`${timestamp} ${chalk.yellow('WARN')} ${content}`)
        break
      case 'error': console.error(`${timestamp} ${chalk.bgRed('ERROR')} ${content}`)
        break
      default: console.log(`${timestamp} ${chalk.blueBright('DEBUG')} ${content}`)
        break
    }
  }
}
