import { readFileSync } from 'fs'
import { join } from 'path'
import { decrypt } from './encryption'

export default (decryptionKey) => {
  const wwdr = readFileSync(join(__dirname, 'wwdr.pem'))
  const signerCert = readFileSync(join(__dirname, 'signerCert.pem'))
  const signerKey = decrypt(decryptionKey, readFileSync(join(__dirname, 'pass.run.dfyb.key.enc')))
  return {
    wwdr,
    signerCert,
    signerKey
  }
}
