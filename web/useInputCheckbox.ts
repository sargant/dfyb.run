import { useState } from 'react'

const useInputCheckbox = (initialValue: boolean) => {
  const [checked, setChecked] = useState(initialValue)
  return {
    checked,
    onChange: () => { setChecked(v => !v) }
  }
}

export default useInputCheckbox
