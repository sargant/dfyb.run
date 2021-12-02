import { ChangeEvent, useState } from 'react'

interface Options {
  transform?: (value: string) => string
  validate?: (value: string) => boolean
}

const useInput = (initialValue: string = '', opts: Options = {}) => {

  const [value, setValue] = useState(initialValue)

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    let shouldUpdate = true
    const newValue = opts.transform?.(event.target.value) ?? event.target.value
    if (opts.validate?.(newValue) === false) {
      shouldUpdate = false
    }
    if (shouldUpdate) {
      setValue(newValue)
    }
  }

  return { value, onChange }
}

export default useInput
