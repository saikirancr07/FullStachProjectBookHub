
import { useState } from "react"
import Cookies from "js-cookie"
import { useNavigate, Navigate } from "react-router-dom"
import "./index.css"

const API = import.meta.env.VITE_API_URL


function Login () {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errorShow, setErrorShow] = useState(false)
    const [errMsg, setErrMsg] = useState("")

    const navigate = useNavigate()

    const changeTheUsername = (event) => {
      setUsername(event.target.value)
      setErrorShow(false)
    }


    const changeThePassword = (event) => {
      setPassword(event.target.value)
      setErrorShow(false)
    }

    const renderSuccessView = (token) => {
        Cookies.set("jwtToken", token, {expires : 30, path : '/'})
        navigate("/", {replace:true})
    }

    const submitTheForm = async (event) => {
      event.preventDefault()
      console.log("event")
      const userDetails = {username, password}
      const loginUrl = `${API}/api/login/`
      const options = {
        method: 'POST',
        headers : {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(userDetails),
      }
      const response = await fetch(loginUrl, options)
      const data = await response.json()
      if (response.ok === true) {
        renderSuccessView(data.access)
        console.log(data.access)
      } else {
        setErrorShow(true)
        setErrMsg(data.error_msg)
      }

    }

    const token = Cookies.get("jwtToken")
    if (token !== undefined){
        return <Navigate to="/" replace/>
    }
    return(
      <div className="login-bg-container">
        <div className="mobile-view">
          <img
            src="https://res.cloudinary.com/dknazoxuw/image/upload/v1680671555/Ellipse_99_d7naxn.jpg"
            alt="website login"
            className="mobile-image"
          />
          <img
            src="https://res.cloudinary.com/dknazoxuw/image/upload/v1680973707/Rectangle_1467_1_xmasdj.png"
            alt="website login"
            className="desktop-image"
          />
          <div className="login-bottom-container">
            <img
              src="https://res.cloudinary.com/dknazoxuw/image/upload/v1680672503/Group_7732_b6msll.png"
              alt="login website logo"
              className="mobile-icon"
            />
            <form className="form" onSubmit={submitTheForm}>
              <label htmlFor="username" className="label">
                Username*
              </label>
              <input
                type="text"
                id="username"
                value={username}
                className="input"
                placeholder="USERNAME"
                onChange={changeTheUsername}
              />
              <label htmlFor="password" className="label">
                Password*
              </label>
              <input
                type="password"
                id="password"
                value={password}
                className="input"
                placeholder="PASSWORD"
                onChange={changeThePassword}
              />
              {errorShow && <p className="error-msg">{errMsg}</p>}
              <button type="submit" className="login-button">
                Login
              </button>
            </form>
            <button type="button" className="user-credentials">
              DEMO User Credentials
            </button>
            <p className="user-name">username : rahul</p>
            <p className="password">password : rahul@2021</p>
          </div>
        </div>
      </div>
    )
}

export default Login