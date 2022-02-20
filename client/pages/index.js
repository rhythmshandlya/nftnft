import {useEffect, useState } from "react";
import { useWeb3 } from "@components/provider/web3/Web3Provider"
import { User } from "@components/provider/user/UserProvider"
import chain from "@util/chainMap";


export default function Home() {
  
  const { web3Api } = useWeb3();
  const { user, setUser } = User();

  useEffect(async () => {

    const networkId = window?.ethereum?.networkVersion;
    const isUnlocked = await window?.ethereum?._metamask.isUnlocked();
    console.log(user);
    
    setUser({
      ...user,
      isUnlocked,
      networkId,
      network: chain.get(Number(networkId))
    });
    

    window?.ethereum?.on('accountsChanged', async function (account) {
      console.log(web3Api);
      // if (web3Api.contract) {
      //     let bal;
      //     try {
      //         bal = Number(await web3Api.contract.walletContract.getBalance({ from: account[0] }));
      //     }
      //     catch (err) {
      //         console.log(err);
      //     };
      //     setUser({
      //         ...user,
      //         balance: bal,
      //         address: account[0],
      //         isUnlocked: true
      //     });
      // } else {
      //     alert("No Account Selected!");
      // }
      //document.getElementById('connect-metamask').innerText = "Connect Metamask";
    });
      
    window?.ethereum?.on('networkChanged', function (networkId) {
      setUser({
        ...user,
        networkId,
        network: chain.get(Number(networkId))
      });
    })
  }, []);

  return (
      <p>{web3Api.isLoading?"Is loading...":(web3Api.web3?"Connected":"Please install metamask")}</p>
  )
}
  