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
                    <div className="content" className={style.dFlex}>
                        <a className="button is-light p-3" onClick={() => { setWalletModal("is-active") }}>
                            <img src="https://docs.metamask.io/metamask-fox.svg" className='p-2' />
                            Connect Metamask
                        </a>
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
