
import Header from '../Header'
import Footer from "../Footer"
import PopupContext from '../../context/popupContext'

import Cookies from "js-cookie"
import { useNavigate, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { CircularProgress } from 'react-loader-spinner'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import { AiFillCloseCircle } from 'react-icons/ai'
import './index.css'

const API = import.meta.env.VITE_API_URL


function Home () {
    const [status, setStatus] = useState('')
    const [relatedBooksList, setRelatedBooksList] = useState([])
    const navigate=useNavigate()

    useEffect(()=>{
        const getTheBooks = async () => {
            setStatus("INPROGRESS")
            const jwtToken = Cookies.get('jwtToken')
            const relatedBooksUrl = `${API}/api/books/top-rated`
            const options = {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                  },
            }
            const response = await fetch(relatedBooksUrl, options)
            if (response.ok === true) {
                const data = await response.json()
                const updatedData = data.map(eachItem => ({
                    id: eachItem.id,
                    title: eachItem.title,
                    authorName: eachItem.author_name,
                    coverPic: eachItem.cover_pic,
                }))
                setStatus("SUCCESS")
                setRelatedBooksList(updatedData)
                console.log("success")
                console.log(updatedData)
            } else {
                setStatus("FAILURE")
            }
        }
        getTheBooks()
    },[])

    const clickTheTryAgainButton = () => {
        console.log('chintu')
    }

    const renderTheLoading = () => (
        <div className="loader-container" testid="loader">
            <CircularProgress type="TailSpin" color="#0284C7" height={50} width={50} />
        </div>
    )

  const renderTheRelatedBooksList = () => {
    return (
      <div className="home-slider-list-container">
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={20}
          slidesPerView={3}
          navigation
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          loop={true}
          breakpoints={{
            1024: { slidesPerView: 3 },
            768: { slidesPerView: 2 },
            480: { slidesPerView: 1 },
          }}
        >
          {relatedBooksList.map(eachItem => {
            const { id, coverPic, title, authorName } = eachItem;

            return (
              <SwiperSlide key={id}>
                <li className="slider-content">
                  <Link
                    to={`/books/${id}`}
                    className="home-normal-link-item"
                  >
                    <img
                      src={coverPic}
                      alt={title}
                      className="cover-pic"
                    />
                    <p className="author-name">{authorName}</p>
                    <h1 className="title">{title}</h1>
                  </Link>
                </li>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    );
  };


    const renderTheSuccessView = () => (
        <>
        <div className="slider-container">
            <div className="desktop-heading-button">
                <h1 className="desktop-slider-container-heading">Top Rated Books</h1>
                <Link to="/shelf">
                    <button type="button" className="desktop-find-books">
                    Find Books
                    </button>
                </Link>
            </div>
              {renderTheRelatedBooksList()}
        </div>
        <Footer />
        </>
    )

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
    return(
      <PopupContext.Consumer>
        {value => {
          const {showPopup, changeThePopupValue} = value
          const clickTheCloseButton = () => {
            changeThePopupValue()
          }
          const clickTheLogoutButtonInPopup = () => {
            Cookies.remove('jwtToken')
            navigate("/login", {replace:true})
          }
          return (
            <div className="home-bg-container">
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
              <h1 className="home-heading">Find Your Next Favorite Books?</h1>
              <p className="home-para">
                You are in the right place. Tell us what titles or genres you
                have enjoyed in the past, and we will give you surprisingly
                insightful recommendations.
              </p>
              <Link to="/shelf">
                <button type="button" className="find-books">
                  Find Books
                </button>
              </Link>
              {renderTheStatus()}
            </div>
          )
        }}
      </PopupContext.Consumer>    
    )
}

export default Home