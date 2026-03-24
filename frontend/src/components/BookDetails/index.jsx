import { useState, useEffect } from 'react'
import {Link, useNavigate, useParams} from 'react-router-dom'
import { CircularProgress } from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {AiFillCloseCircle} from 'react-icons/ai'
import {BsFillStarFill} from 'react-icons/bs'

import Header from '../Header'
import PopupContext from '../../context/popupContext'
import Footer from '../Footer'

import './index.css'

const API = import.meta.env.VITE_API_URL


function BookDetails () {
  const [status, setStatus] = useState('')
  const [bookDetailsList, setBookDetailsList] = useState([])
  const {id} = useParams()
  console.log(id)
  const navigate = useNavigate()

  useEffect(()=>{
    const getTheBookDetails = async () => {
        setStatus("INPROGRESS")
        const jwtToken = Cookies.get('jwtToken')
        const url = `http://127.0.0.1:8000/api/books/${id}/`
        const options = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${jwtToken}`,
            },
        }
        const response = await fetch(url, options)
        if (response.ok === true) {
        const data = await response.json()
        const updatedData = {
            id: data.id,
            title: data.title,
            authorName: data.author_name,
            coverPic: data.cover_pic,
            readStatus: data.read_status,
            rating: data.rating,
            aboutAuthor: data.about_author,
            aboutBook: data.about_book,
        }
        setBookDetailsList(updatedData)
        setStatus("SUCCESS")
        } else {
        setStatus("FAILURE")
        }
    }

    getTheBookDetails()
  },[])
  

  const renderTheLoading = () => (
    <div className="loader-container" testid="loader">
      <CircularProgress type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  const renderTheSuccessView = () => {
    console.log(bookDetailsList)
    return (
      <div>
        <div className="book-details-bottom-container">
          <div className="book-details-top-container">
            <img
              src={bookDetailsList.coverPic}
              alt={bookDetailsList.title}
              className="book-details-image"
            />
            <div className="book-details-content">
              <h1 className="success-title">{bookDetailsList.title}</h1>
              <p className="success-author-name">
                {bookDetailsList.authorName}
              </p>
              <div className="average-rating-container">
                <p className="average-rating">Avg Rating</p>
                <BsFillStarFill size={15} className="star-image" />
                <p className="rating">{bookDetailsList.rating}</p>
              </div>
              <p className="status">
                Status:
                <span className="success-span">
                  {bookDetailsList.readStatus}
                </span>
              </p>
            </div>
          </div>
          <hr />
          <div className="book-details-low-container">
            <h1 className="about-author">About Author</h1>
            <p className="about-author-para">{bookDetailsList.aboutAuthor}</p>
            <h1 className="about-author">About Book</h1>
            <p className="about-author-para">{bookDetailsList.aboutBook}</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  const clickTheTryAgainButton = () => {
    // getTheBookDetails()
    console.log("chintu")
  }

  const renderTheFailureView = () => (
    <div className="failure-container">
      <img
        src="https://res.cloudinary.com/dknazoxuw/image/upload/v1680834979/Group_7522_d1vu1e.png"
        alt="failure view"
        className="failure-image"
      />
      <p className="some-thing-went-wrong">
        Something went wrong. Please try again
      </p>
      <button
        type="button"
        className="try-again"
        onClick={clickTheTryAgainButton}
      >
        Try Again
      </button>
    </div>
  )

  const renderTheStatus = () => {
    switch (status) {
      case 'INPROGRESS':
        return renderTheLoading()
      case 'SUCCESS':
        return renderTheSuccessView()
      case 'FAILURE':
        return renderTheFailureView()
      default:
        return null
    }
  }
  return (
    <PopupContext.Consumer>
      {value => {
        const {showPopup, changeThePopupValue} = value
        const clickTheCloseButton = () => {
        changeThePopupValue()
        }
        const clickTheLogoutButtonInPopup = () => {
        Cookies.remove('jwtToken')
        navigate('/login' , {replace:true})
        }
        return (
        <div className="book-details-bg-container">
            <Header />
            {showPopup && (
            <div className="popup-container">
                <Link to="/" className="normal-link-item">
                <p className="popup-home">Home</p>
                </Link>
                <Link to="/shelf" className="normal-link-item">
                <p className="popup-bookshelves">Bookshelves</p>
                </Link>
                <button
                type="button"
                className="popup-logout"
                onClick={clickTheLogoutButtonInPopup}
                >
                Logout
                </button>
                <button
                type="button"
                className="close-button"
                onClick={clickTheCloseButton}
                >
                <AiFillCloseCircle size="20" />
                </button>
            </div>
            )}
            {renderTheStatus()}
        </div>
        )
      }}
    </PopupContext.Consumer>
  )
}

export default BookDetails