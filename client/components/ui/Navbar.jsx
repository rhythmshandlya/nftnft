import Image from 'next/image';
import React, { useState } from 'react';
import Wallet from '@components/modal/Wallet';

const Navbar = () => {
  const [walletModal, setWalletModal] = useState("");

  return (
    <>
    <nav className="navbar is-dark p-2" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Image src="/images/NFT.png" width="60" height="50" />
        <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
          <a className="button is-light p-3">
            <img src="https://img.icons8.com/external-kiranshastry-gradient-kiranshastry/64/000000/external-wallet-banking-and-finance-kiranshastry-gradient-kiranshastry.png" />
          </a>
        </a>
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          <a className="navbar-item">
            Home
          </a>

          <a className="navbar-item">
            Music
            </a>
            
          <a className="navbar-item">
            Marketplace
          </a>

          <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link">
              More
            </a>

            <div className="navbar-dropdown">
              <a className="navbar-item">
                About
              </a>
              <a className="navbar-item">
                Contact
              </a>
              <hr className="navbar-divider" />
              <a className="navbar-item">
                Report Bugs
              </a>
            </div>
          </div>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <a className="button is-primary">
                <strong> <i className="fas fa-wallet"></i><img src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/000000/external-person-100-most-used-icons-flaticons-lineal-color-flat-icons.png"/></strong>
              </a>
                <a className="button is-light p-3" onClick={() => { setWalletModal("is-active") }}>
                <img src="https://img.icons8.com/external-kiranshastry-gradient-kiranshastry/64/000000/external-wallet-banking-and-finance-kiranshastry-gradient-kiranshastry.png" />
              </a>
            </div>
          </div>
        </div>
      </div>
      </nav>
      <Wallet status={walletModal} setWalletModal={setWalletModal}/>
    </>
  );
};

export default Navbar;
