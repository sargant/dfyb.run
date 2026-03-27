import React, { useCallback, useEffect, useReducer, useState } from 'react'
import QRCode from 'react-qr-code'
import qs from 'query-string'
import { Heading } from '../components'

const textInputClasses = `
  w-full
  rounded-md
  mt-2
  border-0
  bg-black/10 dark:bg-white/10
  text-black dark:text-gray-300 
  placeholder-black/50 dark:placeholder-gray-300/50
  text-sm
`

const Label: React.FC<React.LabelHTMLAttributes<HTMLLabelElement>> = ({ children, className = '' }) => (
  <label
    className={`
    block
    pb-4 lg:pb-0
    ${className}
    `}
  >
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
  medicalInfo: 'None'
}

const formReducer = (values: typeof formInitialValues, update: [string, string]) => {
  const [name, newValue] = update
  switch (name) {
    case 'reset': {
      return { ...formInitialValues }
    }
    case 'athleteId': {
      let transformedVal = newValue.toUpperCase()

      // Any numerical values should just prepend the 'A'
      if (transformedVal.length > 0 && transformedVal.charAt(0) !== 'A') {
        transformedVal = `A${transformedVal}`;
      }

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
  const [profileViewed, setProfileViewed] = useState(false)
  const [profileApproved, setProfileApproved] = useState(false)
  const [submitEnabled, setSubmitEnabled] = useState(false)
  const [showBarcode, setShowBarcode] = useState(false)
  const [passUrl, setPassUrl] = useState('')

  const handleGeneratePass = useCallback(() => {
    if (!submitEnabled) {
      return
    }

    const url = `${window.location.origin}/api/generate`
    setPassUrl(qs.stringifyUrl({ url, query: formValues }))
    setShowBarcode(true)
  }, [
    submitEnabled,
    setShowBarcode,
    formValues
  ])

  const handleOpenProfile = useCallback(() => {
    window.open(`https://parkrun.org.uk/parkrunner/${formValues.athleteId.substring(1)}`, '_blank')
    setProfileViewed(true)
  }, [formValues.athleteId])

  const handleApproveProfile = useCallback(() => {
    setProfileApproved(true)
  }, [setProfileApproved])

  const handleCancelPass = useCallback(() => {
    setProfileApproved(false)
    setProfileViewed(false)
    setShowBarcode(false)
  }, [setShowBarcode, setProfileApproved, setProfileViewed])

  const handleStartAgain = useCallback(() => {
    dispatch(['reset', ''])
    handleCancelPass()
  }, [dispatch, handleCancelPass])

  const registerTextInput = (name: keyof typeof formValues) => ({
    value: formValues[name],
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch([name, event.target.value])
    }
  })

  useEffect(() => {
    setSubmitEnabled(formValues.athleteId.length > 1)
  }, [setSubmitEnabled, formValues.athleteId])

  if (!showBarcode) {
    return (
      <>
        <Heading>
          Create your virtual barcode pass
        </Heading>
        <div className="mt-4 lg:(grid gap-x-8 gap-y-4 grid-cols-0)">
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
          <Button disabled={!submitEnabled} onClick={handleGeneratePass} className="text-lg mt-4">
            Generate Pass
          </Button>
        </div>
      </>
    )
  }

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-primary dark:text-secondary font-header font-bold text-center text-2xl mb-4">
        Generating pass for runner {formValues.athleteId}
      </h3>
      <p className="xl:mx-24 mb-4 text-center">
        Before continuing, please tap the button below to open the parkrun profile
        for {formValues.athleteId} and check you&apos;re creating the pass for the
        right person.
      </p>
      <Button className='w-auto' onClick={handleOpenProfile}>
        Open parkrun profile page
      </Button>
      <p className="xl:mx-24 my-4 text-center">
        Is this the person you were expecting?
      </p>
      <div className='flex flex-row'>
        <Button className='w-24 mr-4' disabled={!profileViewed || profileApproved} onClick={handleApproveProfile}>
          Yes
        </Button>
        <Button className='w-24' disabled={!profileViewed || profileApproved} onClick={handleCancelPass}>
          No
        </Button>
      </div>
      {profileApproved && (
        <>
        <p className="xl:mx-32 text-center my-4">
          Scan the QR code below with your iPhone to add your barcode to your Apple Wallet
          </p>
          <div className="flex-initial bg-white p--4 rounded-lg border-width-2 flex-initial">
            <QRCode value={passUrl} size={128} />
          </div>
          <p className="xl:mx-32 text-center mt-8 mb-4">
            If you&apos;re on your iPhone, click the button below to add the pass directly to Apple Wallet
          </p>
          <a href={passUrl}>
            <img src="/add-to-apple-wallet.svg" className="h-16" alt="Add to Apple Wallet" />
          </a>
          <Button className='w-32 mt-8' disabled={!profileViewed} onClick={handleStartAgain}>
            Start again
          </Button>
        </>
      )}
    </div>
  )
}

export default BarcodeForm
