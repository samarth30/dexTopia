import React, { useState } from 'react'
import style from './convert.module.css';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Layout from '../../components/layout/layout';
import Paper from '@mui/material/Paper';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default function Convert() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  return (
    <Layout>

      <Container id="main" className={style.mainContainer}>
        <Box id="mainContainer" className={style.mainContainerInner}>
          <Box className={style.containerTop}>
            <Container className={style.topContainer}>
              <Grid item className={style.topGrid1} lg={4}>
                <Typography variant="h1" className={style.mainText}>Convert</Typography>
              </Grid>
              <Grid item className={style.topGrid2} xs={6} lg={2.25}>
                <Paper elevation={1} className={style.topGrid2Inner}>
                  <Typography className={style.topGrid2Innertext1}>Total Deposits</Typography>
                  <Typography className={style.topGrid2InnerPrice}>$0.00</Typography>
                </Paper>
              </Grid>
              <Grid item className={style.topGrid2} xs={6} lg={2.25}>
                <Paper elevation={1} className={style.topGrid2Inner}>
                  <Typography className={style.topGrid2Innertext1}>Total Deposits</Typography>
                  <Typography className={style.topGrid2InnerPrice}>$0.00</Typography>
                </Paper>
              </Grid>
            </Container>

            <Container className={style.bottomContainer}>
              <Grid item xs={12} lg={9.5} className={style.bottomContainerLeft}>
                <Paper elevation={1} className={style.bottomContainerLeftInner}>
                  <Box className={style.bottomContainerLeftInnerTop}>
                    <Typography variant='h3' className={style.h3text}>
                      Convert & stake Solidly NFTs/Tokens into SOLIDsex
                    </Typography>
                  </Box>

                  <Box className={style.bottomContainerLeftBottom}>
                    <Box className={style.bottomContainerpannelTop}>
                      <Box sx={{ borderBottom: 1, borderColor: 'divider' }} className={style.tabBox}>
                        <Tabs value={value} onChange={handleChange} className={style.tabs}>
                          <Tab label="Solid Token" {...a11yProps(0)} className={style.tab} />
                          <Tab label="Solid NFT" {...a11yProps(1)} className={style.tab} />
                        </Tabs>
                      </Box>
                    </Box>
                    <TabPanel style={{ backgroundColor: 'rgb(32 39 43)' }} value={value} index={0}>
                      <Box className={style.tabPannel1}>
                        <Box className={style.tabPannelrow1}>
                          <Typography variant="h6" className={style.h6Text}>
                            This process is irreversible
                          </Typography>
                        </Box>
                        <Box className={style.tabPannelrow2}>
                          <Typography variant='p' className={style.balancep}>
                            Balance: 0 SOLID
                          </Typography>
                        </Box>
                        <Box className={style.tabPannelrow3}>
                          <Box className={style.tabPannelrow3Left}>
                            <Box className={style.tabPannelrow3LeftInner}>
                              <Box className={style.tabinputFields}>

                                <Input placeholder='Enter Amount' className={style.AmountInput} />
                                <Button className={style.buttontop}>Max</Button>
                              </Box>

                            </Box>

                          </Box>
                          <Box className={style.tabPannelrow3Right}>
                            <Button className={style.approveBtn}>
                              Approve
                            </Button>
                            <Button className={style.approveBtn}>
                              Convert tokens
                            </Button>
                          </Box>
                        </Box>
                        <Box className={style.tabPannelrow4}>
                          <Typography variant='p' className={style.balancep}>
                            Converting 0 SOLID Tokens to 0 SOLIDsex
                          </Typography>
                        </Box>
                      </Box>
                    </TabPanel>
                    <TabPanel style={{ backgroundColor: 'rgb(32 39 43)' }} value={value} index={1}>
                      Item Two
                    </TabPanel>
                  </Box>
                </Paper>
              </Grid>

              {/* <Grid item xs={2.5}>
              <Paper elevation={1} className={style.topGrid2Inner}>
                  <Typography className={style.topGrid2Innertext1}>Total Deposits</Typography>
                  <Typography className={style.topGrid2InnerPrice}>$0.00</Typography>
                </Paper>
              </Grid> */}

              <Grid item xs={12} className={style.bottomTable}>
                <Container className={style.bottomTableInner}>
                  <Grid lg={2.1} item></Grid>
                  <Grid lg={1.85} item>
                    <Typography variant="h6">TVL</Typography>
                  </Grid>
                  <Grid lg={1.5} item>
                    <Typography variant="h6">APR</Typography>

                  </Grid>
                  <Grid lg={1.7} item>
                    <Typography variant="h6">Your Staked SOLIDsex</Typography>

                  </Grid>
                  <Grid lg={1.7} item>
                    <Typography variant="h6">Your Earning</Typography>
                  </Grid>

                </Container>
              </Grid>
            </Container>

          </Box>
        </Box>
      </Container>
    </Layout>

  )
}
