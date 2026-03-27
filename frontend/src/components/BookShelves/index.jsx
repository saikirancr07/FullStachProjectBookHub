import { useState, useEffect } from 'react'

import {AiFillCloseCircle} from 'react-icons/ai'
import { CircularProgress } from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {Link, useNavigate} from 'react-router-dom'
import {BsSearch, BsFillStarFill} from 'react-icons/bs'

import Header from '../Header'
import PopupContext from '../../context/popupContext'
import Footer from '../Footer'

import './index.css'

const API = import.meta.env.VITE_API_URL


const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    value: '',
    label: 'All',
  },
  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    value: 'Read',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    value: 'Currently Reading',
    label: 'Currently Reading',
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    value: 'Want to Read',
    label: 'Want to Read',
  },
]

function BookShelves () {
  const [bookShelfName, setBookShelfName] = useState('')
  const [status, setStatus] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [booksList, setBookList] = useState([])
  const [activeButton, setActiveButton] = useState('ALL')
  const [call, setCall] = useState(false)

  const navigate = useNavigate()

  useEffect(()=>{
    const getTheBookShelves = async () => {
        setStatus("INPROGRESS")
        const jwtToken = Cookies.get('jwtToken')
        const url = `${API}/api/books/?read_status=${bookShelfName}&search=${searchInput}`
        const options = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${jwtToken}`,
        },
        }
        const response = await fetch(url, options)
        if (response.ok === true) {
        const data = await response.json()
        const updatedData = data.map(eachItem => ({
            id: eachItem.id,
            title: eachItem.title,
            authorName: eachItem.author_name,
            coverPic: eachItem.cover_pic,
            readStatus: eachItem.read_status,
            rating: eachItem.rating,
        }))
        setStatus("SUCCESS")
        setBookList(updatedData)
        } else {
        setStatus("FAILURE")
        }
        setSearchInput('')
    }

    getTheBookShelves()
  }, [call, bookShelfName] )

  

  const clickTheSearchIcon = () => {
    setCall(prevState=>(!prevState))
    console.log(call)
  }

  const changeTheSearchInput = event => {
    setSearchInput(event.target.value)
  }

  const renderTheLoading = () => (
    <div className="loader-container" testid="loader">
      <CircularProgress type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  const clickTheBookShelvesButton = event => {
    const activeId = event.target.value
    const activeButtonItem = bookshelvesList.find(item => item.id === activeId)
    const {label, value} = activeButtonItem
    // this.setState(
    //   {activeButton: label, bookShelfName: value},
    //   this.getTheBookShelves,
    // )
    setActiveButton(label)
    setBookShelfName(value)
  }

  const renderTheButtons = () => {
    return (
      <ul className="buttons-list-container">
        {bookshelvesList.map(eachItem => {
          const {id, label} = eachItem
          const buttonClassName = activeButton === label
          return (
            <li key={id} className="button-list-item">
              {buttonClassName ? (
                <button
                  type="button"
                  className="active-button"
                  value={id}
                  onClick={clickTheBookShelvesButton}
                >
                  {label}
                </button>
              ) : (
                <button
                  type="button"
                  className="inactive-button"
                  value={id}
                  onClick={clickTheBookShelvesButton}
                >
                  {label}
                </button>
              )}
            </li>
          )
        })}
      </ul>
    )
  }

  const renderTheSuccessView = () => {
    if (booksList.length > 0) {
      return (
        <div className="book-shelves-bottom-view-container">
          <div className="right-top-mobile-view-container">
            <div className="search-icon-container">
              <input
                type="search"
                placeholder="Search"
                className="search-input"
                value={searchInput}
                onChange={changeTheSearchInput}
              />
              <button
                type="button"
                className="search-icon-button"
                testid="searchButton"
                onClick={clickTheSearchIcon}
              >
                <BsSearch size={25} />
              </button>
            </div>
          </div>
          <div className="book-shelves-left-container">
            <h1 className="book-shelves-class-name">Bookshelves</h1>
            {renderTheButtons()}
          </div>
          <div className="book-shelves-right-container">
            <div className="right-top-container">
              <h1 className="all-books">{activeButton} Books</h1>
              <div className="search-icon-container">
                <input
                  type="search"
                  placeholder="Search"
                  className="search-input"
                  value={searchInput}
                  onChange={changeTheSearchInput}
                />
                <button
                  type="button"
                  className="search-icon-button"
                  testid="searchButton"
                  onClick={clickTheSearchIcon}
                >
                  <BsSearch size={25} />
                </button>
              </div>
            </div>
            <ul className="success-list-container">
              {booksList.map(eachItem => {
                const {id} = eachItem
                return (
                  <li className="success-list-item" key={id}>
                    <Link
                      to={`/books/${id}`}
                      className="book-shelves-link-item"
                    >
                      <img
                        src={eachItem.coverPic}
                        alt={eachItem.title}
                        className="success-list-image"
                      />
                      <div className="success-list-content">
                        <h1 className="success-title">{eachItem.title}</h1>
                        <p className="success-author-name">
                          {eachItem.authorName}
                        </p>
                        <div className="average-rating-container">
                          <p className="average-rating">Avg Rating</p>
                          <BsFillStarFill size={15} className="star-image" />
                          <p className="rating">{eachItem.rating}</p>
                        </div>
                        <p className="status">
                          Status :{' '}
                          <span className="success-span">
                            {eachItem.readStatus}
                          </span>
                        </p>
                      </div>
                    </Link>
                  </li>
                )
              })}
            </ul>
            <Footer />
          </div>
        </div>
      )
    }
    return (
      <div className="search-not-found-container">
        <img
          src="https://res.cloudinary.com/dknazoxuw/image/upload/v1680856367/Asset_1_1_ufowke.png"
          alt="no books"
          className="search-not-found-container-image"
        />
        <p className="search-not-found-para">
          Your search for {searchInput} did not find any matches.
        </p>
      </div>
    )
  }

  const clickTheTryAgainButton = () => {
    setCall(prevState=>!prevState)
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
                navigate('/login', {replace:true})
            }
            return (
            <div className="book-shelves-bg-container">
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

export default BookShelves