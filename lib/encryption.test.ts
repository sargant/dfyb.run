import { encrypt, decrypt } from './encryption'

describe('encryption', () => {
  it('can encrypt and decrypt OK', () => {
    const testString = 'This is a test string'
    const encrypted = encrypt(Buffer.from(testString))
    const decrypted = decrypt(encrypted)
    const decryptedAsString = decrypted.toString()
    expect(decryptedAsString).toEqual(testString)
    expect(decryptedAsString).not.toEqual(encrypted.data)
  })

  it('can encrypt and decrypt OK with an external key', () => {
    const testString = 'This is a test string'
    const key = Buffer.alloc(32, 'this is a test key')
    const encrypted = encrypt(Buffer.from(testString), key)
    const decrypted = decrypt({ data: encrypted.data, key })
    const decryptedAsString = decrypted.toString()
    expect(decryptedAsString).toEqual(testString)
  })

  it('fails to decrypt with the wrong key', () => {
    const testString = 'This is a test string'
    const encrypted1 = encrypt(Buffer.from(testString))
    const encrypted2 = encrypt(Buffer.from(testString))
    expect(() => { decrypt({ data: encrypted1.data, key: encrypted2.key }) }).toThrow(/bad decrypt/)
  })
})
