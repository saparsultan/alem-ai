import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer">
      <p>© 2023 Aisha AI</p>
      <Link to="/policy">Политика конфиденциальности</Link>
    </div>
  );
};

export default Footer;
