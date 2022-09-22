import { useState, useReducer } from "react"

const initialInputState = { value: '', isTouched: false }

const inputStateReducer = (state, action) => {
    if (action.type === 'INPUT') return { value: action.value, isTouched: state.isTouched }
    if (action.type === 'BLUR') return { value: state.value, isTouched: true }
    if (action.type === 'RESET') return { value: '', isTouched: false }
}

const useInput = (validateValue) => {
    // const [enteredValue, setEnteredValue] = useState('')
    // const [isTouched, setIsTouched] = useState(false)

    // const valueIsValid = validateValue(enteredValue)
    // const hasError = !valueIsValid && isTouched

    const [inputState, dispatch] = useReducer(inputStateReducer, initialInputState)

    console.log(inputState)

    const valueIsValid = validateValue(inputState.value)
    const hasError = !valueIsValid && inputState.isTouched

    const valueChangeHandler = event => {
        dispatch({ type: 'INPUT', value: event.target.value })
        // setEnteredValue(event.target.value)
    }
    const inputBlurHandler = () => {
        dispatch({ type: 'BLUR' })
        // setIsTouched(true)
    }
    const reset = () => {
        dispatch({ type: 'RESET' })
        // setEnteredValue('')
        // setIsTouched(false)
    }

    return { value: inputState.value, isValid: valueIsValid, hasError, valueChangeHandler, inputBlurHandler, reset }
}

export default useInput