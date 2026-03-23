import React from 'react'

const PopupContext = React.createContext({
  showPopup: false,
  changeThePopupValue: () => {},
})

export default PopupContext