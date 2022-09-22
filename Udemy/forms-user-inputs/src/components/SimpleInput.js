import useInput from "../hooks/useInput"

const SimpleInput = props => {
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangedHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput
  } = useInput(value => value.trim() !== '')

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangedHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput
  } = useInput(value => value.includes('@'))

  let formIsValid = false
  if (enteredNameIsValid && enteredEmailIsValid) formIsValid = true

  const formSubmissionHandler = event => {
    event.preventDefault()
    if (!enteredNameIsValid) return
    console.log({ enteredName, enteredEmail })
    resetNameInput()
    resetEmailInput()
  }

  const nameInputClasses = nameInputHasError ? 'form-control invalid' : 'form-control'
  const emailInputClasses = emailInputHasError ? 'form-control invalid' : 'form-control'

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' onChange={nameChangedHandler} onBlur={nameBlurHandler} value={enteredName} />
        {nameInputHasError && <p className="error-text">Name must not be empty.</p>}
      </div>

      <div className={emailInputClasses}>
        <label htmlFor='name'>Your E-Mail</label>
        <input type='email' id='name' onChange={emailChangedHandler} onBlur={emailBlurHandler} value={enteredEmail} />
        {emailInputHasError && <p className="error-text">Please enter a valid email.</p>}
      </div>

      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  )
}

export default SimpleInput