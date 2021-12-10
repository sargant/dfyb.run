import { RequestListener } from 'http'
import { PKPass } from 'passkit-generator'
import { join } from 'path'

import * as certs from './certs.enc.js'
import { decrypt } from '../lib/encryption'

export const sanitizeAthleteId = (athleteId: string) => {
  const trimmedId = athleteId.trim().toUpperCase()
  return (/^[0-9]+$/.test(trimmedId)) ? `A${trimmedId}` : trimmedId
}

interface BarcodeOptions {
  athleteId?: string
  athleteName?: string
  iceContactName?: string
  iceContactNumber?: string
  medicalInfo?: string
}

const generateBarcode = async (opt: BarcodeOptions) => {
  const key = Buffer.from(process.env.SECRETS_KEY ?? '', 'base64')
  if (key.length === 0) {
    throw new Error('No certificates decryption key supplied')
  }

  if (!opt.athleteId) {
    throw new Error('No athlete ID provided')
  }

  console.log(`Creating a new pass for ${opt.athleteId}`)

  const sanitizedAthleteId = sanitizeAthleteId(opt.athleteId)
  const sanitizedAthleteName = opt.athleteName && opt.athleteName.trim().length > 0 ? opt.athleteName.trim() : 'Unknown'

  console.log(`Sanitation details: ${JSON.stringify({
    athleteId: opt.athleteId,
    sanitizedAthleteId,
    athleteName: opt.athleteName,
    sanitizedAthleteName
  })}`)

  const pass = await PKPass.from({
    model: join(__dirname, '..', 'pass-models', 'dfyb.run.pass'),
    certificates: {
      signerCert: decrypt({ data: certs.signerCert, key }),
      signerKey: decrypt({ data: certs.signerKey, key }),
      wwdr: decrypt({ data: certs.wwdr, key })
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
    { key: 'backAthleteId', label: 'Athlete ID', value: sanitizedAthleteId }
  )

  if (opt.iceContactNumber) {
    pass.secondaryFields.push({
      key: 'iceContactNumber',
      label: 'ICE',
      value: opt.iceContactNumber
    })

    pass.backFields.push({
      key: 'backIceContact',
      label: 'Emergency Contact (ICE)',
      value: opt.iceContactName ? `${opt.iceContactName}\n${opt.iceContactNumber}` : opt.iceContactNumber
    })
  }

  if (opt.iceContactName) {
    pass.secondaryFields.push({
      key: 'iceContactName',
      label: 'Contact Name',
      value: opt.iceContactName
    })
  }

  if (opt.medicalInfo) {
    pass.auxiliaryFields.push({
      key: 'medicalInfo',
      label: 'Medical Info',
      value: opt.medicalInfo
    })

    pass.backFields.push({
      key: 'backMedicalInfo',
      label: 'Medical Info',
      value: opt.medicalInfo
    })
  }

  pass.setBarcodes({
    message: sanitizedAthleteId,
    format: 'PKBarcodeFormatCode128',
    altText: sanitizedAthleteId
  }, {
    message: sanitizedAthleteId,
    format: 'PKBarcodeFormatQR',
    altText: sanitizedAthleteId
  })

  console.log(`Pass generation complete for ${opt.athleteId}`)
  return pass
}

const listener: RequestListener = async (request, response) => {
  const parameters = new URL(request.url ?? '', `https://${request?.headers.host ?? 'example.com'}`).searchParams
  const pass = await generateBarcode({
    athleteId: parameters.get('athleteId') ?? undefined,
    athleteName: parameters.get('athleteName') ?? undefined,
    iceContactName: parameters.get('iceContactName') ?? undefined,
    iceContactNumber: parameters.get('iceContactNumber') ?? undefined,
    medicalInfo: parameters.get('medicalInfo') ?? undefined
  })

  response.writeHead(200, {
    'Content-Type': 'application/vnd.apple.pkpass',
    'Content-Disposition': 'attachment; filename="barcode.pkpass"'
  }).end(pass.getAsBuffer())
}

export default listener
