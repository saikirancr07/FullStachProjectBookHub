import {Link} from 'react-router-dom'

import './index.css'

const NotFound = () => (
  <div className="not-found-bg-container">
    <img
      src="https://res.cloudinary.com/dknazoxuw/image/upload/v1680920407/Group_7484_hvo8t3.png"
      alt="not found"
      className="not-found-image"
    />
    <h1 className="not-found-heading">Page Not Found</h1>
    <p className="not-found-para">
      we are sorry, the page you requested could not be found. Please go back to
      the homepage.
    </p>
    <Link to="/" className="normal-link-item">
      <button type="button" className="go-back">
        Go Back to Home
      </button>
    </Link>
  </div>
)

export default NotFound