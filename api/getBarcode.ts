import { VercelRequest, VercelResponse } from '@vercel/node';
import { readFileSync } from 'fs';
import { PKPass } from 'passkit-generator'
import { CertificatesSchema, FileBuffers } from 'passkit-generator/lib/schemas';
import { join } from 'path';
import { decrypt } from '../utils/encryption'
import encryptedCerts from '../certs.enc.json'

const readLocalAsset = (filename: string) => readFileSync(join(__dirname, 'assets', filename))

const certs: CertificatesSchema = Object.keys(encryptedCerts).reduce(
  (acc, val) => ({ ...acc, [val]: decrypt(encryptedCerts[val], process.env.SECRETS_KEY) }),
  {} as CertificatesSchema
)

export default async (_: VercelRequest, response: VercelResponse) => {

  const buffers: FileBuffers = 
  [
    'pass.json',
    'icon.png',
    'icon@2x.png',
    'logo.png',
    'logo@2x.png',
    'logo@3x.png'
  ].reduce((current, val) => ({ ...current, [val]: readLocalAsset(val) }), {})

  const pass = new PKPass(buffers, certs, { serialNumber: 'A208864' })

  pass.headerFields.push({
    key: 'HeaderInfo',
    label: 'Robert Sargant',
    value: 'A208864'
  })

  pass.primaryFields.push({
    key: 'AthleteName',
    label: 'Athlete Name',
    value: 'Robert Sargant'
  })

  pass.secondaryFields.push({
    key: 'ice',
    label: 'ICE',
    value: '01234 567890'
  })

  pass.secondaryFields.push({
    key: 'ice-name',
    label: 'Contact Name',
    value: 'Sarah Woods'
  })

  pass.auxiliaryFields.push({
    key: 'medicalInfo',
    label: 'Medical Info',
    value: 'Allergic to Penicillin\nHas no heartbeat'
  })

  pass.backFields.push({
    key: 'athleteName',
    label: 'Athlete Name',
    value: 'Robert Sargant'
  })

  
  pass.backFields.push({
    key: 'athleteID',
    label: 'Athlete ID',
    value: 'A208864'
  })

  pass.backFields.push({
    key: 'emergencyContact',
    label: 'Emergency Contact',
    value: 'Sarah Woods\n01234 567890'
  })

  pass.backFields.push({
    key: 'medicalInfo',
    label: 'Medical Info',
    value: 'Allergic to Penicillin\nHas no heartbeat'
  })

  pass.setBarcodes({
    message: 'A208864',
    format: 'PKBarcodeFormatQR',
    altText: 'A208864'
  })
  
  response.setHeader('Content-Type', 'application/vnd.apple.pkpass')
  response.send(pass.getAsBuffer())
};
