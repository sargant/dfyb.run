import { VercelRequest, VercelRequestQuery, VercelResponse } from '@vercel/node';
import { PKPass } from 'passkit-generator'
import { join } from 'path';
import { decrypt } from '../utils/encryption'

import encryptedCerts from '../certs.enc.json'

export const sanitizeVercelQuery = (query: VercelRequestQuery): Record<string, string> =>
  Object.entries(query).reduce(
    (result, [key, value]) => ({ ...result, [key]: Array.isArray(value) ? value[0] : value }),
    {}
  )

export const sanitizeAthleteId = (athleteId: string) => {
  const trimmedId = athleteId.trim().toUpperCase()
  return (/^[0-9]+$/.test(trimmedId)) ? `A${trimmedId}` : trimmedId
}

export default async (request: VercelRequest, response: VercelResponse) => {

  const {
    athleteId,
    athleteName,
    iceContactName,
    iceContactNumber,
    medicalInfo,
    useQrCode
  } = sanitizeVercelQuery(request.query)

  if (!athleteId) {
    throw Error('No athlete ID provided')
  }

  const sanitizedAthleteId = sanitizeAthleteId(athleteId)
  const sanitizedAthleteName = athleteName && athleteName.trim().length > 0 ? athleteName.trim() : 'Unknown'

  console.log(`Creating a new pass for ${sanitizedAthleteId}`)
  console.log(`Sanitation details: ${JSON.stringify({ athleteId, sanitizedAthleteId, athleteName, sanitizedAthleteName })}`)

  const pass = await PKPass.from({
    model: join(__dirname, '..', 'pass-models', 'dfyb.run.pass'),
    certificates: {
      signerCert: decrypt(encryptedCerts.signerCert, process.env.SECRETS_KEY),
      signerKey: decrypt(encryptedCerts.signerKey, process.env.SECRETS_KEY),
      wwdr: decrypt(encryptedCerts.wwdr, process.env.SECRETS_KEY),
    }
  }, {
    serialNumber: sanitizedAthleteId
  })

  pass.headerFields.push({
    key: 'headerAthlete',
    label: sanitizedAthleteName,
    value: sanitizedAthleteId
  })

  pass.primaryFields.push({
    key: 'athleteName',
    label: 'Athlete Name',
    value: sanitizedAthleteName
  })

  pass.backFields.push(
    { key: 'backAthleteName', label: 'Athlete Name', value: sanitizedAthleteName },
    { key: 'backAthleteId',   label: 'Athlete ID',   value: sanitizedAthleteId }
  )

  if (iceContactNumber) {
    pass.secondaryFields.push({
      key: 'iceContactNumber',
      label: 'ICE',
      value: iceContactNumber
    })

    pass.backFields.push({
      key: 'backIceContact',
      label: 'Emergency Contact (ICE)',
      value: iceContactName ? `${iceContactName}\n${iceContactNumber}` : iceContactNumber
    })
  }

  if (iceContactName) {
    pass.secondaryFields.push({
      key: 'iceContactName',
      label: 'Contact Name',
      value: iceContactName
    })
  }

  if (medicalInfo) {
    pass.auxiliaryFields.push({
      key: 'medicalInfo',
      label: 'Medical Info',
      value: medicalInfo
    })

    pass.backFields.push({ 
      key: 'backMedicalInfo',
      label: 'Medical Info',
      value: medicalInfo
    })
  }

  pass.setBarcodes({
    message: sanitizedAthleteId,
    format: !!useQrCode ? 'PKBarcodeFormatQR' : 'PKBarcodeFormatCode128',
    altText: sanitizedAthleteId
  })
  
  response.setHeader('Content-Type', 'application/vnd.apple.pkpass')
  response.send(pass.getAsBuffer())

  console.log(`Pass generated successfully for ${athleteId}`)
};
