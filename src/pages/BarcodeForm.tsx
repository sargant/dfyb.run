import React, { useCallback, useEffect, useState } from "react"
import QRCode from "react-qr-code"
import qs from 'query-string'
import { Tooltip } from 'react-tippy'

import useInput from "src/useInput"
import useInputCheckbox from "src/useInputCheckbox"

const textInputClasses = "w-full border-0 border-b border-primary dark:border-secondary focus:border-primary dark:focus:border-secondary px-2 mt-1 bg-transparent shadow-none focus:bg-white dark:focus:bg-gray-600 text-black placeholder-black placeholder-opacity-50 dark:placeholder-opacity-50 dark:text-gray-300 dark:placeholder-gray-300 font-sans"

const Label: React.FC<React.LabelHTMLAttributes<HTMLLabelElement>> = ({ children, className }) => (
  <label className={`block font-bold text-base pb-8 lg:pb-0 ${className}`}>
    {children}
  </label>
)

const Button: React.FC<Pick<React.ButtonHTMLAttributes<HTMLButtonElement>, 'disabled' | 'children' | 'onClick' | 'className'>> = ({ children,  className, ...rest  }) => (
  <button {...rest} className={`font-bold text-white bg-primary dark:bg-secondary dark:text-primary disabled:opacity-25 p-4 rounded-lg lg:col-span-2 w-full whitespace-nowrap ${className}`}>
    {children}
  </button>
)

const BarcodeForm: React.FC = () => {
  const athleteNameInput = useInput('')
  const athleteIdInput = useInput('', { transform: v => v.toUpperCase(), validate: val => /^$|^A[1-9]?$|^A[1-9][0-9]{0,8}$/.test(val) })
  const iceContactNameInput = useInput('')
  const iceContactNumberInput = useInput('')
  const medicalInfoInput = useInput("None")
  const useQrCodeInput = useInputCheckbox(true)

  const [submitEnabled, setSubmitEnabled] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [passUrl, setPassUrl] = useState('')

  const handleGeneratePass = useCallback(() => {
    if (!submitEnabled) {
      return
    }

    const query = {
      athleteId: athleteIdInput.value,
      athleteName: athleteNameInput.value,
      iceContactName: iceContactNameInput.value,
      iceContactNumber: iceContactNumberInput.value,
      medicalInfo: medicalInfoInput.value,
      useQrCode: useQrCodeInput.checked ? 'yes' : ''
    }

    setPassUrl(qs.stringifyUrl({
      url: `${process.env.REACT_APP_BASE_URL}api/generate`,
      query
    }))

    setShowResult(true)
  
  }, [
    submitEnabled,
    setShowResult,
    athleteNameInput.value,
    athleteIdInput.value,
    iceContactNameInput.value, 
    iceContactNumberInput.value,
    medicalInfoInput.value,
    useQrCodeInput.checked
  ])

  const handleCancelPass = useCallback(() => {
    setShowResult(false)
  }, [setShowResult])

  useEffect(() => {
    setSubmitEnabled(athleteIdInput.value.length > 1)
  }, [setSubmitEnabled, athleteIdInput.value])

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
                {...athleteIdInput}
              />
            </Label>
            <Label>
              Athlete Name
              <input
                type="text"
                className={textInputClasses}
                {...athleteNameInput}
              />
            </Label>
            <Label>
              <abbr title="In case of emergency">ICE</abbr> Contact Name
              <input
                type="text"
                className={textInputClasses}
                {...iceContactNameInput}
              />
            </Label>
            <Label>
              <abbr title="In case of emergency">ICE</abbr> Contact Number
              <input
                type="text"
                className={textInputClasses}
                {...iceContactNumberInput}
              />
            </Label>
            <Label className="md:col-span-2">
              Essential medical information
              <input
                type="text"
                className={textInputClasses}
                {...medicalInfoInput}
              />
            </Label>
            <div className="text-base pb-8 lg:pb-0 md:col-span-2 flex flex-row items-center">
              <input type="checkbox" {...useQrCodeInput} className="w-6 h-6 rounded bg-primary dark:text-gray-500 dark:bg-gray-500 shadow-none border-0 outline-none text-primary dark:text-gray-500 mr-4" />
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
            Pass ready for runner {athleteIdInput.value}!
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
            If you're on your iPhone, click the button below to add the pass directly to Apple Wallet
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
