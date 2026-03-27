import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { useState } from "react"
import Login  from "./components/Login"
import Register from "./components/Register"
import Home from "./components/Home"
import PopupContext from "./context/popupContext"
import './App.css'
import BookShelves from "./components/BookShelves"
import BookDetails from "./components/BookDetails"
import ProtectedRoute from "./components/ProtectedRoute"
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
          <Route path="/login" element={<ProtectedRoute><Login/></ProtectedRoute>}/>
          <Route path="/register" element={<ProtectedRoute><Register/></ProtectedRoute>}/>
          <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
          <Route path="/shelf" element={<ProtectedRoute><BookShelves/></ProtectedRoute>}/>
          <Route path="/books/:id" element={<ProtectedRoute><BookDetails/></ProtectedRoute>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </PopupContext.Provider>
    </Router>
  )
}

export default App
