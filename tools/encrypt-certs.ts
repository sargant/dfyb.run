import { randomBytes } from 'crypto'
import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

import { encrypt } from '@/lib/encryption'

const certPaths = {
  wwdr: 'wwdr.pem',
  signerKey: 'pass.run.dfyb.key',
  signerCert: 'signerCert.pem'
}

const key = randomBytes(32)

const encodedCerts: Record<string, string> = {}

for (const [name, path] of Object.entries(certPaths)) {
  const fileContents = readFileSync(join(__dirname, path))
  encodedCerts[name] = encrypt(fileContents, key).data
}

writeFileSync(join(__dirname, '..', 'certs.enc.json'), JSON.stringify(encodedCerts, null, 2))

console.log('Successfully encrypted to ../certs.enc.json')
console.log('The following encryption key will only be shown once - make sure to copy it')
console.log('Key: ' + key.toString('base64'))
