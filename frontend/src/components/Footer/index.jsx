import {FaGoogle, FaTwitter, FaYoutube, FaInstagram} from 'react-icons/fa'

import './index.css'

const Footer = () => (
  <div className="footer-button-container">
    <div className="home-icons-container">
      <FaGoogle size={25} />
      <FaTwitter size={25} />
      <FaInstagram size={25} />
      <FaYoutube size={25} />
    </div>
    <p className="contact-us">Contact Us</p>
  </div>
)

export default Footer