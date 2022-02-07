import Navbar from '@components/ui/Navbar'
import Footer from '@components/ui/Footer'

import {Web3Provider, useWeb3} from "@components/provider/index"

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
        <div className='global-container'>
          {children}
        </div>
      <Footer />
    </>
  )
}