import React, { useRef, useState, useEffect } from 'react'
import style from "@styles/Wallet.module.css"
import { useWeb3 } from "@components/provider/web3/Web3Provider"

const Wallet = ({ status, setWalletModal }) => {
   
    
    const { web3Api } = useWeb3();
    const [metamaskBtn, setMetamaskBtn] = useState("Connect Metamask");
    const btn = useRef(null);

    const modalStyle = {
        width: "700px",
        height: "340px"
    }

    const handleConnection = async () => {
        if (metamaskBtn === "Get Metamask Today") { 
            window.open("https://metamask.io/download/", "_blank");
            window.location.reload();
        }
        try {
            const res = await web3Api.provider.request({ method: 'eth_requestAccounts' })
        }
        catch (err) {
            if (err.code === -32002) {
                setMetamaskBtn("Access Denied")
                window.location.reload()
            } else {
                setMetamaskBtn("Get Metamask Today");
            } 
        }
    }
    function sender(){
        const wallet = await $.getJSON('Wallet.json')
        App.contracts.TodoList = TruffleContract(todoList)
        App.contracts.TodoList.setProvider(App.web3Provider)
        // Hydrate the smart contract with values from the blockchain
        App.todoList = await App.contracts.TodoList.deployed()
    }
    return (
        <div className={`modal ${status}`}>
            <div className="modal-background"></div>
            <div className="card animate__animated animate__bounceInDown" style={modalStyle}>
                <div className="card-content">
                    <div className="content" className={style.dFlex}>
                        <a className="button is-light p-3" ref={btn} onClick={() => { handleConnection() }}>
                            <img src="https://docs.metamask.io/metamask-fox.svg" className='p-2' />
                            {metamaskBtn}
                        </a>
                        <button onClick={sender}>add money</button>
                        <img width="35px" className='pointer'
                            onClick={() => { setWalletModal("") }}
                            src="https://img.icons8.com/external-vitaliy-gorbachev-fill-vitaly-gorbachev/50/000000/external-close-sales-vitaliy-gorbachev-fill-vitaly-gorbachev.png" />
                    </div>
                </div>
            </div>
            <div className="modal-content">
            </div>
        </div>
    );
};

export default Wallet;
