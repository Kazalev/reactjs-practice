import { useContext, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom';
import AuthContext from '../../store/auth-context'
import classes from './AuthForm.module.css'

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const emailRef = useRef()
  const passwordRef = useRef()
  const authCtx = useContext(AuthContext)
  const history = useHistory()

  const switchAuthModeHandler = () => setIsLogin((prevState) => !prevState)

  const submitHandler = (e) => {
    e.preventDefault()
    const enteredEmail = emailRef.current.value
    const enteredPassword = passwordRef.current.value

    // Optional: Add validation

    setIsLoading(true)
    let url
    if (isLogin) url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCyTzPEQ6AHPDYXXHptEYMTS4QoEd0j1tg'
    else url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCyTzPEQ6AHPDYXXHptEYMTS4QoEd0j1tg'

    let options = {
      method: 'POST',
      body: JSON.stringify({ email: enteredEmail, password: enteredPassword, returnSecureToken: true }),
      headers: { 'Content-Type': 'application/json' }
    }

    fetch(url, options).then(res => {
      setIsLoading(false)
      if (res.ok) return res.json()
      else {
        return res.json().then(data => {
          let errorMsg = 'Authentication faild!'
          // if (data && data.error && data.error.message) errorMsg = data.error.message
          throw new Error(errorMsg)
        })
      }
    }).then(data => {
      console.log(data)
      const expirationTime = new Date(new Date().getTime() + (+data.expiresIn * 1000))
      authCtx.login(data.idToken, expirationTime.toISOString())
      history.replace('/')
    }).catch(err => {
      alert(err.message)
    })
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' ref={emailRef} id='email' required />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' ref={passwordRef} id='password' required />
        </div>
        <div className={classes.actions}>
          {!isLoading && <button>{isLogin ? 'Login' : 'Create Account'}</button>}
          {isLoading && <p>Sending request...</p>}
          <button type='button' className={classes.toggle} onClick={switchAuthModeHandler}          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
