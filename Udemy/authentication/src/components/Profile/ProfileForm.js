import { useContext, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import AuthContext from '../../store/auth-context'
import classes from './ProfileForm.module.css'

const ProfileForm = () => {
  const newPasswordRef = useRef()
  const authCtx = useContext(AuthContext)
  const history = useHistory()

  const submitHandler = (e) => {
    e.preventDefault()
    const enteredNewPassowrd = newPasswordRef.current.value

    let options = {
      method: 'POST',
      body: JSON.stringify({ idToken: authCtx.token, password: enteredNewPassowrd, returnSecureToken: false }),
      headers: { 'Content-Type': 'application/json' }
    }

    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCyTzPEQ6AHPDYXXHptEYMTS4QoEd0j1tg', options)
      .then(res => {
        history.replace('/')
      })
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' minLength='6' ref={newPasswordRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  )
}

export default ProfileForm