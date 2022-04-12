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
    <footer className={style.footerMain}>
      <Box className={style.footerInner}>
        <Container className={style.footerDataContainer}>

          <Grid item lg={1.75} className={style.footer2}>
            <Box className={style.footer2Inner}>
              {/* <img src={greenCircle} alt="greenCircle" srcSet="" /> */}
              <Typography className={style.footer2Innerp}>
                <Link className={style.footer2InnerLink}>
                  &nbsp; 33131406
                </Link>
              </Typography>
            </Box>

          </Grid>

          <Grid item md={3} lg={1}></Grid>

          <Grid item xs={5} md={2.4} lg={4} className={style.footer4}>
            <Box className={style.footer4Inner}>
              <Typography className={style.footer4Innerp1}>
                &nbsp; dextopia Voting Power &nbsp;
              </Typography>
              <Typography className={style.footer4Innerp2}>
                <Link className={style.footer4Innerp2Link}>
                  13,789,805.5 vetopia
                </Link>
              </Typography>

            </Box>
          </Grid>

          <Grid item xs={3} md={1.25} lg={2.5} className={style.footer5}>
            <Box className={style.footer5Inner}>
              <Typography className={style.footer5Innerp1}>topia Price &nbsp; </Typography>
              <Typography className={style.footer5Innerp2}>
                <Link className={style.footer5Innerp2Link}>
                  $4.53
                </Link>
              </Typography>

            </Box>
          </Grid>

          <Grid item xs={3} md={1.25} lg={2.5} className={style.footer6}>
            <Box className={style.footer6Inner}>
              <Typography className={style.footer6Innerp1}>topia Price &nbsp; </Typography>
              <Typography className={style.footer6Innerp2}>
                  $4.53
              </Typography>
            </Box>
          </Grid>
        </Container>
      </Box>
    </footer>
  )
}
