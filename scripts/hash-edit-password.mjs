import { createHash } from 'node:crypto'
import readline from 'node:readline/promises'
import { stdin as input, stdout as output } from 'node:process'

const salt = process.env.VITE_EDIT_PASSWORD_SALT ?? 'cynthia-portfolio-v1'
const rl = readline.createInterface({ input, output })

const password = await rl.question('Edit mode password: ')
rl.close()

if (!password) {
  console.error('No password entered.')
  process.exit(1)
}

const hash = createHash('sha256').update(`${salt}:${password}`).digest('hex')
console.log('\nAdd this to .env.local:\n')
console.log(`VITE_EDIT_PASSWORD_HASH=${hash}`)
console.log(`VITE_EDIT_PASSWORD_SALT=${salt}`)
