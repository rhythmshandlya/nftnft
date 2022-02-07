// import Layout from "../components/layout/Base"
import {useWeb3} from "@components/provider/web3/Web3Provider"
export default function Home() {
    const{web3}=useWeb3();
    console.log(web3)
    return (
      <p>{web3}</p>
    )
  }
  