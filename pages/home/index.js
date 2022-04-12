import React from 'react'
import style from './convert.module.css';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import homeStyle from './home.module.css';
import AmountBox from "../../components/amountBox/amountBox";
// import guthubLogo from '../../public/images/github.svg';

// import boxImageLogo from '../../public/images/boxImage.svg';
// import monkerrewardLogo from '../../public/images/monkerreward.svg';
// import monkerdrinkLogo from '../../public/images/monkerdrink.svg';
// import rightArrowLogo from '../../public/images/rightArrow.svg';

import { Link } from '@mui/material';

export default function Home() {
  let arr = [1, 2, 3, 4, 5, 6, 7, 8];
  return (
      <Container id="main" className={style.mainContainer}>
        <Box className={homeStyle.mainContainerInner}>
          <Box className={homeStyle.section1}>
            <Box className={homeStyle.section1Inner}>
              <Box className={homeStyle.section1Col1}>
                <Box className={homeStyle.left}>
                  <p class={homeStyle.section1text}>
                    A yield optimizer
                    <br />
                    for dextopia&nbsp;
                    <span style={{ fontWeight: 'normal' }}>built<br style={{ display: 'block' }} /> on Fantom</span>
                  </p>
                </Box>
                <Box className={homeStyle.right}>
                  {/* <img src={monkerdrinkLogo} alt="monkerrewardLogo" /> */}

                </Box>

              </Box>
              <Box className={homeStyle.section1Col2}>
                <button className={homeStyle.btn}>Stake liquidity</button>
              </Box>
            </Box>
          </Box>

          <Box className={homeStyle.section2}>
            <Grid container style={{ marginTop: '50px' }} >
              <AmountBox text1="dextopia TVL" text2="$535.95m" text3="63% dominance" />
              <AmountBox text1="Total vetopia locked on dextopia" text2="13.79m" text3="31.7% of total locked" />
              <AmountBox text1="Total topia locked" text2="5.08m" text3="74% of total supply locked" />
            </Grid>
          </Box>

          {/* company */}
          <Box className={`${homeStyle.section2} ${homeStyle.section3}`}>
            <Box className={homeStyle.section3Inner}>
              <Box className={homeStyle.section3Left}>
                <p className={homeStyle.para1}>topia PARTNERS</p>
                <p className={`${homeStyle.para2} ${homeStyle.doWhite}`}>
                  Enjoy more voting
                  <br style={{ display: 'block' }} />
                  power and higher rewards.
                </p>
                <p className={`${homeStyle.para2} ${homeStyle.para3}`}>
                  <Link>
                    Find out more
                  </Link>
                </p>

              </Box>
              <Box className={homeStyle.section3Right}>
                <Box className={homeStyle.section3RightInner}>
                  <Grid container spacing={2} className={homeStyle.boxes}>
                    {
                      arr.map((element, i) => (
                        <Grid key={i} item xs={5} md={5} className={homeStyle.boxCompany}>
                          <Link className={`${homeStyle.boxLink}`}>
                            <Box className={homeStyle.boxLinkImage}>
                              {/* <img src={boxImageLogo} alt="boxImageLogo" srcset="" /> */}
                            </Box>
                          </Link>
                        </Grid>
                      ))
                    }

                  </Grid>
                </Box>
              </Box>
            </Box>
          </Box>

          <Box className={homeStyle.section4}>
            <Box className={homeStyle.innerSection4}>
              <Box className={homeStyle.innerSection4Partetions}>
                <Box className={homeStyle.innerSection4Left}>
                  <p className={homeStyle.para1}>LIQUIDITY PROVIDERS</p>
                  <p className={homeStyle.para2}>
                    Get a bigger boost and earn
                    <br style={{ display: 'block' }} />
                    higher yield on your liquidity.
                  </p>
                </Box>
                <Box className={homeStyle.innerSection4Right}>
                  {/* <img src={monkerrewardLogo} alt="monkerrewardLogo" /> */}
                </Box>

              </Box>
            </Box>
          </Box>

          <Box className={homeStyle.section4}>
            <Box className={homeStyle.innerSection4}>
              <Box className={homeStyle.innerSection4Partetions}>
                <Box className={homeStyle.innerSection4Right}>
                  <Box className={homeStyle.innerSection4Right}>
                    {/* <img src={monkerrewardLogo} alt="monkerrewardLogo" /> */}
                  </Box>

                </Box>

                <Box className={homeStyle.innerSection4Left}>
                  <p className={homeStyle.para1}>LIQUIDITY PROVIDERS</p>
                  <p className={homeStyle.para2}>
                    Get a bigger boost and earn
                    <br style={{ display: 'block' }} />
                    higher yield on your liquidity.
                  </p>
                </Box>
              </Box>
            </Box>
          </Box>

          <Box className={homeStyle.section5}>
            <Box className={homeStyle.section5Inner}>
              <p className={homeStyle.para1}>topia HOLDERS</p>
              <p className={homeStyle.para2}>
                Control voting power, decide on vetopia emissions,
                <br style={{ display: 'block' }} />
                earn protocol fees and dextopia expansion.
              </p>
            </Box>
          </Box>

          <Box className={homeStyle.section6}>
            <Box className={homeStyle.section6Inner}>
              <Box className={homeStyle.section6InnerBoxes}>
                <Box className={homeStyle.section6left}>
                  <p className={homeStyle.titleSocial}>AUDITED BY</p>
                  <Box className={homeStyle.boxSocial}>
                    <Box className={homeStyle.boxInner}>
                      <h3 className={homeStyle.boxtext}>Coming Soon</h3>
                    </Box>
                    {/* <img src={rightArrowLogo} alt="rightArrowLogo" srcset="" /> */}
                  </Box>
                </Box>
                <Box className={homeStyle.section6Right}>
                  <p className={homeStyle.titleSocial}>GITHUB</p>
                  <Box style={{ marginLeft: '100px' }} className={homeStyle.boxSocial}>
                    <Box className={homeStyle.boxInner}>
                      {/* <img src={guthubLogo} alt="guthubLogo" /> */}
                    </Box>
                    {/* <img src={rightArrowLogo} alt="rightArrowLogo" srcset="" /> */}
                  </Box>

                  <Box className={homeStyle.section6RightBottom}>
                    <p className={homeStyle.titleSocial}>COMMUNITY</p>

                    <Box className={homeStyle.section6RightBottomLeft}>
                      <Box className={homeStyle.boxSocial}>
                        <Box className={homeStyle.boxInner}>
                          {/* <img src={guthubLogo} alt="guthubLogo" /> */}
                        </Box>
                        {/* <img src={rightArrowLogo} alt="rightArrowLogo" srcset="" /> */}
                      </Box>

                      <Box style={{ marginRight: '14px' }} className={homeStyle.boxSocial}>
                        <Box className={homeStyle.boxInner}>
                          {/* <img src={guthubLogo} alt="guthubLogo" /> */}
                        </Box>
                        {/* <img src={rightArrowLogo} alt="rightArrowLogo" srcset="" /> */}
                      </Box>
                    </Box>

                    <Box className={homeStyle.section6RightBottomRight}>
                      <Box className={homeStyle.boxSocial}>
                        <Box className={homeStyle.boxInner}>
                          {/* <img src={guthubLogo} alt="guthubLogo" /> */}
                        </Box>
                        {/* <img src={rightArrowLogo} alt="rightArrowLogo" srcset="" /> */}
                      </Box>

                      <Box style={{ marginRight: '14px' }} className={homeStyle.boxSocial}>
                        <Box className={homeStyle.boxInner}>
                          {/* <img src={guthubLogo} alt="guthubLogo" /> */}
                        </Box>
                        {/* <img src={rightArrowLogo} alt="rightArrowLogo" srcset="" /> */}
                      </Box>
                    </Box>

                  </Box>


                </Box>
              </Box>
            </Box>
          </Box>


        </Box>
      </Container>
  )
}
