import Navbar from '@components/ui/Navbar'
import Footer from '@components/ui/Footer'
import {UserProvider, Web3Provider} from "@components/provider/index"

export default function Layout({ children }) {
  return (
    <Web3Provider>
      <UserProvider>
        <Navbar />
        <div className='global-container'>
          {children}
        </div>
        <Footer />
      </UserProvider>
    </Web3Provider>
  )
}