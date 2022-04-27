import React, { useState } from 'react'
import style from './Partner.module.css';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import CustomBox from './customBox/customBox';
import Alert from '@mui/material/Alert';

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

export default function Partner() {
  const [value, setValue] = useState(0);

  const [modelTabs, setModeltabs] = useState(0);

  const [open, setOpen] = useState(false);

  const openModel = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  const handleChangeModeltab = (event, newValue) => {
    setModeltabs(newValue);
  };


  function a11yProps(index, modelName) {
    return {
      id: `simple-tab-${modelName}-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }


  return (
      <Container id="main" className={style.mainContainer}>
        <Box id="mainContainer" className={style.mainContainerInner}>
          <Box className={style.containerTop}>
            <Container className={style.topContainer}>
              <Grid item className={style.topGrid1} lg={4}>
                <Typography variant="h1" className={style.mainText}>Partner</Typography>
              </Grid>
              <Grid item className={style.topGrid2}>
                <Paper elevation={1} className={style.topGrid2Inner}>
                <Typography className={style.topGrid2Innertext1}>Partners</Typography>
                  <Typography className={style.topGrid2InnerPrice}>8/15</Typography>
                </Paper>
              </Grid>
              <Grid item className={style.topGrid2} xs={6} lg={2.25}>
                <Paper elevation={1} className={style.topGrid2Inner}>
                  <Typography className={style.topGrid2Innertext1}>Early Partner Deadline</Typography>
                  <Typography className={style.topGrid2InnerPrice}>$0.00</Typography>
                </Paper>
              </Grid>
              <Grid item className={style.topGrid2} xs={6} lg={2.25}>
                <Paper elevation={1} className={style.topGrid2Inner}>
                  <Typography className={style.topGrid2Innertext1}>Final Partner Deadline</Typography>
                  <Typography className={style.topGrid2InnerPrice}>$0.00</Typography>
                </Paper>
              </Grid>
            </Container>
            
            <Container className={style.topContainer}>
              <Box style={{border: "2px solid #1c6de0", background: "#194172", color: "white", padding: "1rem 1rem", width: "100%", textAlign: "center"}}>
                <Typography color="common.white" style={{fontSize: "1.5rem"}}>First 15 Protocols to convert their NFT. Become a Partner!. Find out More</Typography>
              </Box>
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
                          <Tab label="Solid Token" {...a11yProps(0, "page")} className={style.tab} />
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
                              <Box className={style.marginTop}>
                                <FormControl sx={{ m: 1, minWidth: 200 }}>
                                  <InputLabel style={{ color: '#fff' }} id="demo-multiple-chip-label">Select Token ID</InputLabel>
                                  <Select
                                    labelId="demo-multiple-chip-label"
                                    id="demo-multiple-chip"
                                    className={style.tabinputFieldsSelection}
                                    value={null}
                                    onChange={null}
                                  >
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                  </Select>
                                </FormControl>
                              </Box>
                            </Box>
                          </Box>
                        </Box>
                        <Box className={style.tabPannelrow3Right}>
                          <Button className={style.approveBtn}>
                            Convert tokens
                          </Button>
                        </Box>
                        <Box className={style.tabPannelrow4}>
                          <Typography variant='p' className={style.balancep}>
                            Converting 0 SOLID Tokens From the selected SOLID NFT to 0 SOLIDDsex
                          </Typography>
                        </Box>
                      </Box>
                    </TabPanel>
                  </Box>
                </Paper>
                <Box style={{ display: "flex", flexWrap: "wrap", margin: "1rem 0", background: "transparent", justifyContent: "space-between" }}>
                      <Box style={{ width: "45%", margin: '0 0.5rem', padding: "1.5rem", color: "white", background: "#1f272b", border: "4px solid #194172" }}>
                        <Typography variant='h4'>
                          Negative Vote Protection
                        </Typography>
                        <Typography variant='h6'>
                          Only Available to early partners
                        </Typography>
                      </Box>
                      <Box style={{ width: "45%", margin: '0 0.5rem', padding: "1.5rem", color: "white", background: "#1f272b", border: "4px solid #194172" }}>
                        <Typography variant='h4'>
                          Partners whitelist token
                        </Typography>
                        <Typography variant='h6'>
                          Only Available to early partners
                        </Typography>
                      </Box>
                </Box>
                <Box style={{background: "#1f272b", padding: "1.5rem", margin: "1rem 0", width: "30%", border: "4px solid #194172"}}>
                    <Typography variant='h4' color='common.white'>
                      Partner Claim
                    </Typography>
                    <Typography variant='h6' color='common.white'>
                      Claimable Sex
                    </Typography>
                    <Typography variant='h3' color='common.white'>
                      0
                    </Typography>
                    <Button variant="contained">claim</Button>
                </Box>
              </Grid>
            </Container>

          </Box>
        </Box >
      </Container >

  )
}
