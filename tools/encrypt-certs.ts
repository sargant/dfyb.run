import { readFileSync, writeFileSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import { encrypt } from '../lib/encryption.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

let output = ''

const wwdr = readFileSync(join(__dirname, 'wwdr.pem'))
const wwdrEncrypted = encrypt(wwdr)
const key = wwdrEncrypted.key
output += `export const wwdr = '${wwdrEncrypted.data}'\n`

const signerCert = readFileSync(join(__dirname, 'signerCert.pem'))
const signerCertEncrypted = encrypt(signerCert, key)
output += `export const signerCert = '${signerCertEncrypted.data}'\n`

const signerKey = readFileSync(join(__dirname, 'pass.run.dfyb.key'))
const signerKeyEncrypted = encrypt(signerKey, key)
output += `export const signerKey = '${signerKeyEncrypted.data}'\n`

writeFileSync(join(__dirname, '..', 'api', 'certs.enc.js'), output)

console.log('Successfully encrypted to /pass-models/certs.enc.json')
console.log('The following encryption key will only be shown once - make sure to copy it')
console.log(`Key: ${key.toString('base64')}`)
