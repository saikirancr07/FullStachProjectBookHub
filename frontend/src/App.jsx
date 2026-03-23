import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { useState } from "react"
import Login  from "./components/Login"
import Home from "./components/Home"
import PopupContext from "./context/popupContext"
import './App.css'
import BookShelves from "./components/BookShelves"
import BookDetails from "./components/BookDetails"
import NotFound from "./components/NotFound"

function App() {
  const [showPopup, setShowPopup]=useState(false)

  const changeThePopupValue=()=>{
    setShowPopup(prevState=>(!prevState))
  }

  return (
    <Router>
      <PopupContext.Provider
        value={{
          showPopup,
          changeThePopupValue:changeThePopupValue
        }}
      >
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/" element={<Home/>}/>
          <Route path="/shelf" element={<BookShelves/>}/>
          <Route path="/books/:id" element={<BookDetails/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </PopupContext.Provider>
    </Router>
  )
}

export default App
