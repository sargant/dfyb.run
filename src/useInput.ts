import { ChangeEvent, useState } from 'react'

const useInput = (initialValue?: any) => {
  const [value, setValue] = useState(initialValue)
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value)
    setValue(event.target.value)
  }
  return { value, onChange }
}

export default useInput
