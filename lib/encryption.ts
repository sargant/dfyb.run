import crypto from 'crypto'

const algorithm = 'aes-256-cbc'

export const encrypt = (message: Buffer, key = crypto.randomBytes(32)) => {
  const encoding = 'base64'
  const iv = crypto.randomBytes(16)
  const cipher = crypto.createCipheriv(algorithm, key, iv)
  const encryptedData = Buffer.concat([cipher.update(message), cipher.final()])
  const data = `${encoding}:${iv.toString(encoding)}:${encryptedData.toString(encoding)}`
  return { key: key.toString('base64'), data }
}

export const decrypt = (data: string, key: string) => {
  const [encoding, iv, message] = data.split(':', 3) as [crypto.Encoding, string, string]
  const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key, 'base64'), Buffer.from(iv, encoding))
  return Buffer.concat([decipher.update(message, encoding), decipher.final()])
}
