import React from "react";
import GitHubIcon from '@mui/icons-material/GitHub';
import '../assets/styles/Footer.scss'

function Footer() {
  return (
    <footer>
      <div>
        <a href="mailto:heasoo88@gmail.com" className="footer-email">heasoo88@gmail.com</a>
        <a href="https://github.com/hyesuhan" target="_blank" rel="noreferrer"><GitHubIcon/></a>
      </div>
    </footer>
  );
}

export default Footer;