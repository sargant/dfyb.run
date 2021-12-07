import React, { useCallback, useEffect, useReducer, useState } from 'react'
import QRCode from 'react-qr-code'
import qs from 'query-string'
import { Tooltip } from 'react-tippy'

const textInputClasses = 'w-full border-0 border-b border-primary dark:border-secondary focus:border-primary dark:focus:border-secondary px-2 mt-1 bg-transparent shadow-none focus:bg-white dark:focus:bg-gray-600 text-black placeholder-black placeholder-opacity-50 dark:placeholder-opacity-50 dark:text-gray-300 dark:placeholder-gray-300 font-sans'

const Label: React.FC<React.LabelHTMLAttributes<HTMLLabelElement>> = ({ children, className }) => (
  <label className={`block font-bold text-base pb-8 lg:pb-0 ${className ?? ''}`}>
    {children}
  </label>
)

const Button: React.FC<Pick<React.ButtonHTMLAttributes<HTMLButtonElement>, 'disabled' | 'children' | 'onClick' | 'className'>> = ({ children, className, ...rest }) => (
  <button {...rest} className={`font-bold text-white bg-primary dark:bg-secondary dark:text-primary disabled:opacity-25 p-4 rounded-lg lg:col-span-2 w-full whitespace-nowrap ${className ?? ''}`}>
    {children}
  </button>
)

const formInitialValues = {
  athleteName: '',
  athleteId: '',
  iceContactName: '',
  iceContactNumber: '',
  medicalInfo: 'None',
  useQrCode: 'yes'
}

const formReducer = (values: typeof formInitialValues, update: [string, string]) => {
  const [name, newValue] = update
  switch (name) {
    case 'athleteId': {
      const transformedVal = newValue.toUpperCase()
      return /^$|^A[1-9]?$|^A[1-9][0-9]{0,8}$/.test(transformedVal)
        ? { ...values, athleteId: transformedVal }
        : values
    }
    default: {
      return { ...values, [name]: newValue }
    }
  }
}

const BarcodeForm: React.FC = () => {
  const [formValues, dispatch] = useReducer(formReducer, formInitialValues)
  const [submitEnabled, setSubmitEnabled] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [passUrl, setPassUrl] = useState('')

  const handleGeneratePass = useCallback(() => {
    if (!submitEnabled) {
      return
    }

    const url = `${window.location.origin}/api/generate`
    setPassUrl(qs.stringifyUrl({ url, query: formValues }))
    setShowResult(true)
  }, [
    submitEnabled,
    setShowResult,
    formValues
  ])

  const handleCancelPass = useCallback(() => {
    setShowResult(false)
  }, [setShowResult])

  const registerTextInput = (name: keyof typeof formValues) => ({
    value: formValues[name],
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch([name, event.target.value])
    }
  })

  const registerCheckboxInput = (name: keyof typeof formValues) => ({
    checked: formValues[name] === 'yes',
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch([name, event.target.checked ? 'yes' : ''])
    }
  })

  useEffect(() => {
    setSubmitEnabled(formValues.athleteId.length > 1)
  }, [setSubmitEnabled, formValues.athleteId])

  return (
    <div className="bg-gray-200 dark:bg-gray-700 p-8 sm:rounded-lg">
      {!showResult && (
        <>
          <h3 className="text-primary dark:text-secondary font-header font-bold text-center text-2xl mb-8">
            Create your virtual barcode pass
          </h3>
          <div className="lg:grid gap-8 grid-cols-0">
            <Label>
              Athlete ID <span className="text-red-700 dark:text-red-500 pl-1 font-normal">required</span>
              <input
                type="text"
                placeholder="e.g. A208864"
                className={textInputClasses}
                {...registerTextInput('athleteId')}
              />
            </Label>
            <Label>
              Athlete Name
              <input
                type="text"
                className={textInputClasses}
                {...registerTextInput('athleteName')}
              />
            </Label>
            <Label>
              <abbr title="In case of emergency">ICE</abbr> Contact Name
              <input
                type="text"
                className={textInputClasses}
                {...registerTextInput('iceContactName')}
              />
            </Label>
            <Label>
              <abbr title="In case of emergency">ICE</abbr> Contact Number
              <input
                type="text"
                className={textInputClasses}
                {...registerTextInput('iceContactNumber')}
              />
            </Label>
            <Label className="md:col-span-2">
              Essential medical information
              <input
                type="text"
                className={textInputClasses}
                {...registerTextInput('medicalInfo')}
              />
            </Label>
            <div className="text-base pb-8 lg:pb-0 md:col-span-2 flex flex-row items-center">
              <input
                type="checkbox"
                className="w-6 h-6 rounded bg-primary dark:text-gray-500 dark:bg-gray-500 shadow-none border-0 outline-none text-primary dark:text-gray-500 mr-4"
                {...registerCheckboxInput('useQrCode')}
              />
              <div className="flex-1 leading-tight">
                I want to use an Apple Watch<br />
                <Tooltip
                  animation="none"
                  animateFill={false}
                  title="The Apple Watch does not support traditional barcodes. Enabling this option will produce a pass with a QR code instead. Volunteers can scan QR codes just fine, but they are not officially supported."
                  position="bottom"
                  size="small"
                >
                  <span className="text-sm text-primary dark:text-secondary border-b border-dotted border-primary dark:border-secondary opacity-75">(why does this matter?)</span>
                </Tooltip>
              </div>
            </div>
            <Button disabled={!submitEnabled} onClick={handleGeneratePass} className="text-lg">
              Generate Pass
            </Button>
          </div>
        </>
      )}
      {showResult && (
        <div className="flex flex-col items-center">
          <h3 className="text-primary dark:text-secondary font-header font-bold text-center text-2xl mb-4">
            Pass ready for runner {formValues.athleteId}!
          </h3>
          <Button onClick={handleCancelPass}>
            Go back and make changes
          </Button>
          <p className="xl:mx-32 text-center my-4">
            Scan the QR code below with your iPhone to add your barcode to your Apple Wallet
          </p>
          <div className="flex-initial bg-white p-6 pb-4 rounded-lg border-width-2 flex-initial">
            <QRCode value={passUrl} size={128} />
          </div>
          <p className="xl:mx-32 text-center mt-8 mb-4">
            If you&apos;re on your iPhone, click the button below to add the pass directly to Apple Wallet
          </p>
          <a href={passUrl}>
            <img src="/add-to-apple-wallet.svg" className="h-16" alt="Add to Apple Wallet" />
          </a>
        </div>
      )}
    </div>
  )
}

export default BarcodeForm
