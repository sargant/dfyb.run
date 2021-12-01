import { VercelRequest, VercelResponse } from '@vercel/node';
import { PKPass } from 'passkit-generator'
import { join } from 'path';
import { decrypt } from '../utils/encryption'

import encryptedCerts from '../certs.enc.json'

export default async (_: VercelRequest, response: VercelResponse) => {

  const pass = await PKPass.from({
    model: join(__dirname, '..', 'pass-models', 'dfyb.run.pass'),
    certificates: {
      signerCert: decrypt(encryptedCerts.signerCert, process.env.SECRETS_KEY),
      signerKey: decrypt(encryptedCerts.signerKey, process.env.SECRETS_KEY),
      wwdr: decrypt(encryptedCerts.wwdr, process.env.SECRETS_KEY),
    }
  }, {
    serialNumber: 'A208864'
  })

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
