import { useWeb3 } from "@components/provider/web3/Web3Provider"

export default function Home() {
    const { web3Api } = useWeb3();
    return (
      <p>{web3Api.isLoading?"Is loading...":(web3Api.web3?"Connected":"Please install metamask")}</p>
    )
}
  