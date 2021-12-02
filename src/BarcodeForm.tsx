import { useCallback, useEffect, useState } from "react"
import QRCode from "react-qr-code"
import qs from 'query-string'
import useInput from "./useInput"

const BarcodeForm: React.FC = () => {
  const athleteNameInput = useInput()
  const athleteIdInput = useInput()
  const iceContactNameInput = useInput()
  const iceContactNumberInput = useInput()
  const medicalInfoInput = useInput("None")

  const [isFormDirty, setIsFormDirty] = useState(true)
  const [passUrl, setPassUrl] = useState('')

  useEffect(() => {
    setIsFormDirty(true)
  }, [setIsFormDirty, athleteNameInput.value, athleteIdInput.value, iceContactNameInput.value, iceContactNumberInput.value, medicalInfoInput.value])

  const handleGeneratePass = useCallback(() => {
    const query = qs.stringifyUrl({
      url: `${process.env.REACT_APP_BASE_URL}api/generate`,
      query: {
        athleteId: athleteIdInput.value,
        athleteName: athleteNameInput.value,
        iceContactName: iceContactNameInput.value,
        iceContactNumber: iceContactNumberInput.value,
        medicalInfo: medicalInfoInput.value
      }
    })
    setPassUrl(query)
    setIsFormDirty(false)
    window.scrollTo(0, document.body.scrollHeight);
  }, [setIsFormDirty, athleteNameInput.value, athleteIdInput.value, iceContactNameInput.value, iceContactNumberInput.value, medicalInfoInput.value])

  return (
    <div className="bg-gray-100 p-8 rounded-lg">
      <h3 className="text-primary font-bold text-center text-2xl mb-8">
        Your barcode details
      </h3>
      <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
        <label className="block">
          <span>Athlete ID</span>
          <input
            type="text"
            name="athleteId"
            placeholder="e.g. A208864"
            className="w-full rounded mt-1"
            {...athleteIdInput}
          />
        </label>
        <label className="block">
          <span>Athlete Name</span>
          <input
            type="text"
            name="athleteName"
            className="w-full rounded mt-1"
            {...athleteNameInput}
          />
        </label>
        <label className="block">
          <span><abbr title="In case of emergency">ICE</abbr> Contact Name</span>
          <input
            type="text"
            name="iceName"
            className="w-full rounded mt-1"
            {...iceContactNameInput}
          />
        </label>
        <label className="block">
          <span><abbr title="In case of emergency">ICE</abbr> Contact Number</span>
          <input
            type="text"
            name="iceNumber"
            className="w-full rounded mt-1"
            {...iceContactNumberInput}
          />
        </label>
        <label className="block md:col-span-2">
          <span>Essential medical information</span>
          <input
            type="text"
            name="medicalInfo"
            className="w-full rounded mt-1"
            {...medicalInfoInput}
          />
        </label>
        <button className="bg-primary text-white p-4 rounded-lg md:col-span-2 md:mx-32" onClick={handleGeneratePass}>
          Generate Pass
        </button>
      </div>
      {!isFormDirty && (
        <div className="flex flex-col items-center">
          <p className="md:mx-32 text-center mt-8 mb-4">
            Scan the QR code below with your iPhone to add your barcode to your Apple Wallet
          </p>
          <div className="flex-initial bg-white p-6 pb-4 rounded-lg border-width-2 flex-initial">
            <QRCode value={passUrl} size={128} />
          </div>
          <p className="md:mx-32 text-center mt-8 mb-4">
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
