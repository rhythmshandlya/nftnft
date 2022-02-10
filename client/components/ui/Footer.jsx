import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="content has-text-centered">
        <p>Copyright © {new Date().getFullYear()} QUFI </p>
      </div>
    </footer>
  );
};

export default Footer;
