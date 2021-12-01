const { randomBytes } = require("crypto")
const { readFileSync, writeFileSync } = require("fs");
const { join } = require("path");
const { encrypt } = require('../utils/encryption')

const certPaths = {
  wwdr: 'wwdr.pem',
  signerKey: 'pass.run.dfyb.key',
  signerCert: 'signerCert.pem'
}

const key = randomBytes(32)

const encodedCerts = {}

for (const [name, path] of Object.entries(certPaths)) {
  const fileContents = readFileSync(join(__dirname, path))
  encodedCerts[name] = encrypt(fileContents, key).data
}

writeFileSync(join(__dirname, '..', 'certs.enc.json'), JSON.stringify(encodedCerts, null, 2))

console.log('Successfully encrypted to ../certs.enc.json')
console.log('The following encryption key will only be shown once - make sure to copy it')
console.log("Key: " + key.toString('base64'))
