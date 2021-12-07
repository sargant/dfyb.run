import {
  Encoding,
  randomBytes,
  createCipheriv,
  createDecipheriv
} from 'crypto'

const algorithm = 'aes-256-cbc'
const defaultEncoding: Encoding = 'base64'

export const encrypt = (message: Buffer, key = randomBytes(32)) => {
  const iv = randomBytes(16)
  const cipher = createCipheriv(algorithm, key, iv)
  const encryptedData = Buffer.concat([cipher.update(message), cipher.final()])
  const data = `${defaultEncoding}:${iv.toString(defaultEncoding)}:${encryptedData.toString(defaultEncoding)}`
  return { key: key.toString(defaultEncoding), data }
}

export const decrypt = ({ data, key }: ReturnType<typeof encrypt>) => {
  const [encoding, iv, message] = data.split(':', 3) as [Encoding, string, string]
  const decipher = createDecipheriv(algorithm, Buffer.from(key, defaultEncoding), Buffer.from(iv, encoding))
  return Buffer.concat([decipher.update(message, encoding), decipher.final()])
}
