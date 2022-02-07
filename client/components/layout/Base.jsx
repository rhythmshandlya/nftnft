import Navbar from '@components/ui/Navbar'
import Footer from '@components/ui/Footer'
import {Web3Provider} from "@components/provider/index"

export default function Layout({ children }) {
  return (
    <Web3Provider>
      <Navbar />
        <div className='global-container'>
          {children}
        </div>
      <Footer />
    </Web3Provider>
  )
}