const { readFileSync, writeFileSync } = require("fs");
const { join } = require("path");
const { encrypt } = require('./encryption')

const unencryptedKey = readFileSync(join(__dirname, '..', 'certs', 'pass.run.dfyb.key'))
const { key, data } = encrypt(unencryptedKey)
writeFileSync(join(__dirname, '..', 'certs', 'pass.run.dfyb.key.enc'), data)

console.log('Successfully encrypted')
console.log("Key: " + key)
