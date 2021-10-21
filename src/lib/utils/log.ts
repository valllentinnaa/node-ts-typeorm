import chalk from 'chalk'

const styles = {
  log: chalk.bold,
  info: chalk.bold.blue,
  error: chalk.bold.red,
  warn: chalk.bold.yellow,
  success: chalk.bold.green,
}

export default {
  log(message: string, ...args: any) {
    console.log(styles.log(` 💡  ${message}`, ...args))
  },

  info(message: string, ...args: any) {
    console.log(styles.info(` ℹ️  ${message}`, ...args))
  },

  error(err: any, stack = false, ...args: any) {
    console.log(styles.error(` ❗  ${err}`, ...args))
    if (stack && err.stack)
      console.log(styles.error(` ❗ ${err.stack}`, ...args))
  },

  warn(message: string, ...args: any) {
    console.log(styles.warn(` ⚠️  ${message}`, ...args))
  },

  success(message: string, ...args: any) {
    console.log(styles.success(` ✅  ${message}`, ...args))
  },
}
