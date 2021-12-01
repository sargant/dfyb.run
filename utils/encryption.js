const crypto = require("crypto");

const algorithm = "aes-256-cbc";

const encrypt = (message, key = crypto.randomBytes(32)) => {
  const encoding = 'base64'
  const iv = crypto.randomBytes(16)
  const cipher = crypto.createCipheriv(algorithm, key, iv)
  const encryptedData = Buffer.concat([cipher.update(message), cipher.final()])
  const data = `${encoding}:${iv.toString(encoding)}:${encryptedData.toString(encoding)}`
  return { key: key.toString('base64'), data }
}

const decrypt = (data, key) => {
  const [encoding, iv, message] = data.toString('utf8').split(":", 3)
  const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key, 'base64'), Buffer.from(iv, encoding))
  return Buffer.concat([decipher.update(message, encoding), decipher.final()])
}

module.exports = { encrypt, decrypt }
