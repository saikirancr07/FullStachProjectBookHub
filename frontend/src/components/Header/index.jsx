import Cookies from 'js-cookie'
import {Link,useNavigate} from 'react-router-dom'
import PopupContext from '../../context/popupContext'

import './index.css'

const Header = () => {
  const navigate=useNavigate()

  const clickTheLogoutButton = () => {
    Cookies.remove('jwtToken')
    navigate('/login', {replace:true})
  }

  return (
    <PopupContext.Consumer>
      {value => {
        const {changeThePopupValue} = value
        const clickTheHumbergButton = () => {
          changeThePopupValue()
        }
        return (
          <nav className="navbar">
            <Link to="/" className="normal-link-item">
              <img
                src="https://res.cloudinary.com/dknazoxuw/image/upload/v1680672503/Group_7732_b6msll.png"
                alt="website logo"
                className="header-mobile-icon"
              />
            </Link>
            <button
              type="button"
              className="humberg-button"
              onClick={clickTheHumbergButton}
            >
              <img
                src="https://res.cloudinary.com/dknazoxuw/image/upload/v1680714638/icon_se6vld.png"
                alt=""
                className="humberg-menu"
              />
            </button>
            <div className="header-right-container">
              <Link to="/" className="normal-link-item">
                <p className="home">Home</p>
              </Link>
              <Link to="/shelf" className="normal-link-item">
                <p className="book-shelves">Bookshelves</p>
              </Link>
              <button
                type="button"
                className="logout-button"
                onClick={clickTheLogoutButton}
              >
                Logout
              </button>
            </div>
          </nav>
        )
      }}
    </PopupContext.Consumer>
  )
}
export default Header