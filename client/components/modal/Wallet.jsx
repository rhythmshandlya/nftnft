import React from 'react'
import style from "@styles/Wallet.module.css"

const Wallet = ({ status, setWalletModal }) => {
    
    const modalStyle = {
        width: "700px",
        height: "340px"
    }

    return (
        <div className={`modal ${status}`}>
            <div className="modal-background"></div>
            <div className="card" style={modalStyle}>
                <div className="card-content">
                    <div className="content">
                        <a className="button is-light p-3" onClick={() => { setWalletModal("is-active") }}>
                            <img src="https://docs.metamask.io/metamask-fox.svg" className='p-2'/>
                            Connect Metamask
                        </a>
                    </div>
                </div>
            </div>
            <div className="modal-content">
            </div>
        </div>
    );
};

export default Wallet;
