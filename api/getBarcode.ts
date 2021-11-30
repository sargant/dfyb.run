import { VercelRequest, VercelResponse } from '@vercel/node';
import { readFileSync } from 'fs';
import { PKPass } from 'passkit-generator'
import { FileBuffers } from 'passkit-generator/lib/schemas';
import { join } from 'path';
import getCerts from '../certs'

const readLocalAsset = (filename: string) => readFileSync(join(__dirname, 'assets', filename))

export default async (_: VercelRequest, response: VercelResponse) => {

  const buffers: FileBuffers = [
    'pass.json',
    'icon.png',
    'icon@2x.png',
    'logo.png',
    'logo@2x.png',
    'logo@3x.png'
  ].reduce((current, val) => ({ ...current, [val]: readLocalAsset(val) }), {})

  const pass = new PKPass(buffers, getCerts(process.env.SECRETS_KEY), { serialNumber: 'A208864',  })

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
