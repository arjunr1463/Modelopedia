import React from 'react'
import ClientSignup from '../../Components/ClientSignup/ClientSignup'
import ClientLoginBanner from '../../Components/Banner/ClientLogin'
import Scroll from "../../Components/ScrollToTop"

function ClientLogin() {
  return (
    <div>
      <Scroll/>
      <ClientLoginBanner/>
       <ClientSignup/>
      
    </div>
  )
}

export default ClientLogin
