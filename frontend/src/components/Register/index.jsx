import { useState } from 'react'
import Cookies from 'js-cookie'
import {Navigate, useNavigate} from 'react-router-dom'

import './index.css'

function Register () {

  const [username, setUsername] = useState("")
  const [password,setPassword] = useState("")
  const [showSubmitError,setShowSubmitError] = useState(false)
  const [errMsg, setErrorMsg] = useState("")
  const navigate=useNavigate()


  const onChangeUsername = event => {
    setUsername(event.target.value)
  }

  const onChangePassword = event => {
    setPassword(event.target.value)
  }

  const onSubmitSuccess = () =>  navigate('/login', {replace:true})
  

  const onSubmitFailure = errorMsg => {
    setShowSubmitError(true)
    setErrorMsg(errorMsg)
    
  }

  const submitForm = async event => {
    event.preventDefault()
    setShowSubmitError(false)
    if (username==="" || password===""){
        setShowSubmitError(true)
        setErrorMsg("username and password are not empty")
        console.log(errMsg)
        return
    }
    const userDetails = {username, password}
    const url = 'http://127.0.0.1:8000/api/register/'
    const options = {
      method: 'POST',
      headers : {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify(userDetails)
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      onSubmitSuccess()
    } else {
      setUsername("")
      setPassword("")
      onSubmitFailure(data.username[0])
    }
  }

  const renderPasswordField = () => {
    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          className="password-input-field"
          value={password}
          onChange={onChangePassword}
          placeholder="Password"
        />
      </>
    )
  }

  const renderUsernameField = () => {
    return (
      <>
        <label className="input-label" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          className="username-input-field"
          value={username}
          onChange={onChangeUsername}
          placeholder="Username"
        />
      </>
    )
  }

  const jwtToken = Cookies.get('jwtToken')

  if (jwtToken !== undefined) {
      return <Navigate to="/" replace/>
  }
    
    return (
        <div className="login-form-container">
        <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
            className="login-website-logo-mobile-image"
            alt="website logo"
        />
        <img
            src="https://res.cloudinary.com/dknazoxuw/image/upload/v1773124121/register-now_kw7zic.png"
            className="login-image"
            alt="website login"
        />
        <div>
            <form className="form-container" onSubmit={submitForm}>
            <h1>BOOK-HUB</h1>
            <div className="input-container">{renderUsernameField()}</div>
            <div className="input-container">{renderPasswordField()}</div>
            <button type="submit" className="login-button">
                Register
            </button>
            {showSubmitError && <p className="error-message">*{errMsg}</p>}
            </form>
        </div>
        </div>
    )
}



export default Register
