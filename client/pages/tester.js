// import Layout from "../components/layout/Base"
import {useWeb3} from "@components/provider/web3/Web3Provider"
export default function Home() {
  const { web3Api } = useWeb3();
    return (
      <p onClick={()=>console.log(web3Api)}>hello</p>
    )
  }
  