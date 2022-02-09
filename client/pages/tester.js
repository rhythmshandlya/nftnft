// import Layout from "../components/layout/Base"
import {useWeb3} from "@components/provider/web3/Web3Provider"
export default function Home() {
    const{web3}=useWeb3();
    const{setWeb3}=useWeb3();
    return (
      <p onClick={()=>setWeb3("chakdephatte")}>{web3}</p>
    )
  }
  