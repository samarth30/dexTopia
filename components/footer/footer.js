import React from 'react'
import style from './footer.module.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
// import greenCircle from '../../public/images/greenCircle.svg';
import Link from '@mui/material/Link';


export default function Footer() {
  return (
    <footer className={style.footerContainer}>
        <div className={style.footerBoxDiv}>
          <div className={style.footerBox}>
              <div className={style.column1}>
                  {/* <p className={style.footerLinksHeading}>Links</p> */}
                  <p className={style.footerLinksBody}>Partners</p>
                  <p className={style.footerLinksBody}>Roadmap</p>
                  <p className={style.footerLinksBody}>Team</p>
              </div>
              <div className={style.column2}>
                  {/* <p className={style.footerLinksHeading}>Links</p> */}
                  <p className={style.footerLinksBody}>Partners</p>
                  <p className={style.footerLinksBody}>Roadmap</p>
                  <p className={style.footerLinksBody}>Team</p>
              </div>
              <div className={style.column3}>
                  {/* <p className={style.footerLinksHeading}>Title</p> */}
                  <p className={style.footerLinksBody}>Terms and Conditions</p>
                  <p className={style.footerLinksBody}>Privacy Policy</p>
              </div>
              <div className={style.column4}>
                  <div className={style.footerImgDiv}>
                      <img src="./images/logodex.png" alt="footer logo" />
                  </div>
              </div>
          </div>
          <hr />
          {/* <div className={style.belowHrBox}>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellendus temporibus quia dolores ab blanditiis alias, ducimus et facere mollitia incidunt ea ratione architecto quo, esse laudantium ipsa fuga voluptates omnis!
            </p>
          </div> */}
        </div>
    </footer>
  )
}
