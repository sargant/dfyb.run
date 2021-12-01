import { VercelRequest, VercelResponse } from '@vercel/node';
import { PKPass } from 'passkit-generator'
import { join } from 'path';
import { decrypt } from '../utils/encryption'

import encryptedCerts from '../certs.enc.json'

export default async (request: VercelRequest, response: VercelResponse) => {

  const { 
    athleteName,
    athleteId,
    iceContactName,
    iceContactNumber,
    medicalInfo
  } = request.query

  const pass = await PKPass.from({
    model: join(__dirname, '..', 'pass-models', 'dfyb.run.pass'),
    certificates: {
      signerCert: decrypt(encryptedCerts.signerCert, process.env.SECRETS_KEY),
      signerKey: decrypt(encryptedCerts.signerKey, process.env.SECRETS_KEY),
      wwdr: decrypt(encryptedCerts.wwdr, process.env.SECRETS_KEY),
    }
  }, {
    serialNumber: `${athleteId}`
  })

  pass.headerFields.push({
    key: 'headerAthlete',
    label: `${athleteName}`,
    value: `${athleteId}`
  })

  pass.primaryFields.push({
    key: 'athleteName',
    label: 'Athlete Name',
    value: `${athleteName}`
  })

  pass.secondaryFields.push({
    key: 'iceContactNumber',
    label: 'ICE',
    value: `${iceContactNumber}`
  })

  pass.secondaryFields.push({
    key: 'iceContactName',
    label: 'Contact Name',
    value: `${iceContactName}`
  })

  pass.auxiliaryFields.push({
    key: 'medicalInfo',
    label: 'Medical Info',
    value: `${medicalInfo}`
  })

  pass.backFields.push({
    key: 'backAthleteName',
    label: 'Athlete Name',
    value: `${athleteName}`
  })

  
  pass.backFields.push({
    key: 'backAthleteId',
    label: 'Athlete ID',
    value: `${athleteId}`
  })

  pass.backFields.push({
    key: 'backIceContact',
    label: 'Emergency Contact (ICE)',
    value: `${iceContactName}\n${iceContactNumber}`
  })

  pass.backFields.push({
    key: 'backMedicalInfo',
    label: 'Medical Info',
    value: `${medicalInfo}`
  })

  pass.setBarcodes({
    message: `${athleteId}`,
    format: 'PKBarcodeFormatQR',
    altText: `${athleteId}`
  })
  
  response.setHeader('Content-Type', 'application/vnd.apple.pkpass')
  response.send(pass.getAsBuffer())
};
