import React, { useState, useEffect, useCallback } from "react";
import Mymodel from './Mymodel'
import {
  Paper,
  Typography,
  Button,
  CircularProgress,
  InputAdornment,
  TextField,
  MenuItem,
  Select,
  Grid,
  Box,
  Container,
  Tab,
  Tabs,
  Input,
  InputLabel,
  FormControl
} from "@mui/material";
import BigNumber from "bignumber.js";
import { Search } from "@mui/icons-material";
import { useRouter } from "next/router";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import style from "./ssVotes.module.css";
import { formatCurrency } from "../../utils/utils";

import GaugesTable from "./ssVotesTable.js";

import stores from "../../stores";
import { ACTIONS } from "../../stores/constants/constants";

export default function ssConvert() {
  const router = useRouter();

  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);

  const [gauges, setGauges] = useState([]);
  const [poolReward, setPoolReward] = useState([]);
  const [poolStaked, setPoolStaked] = useState([]);
  const [stakingRewardStaked, setstakingRewardStaked] = useState({
    dysTopiaEarning: "0",
stakedBalance: "0",
topiaEarning: "0"
  });
  const [voteLoading, setVoteLoading] = useState(false);
  const [votes, setVotes] = useState([]);
  const [veToken, setVeToken] = useState(null);
  const [token, setToken] = useState(null);
  const [vestNFTs, setVestNFTs] = useState([]);
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("token");

  const [value, setValue] = useState(0);
  const [modelTabs, setModeltabs] = useState(0);

  const [open, setOpen] = useState(false);
  const [selectDropdown, setSelectDropdown] = useState("")

  useEffect(() => {
    const nfts = stores.stableSwapStore.getStore('vestNFTs');
    setVestNFTs(nfts)
  }, [])
  

  const openModel = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  
  const handleChanges = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeModeltab = (event, newValue) => {
    setModeltabs(newValue);
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  const ssUpdated = () => {
    setVeToken(stores.stableSwapStore.getStore("veToken"));
    const as = stores.stableSwapStore.getStore("pairs");

    const filteredAssets = as;
    setGauges(filteredAssets);

    const poolRewards = stores.dispatcher.dispatch({
      type: ACTIONS.POOLREWARDS,
      content: { filteredAssets },
    });

    const ass = stores.stableSwapStore.getStore("poolRewards");
    console.log(ass, "pipppp");
    setPoolReward(ass);

    const asss = stores.stableSwapStore.getStore("poolStakedBalance");
    console.log(asss, "pipp");
    setPoolStaked(asss);

    const poolStakedBalances = stores.dispatcher.dispatch({
      type: ACTIONS.POOLSTAKED,
      content: { filteredAssets },
    });
    const stakingRewardsStakedBalance = stores.dispatcher.dispatch({
      type: ACTIONS.DEXTOPIA_STAKING_REWARD_STAKEDAMOUNT,
      content: {},
    });
    const stakingRewardsStakedBalancedata = stores.stableSwapStore.getStore("StakingRewardStakedBalances");
    console.log(stakingRewardsStakedBalancedata,"chandler")
    // console.log(stakingRewardsStakedBalancedata?.stakedBalance , "chandler")
    setstakingRewardStaked({   dysTopiaEarning: stakingRewardsStakedBalancedata?.dysTopiaEarning,
    stakedBalance: stakingRewardsStakedBalancedata?.stakedBalance,
    topiaEarning: stakingRewardsStakedBalancedata?.topiaEarning})
    
    const tockenLockerDatas = stores.dispatcher.dispatch({
      type: ACTIONS.DEXTOPIA_TOCKEN_LOCKER_DATA,
      content: {},
    });

    const nfts = stores.stableSwapStore.getStore("vestNFTs");
    setVestNFTs(nfts);

    if (nfts && nfts.length > 0) {
      setToken(nfts[0]);
    }

    if (
      nfts &&
      nfts.length > 0 &&
      filteredAssets &&
      filteredAssets.length > 0
    ) {
      stores.dispatcher.dispatch({
        type: ACTIONS.GET_VEST_VOTES,
        content: { tokenID: nfts[0].id },
      });
      // stores.dispatcher.dispatch({ type: ACTIONS.GET_VEST_BALANCES, content: { tokenID: nfts[0].id } })
    }

    forceUpdate();
  };

  const [depositInput, setDepositInput] = useState("0");

  const onInputField = async (e) => {
    setDepositInput(e.target.value);
  };

  const onDeposit = async () => {
    // setDepositLoading(true)
    await stores.dispatcher.dispatch({
      type: ACTIONS.VE_DEPOSITOR_DEPOSIT,
      content: { amount: depositInput },
    });
  };


  const [depositInputveTopia, setDepositInputVeTopia] = useState("0");

  const onInputDepositStakeVtopia = async (e) => {
    setDepositInputVeTopia(e.target.value);
  };
  const onDepositVeTopia = async ()=>{
    
    await stores.dispatcher.dispatch({
      type: ACTIONS.DEXTOPIA_STAKING_REWARD_DEPOSIT,
      content: { amount: depositInputveTopia},
    });
  }


  const onWithdrawVeTopia = async ()=>{
    
    await stores.dispatcher.dispatch({
      type: ACTIONS.DEXTOPIA_STAKING_REWARD_WITHDRAW,
      content: { amount: depositInputveTopia },
    });
  }
  
  const onClaimVeTopia = async ()=>{
    
    await stores.dispatcher.dispatch({
      type: ACTIONS.DEXTOPIA_STAKING_REWARD_GETREWARD,
      content: {  },
    });
  }

  useEffect(() => {
    const vestVotesReturned = (vals) => {
      setVotes(
        vals.map((asset) => {
          return {
            address: asset?.address,
            value: BigNumber(
              asset && asset.votePercent ? asset.votePercent : 0
            ).toNumber(0),
          };
        })
      );
      forceUpdate();
    };

    const vestBalancesReturned = (vals) => {
      setGauges(vals);
      forceUpdate();
    };

    const stableSwapUpdated = () => {
      ssUpdated();
    };

    const voteReturned = () => {
      setVoteLoading(false);
    };

    ssUpdated();

    // stores.dispatcher.dispatch({ type: ACTIONS.GET_VEST_NFTS, content: {} })

    stores.emitter.on(ACTIONS.UPDATED, stableSwapUpdated);
    stores.emitter.on(ACTIONS.VOTE_RETURNED, voteReturned);
    stores.emitter.on(ACTIONS.ERROR, voteReturned);
    stores.emitter.on(ACTIONS.VEST_VOTES_RETURNED, vestVotesReturned);
    // stores.emitter.on(ACTIONS.VEST_NFTS_RETURNED, vestNFTsReturned)
    stores.emitter.on(ACTIONS.VEST_BALANCES_RETURNED, vestBalancesReturned);

    return () => {
      stores.emitter.removeListener(ACTIONS.UPDATED, stableSwapUpdated);
      stores.emitter.removeListener(ACTIONS.VOTE_RETURNED, voteReturned);
      stores.emitter.removeListener(ACTIONS.ERROR, voteReturned);
      stores.emitter.removeListener(
        ACTIONS.VEST_VOTES_RETURNED,
        vestVotesReturned
      );
      // stores.emitter.removeListener(ACTIONS.VEST_NFTS_RETURNED, vestNFTsReturned)
      stores.emitter.removeListener(
        ACTIONS.VEST_BALANCES_RETURNED,
        vestBalancesReturned
      );
    };
  }, []);

  const onVote = () => {
    setVoteLoading(true);
    stores.dispatcher.dispatch({
      type: ACTIONS.VOTE,
      content: { votes, tokenID: token.id },
    });
  };

  let totalVotes = votes.reduce((acc, curr) => {
    return BigNumber(acc)
      .plus(BigNumber(curr.value).lt(0) ? curr.value * -1 : curr.value)
      .toNumber();
  }, 0);

  const handleChange = (event) => {
    setToken(event.target.value);
    stores.dispatcher.dispatch({
      type: ACTIONS.GET_VEST_VOTES,
      content: { tokenID: event.target.value.id },
    });
  };

  const onSearchChanged = (event) => {
    setSearch(event.target.value);
  };

  const onBribe = () => {
    router.push("/bribe/create");
  };

  const renderMediumInput = (value, options) => {
    return (
      <div className={classes.textField}>
        <div className={classes.mediumInputContainer}>
          <Grid container>
            <Grid item lg="auto" md="auto" sm={12} xs={12}>
              <Typography variant="body2" className={classes.smallText}>
                Please select your veNFT:
              </Typography>
            </Grid>

            <Grid item lg={6} md={6} sm={12} xs={12}>
              <div className={classes.mediumInputAmount}>
                <Select
                  fullWidth
                  value={value}
                  onChange={handleChange}
                  inputProps={{
                    className: classes.mediumInput,
                  }}
                >
                  {options &&
                    options.map((option) => {
                      return (
                        <MenuItem key={option.id} value={option}>
                          <div className={classes.menuOption}>
                            <Typography>Token #{option.id}</Typography>
                            <div>
                              <Typography
                                align="right"
                                className={classes.smallerText}
                              >
                                {formatCurrency(option.lockValue)}
                              </Typography>
                              <Typography
                                color="textSecondary"
                                className={classes.smallerText}
                              >
                                {veToken?.symbol}
                              </Typography>
                            </div>
                          </div>
                        </MenuItem>
                      );
                    })}
                </Select>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  };

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

  return (
    <>
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
                  Convert & stake dextopia NFTs/Tokens into GAStopia
                </Typography>
              </Box>

              <Box className={style.bottomContainerLeftBottom}>
                <Box className={style.bottomContainerpannelTop}>
                  <Box sx={{ borderBottom: 1, borderColor: 'divider' }} className={style.tabBox}>
                    <Tabs value={value} onChange={handleChanges} className={style.tabs}>
                        <Tab label="Solid Token" {...a11yProps(0, "page")} className={style.tab} />
                        <Tab label="Solid NFT" {...a11yProps(1, "page")} className={style.tab} />
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
                        Balance: 0 vetopia
                      </Typography>
                    </Box>
                    <Box className={style.tabPannelrow3}>
                      <Box className={style.tabPannelrow3Left}>
                        <Box className={style.tabPannelrow3LeftInner}>
                          <Box className={style.tabinputFields}>

                            <Input placeholder='Enter Amount' className={style.AmountInput} value={depositInput} onChange={onInputField} />
                            <Button className={style.buttontop}>Max</Button>
                          </Box>

                        </Box>

                      </Box>
                      <Box className={style.tabPannelrow3Right}>
                        {/* <Button className={style.approveBtn} style={{ marginRight: '10px' }} onClick={() => onDeposit()}>
                          Approve
                        </Button> */}
                        <Button className={style.approveBtn} onClick={() => onDeposit()}>
                          Convert tokens
                        </Button>
                      </Box>
                    </Box>
                    <Box className={style.tabPannelrow4}>
                      <Typography variant='p' className={style.balancep}>
                        Converting 0 vetopia Tokens to 0 GAStopia
                      </Typography>
                    </Box>
                  </Box>
                </TabPanel>
                <TabPanel style={{ backgroundColor: 'rgb(32 39 43)' }} value={value} index={1}>
                <Box className={style.tabPannel1}>
                        <Box className={style.tabPannelrow1}>
                          <Typography variant="h6" className={style.h6Text}>
                            This process is irreversible
                          </Typography>
                        </Box>
                        <Box className={style.tabPannelrow2}>
                          <Typography variant='p' className={style.balancep}>
                            Balance: 0 vetopia
                          </Typography>
                        </Box>
                        <Box className={style.tabPannelrow3}>
                          <Box className={style.tabPannelrow3Left}>
                            <Box className={style.tabPannelrow3LeftInner}>
                              <Box className={style.marginTop}>
                                <FormControl sx={{ m: 1, minWidth: 300 }}>
                                  <InputLabel style={{color: '#fff'}} id="demo-multiple-chip-label">Select Token ID</InputLabel>
                                  <Select
                                    labelId="demo-multiple-chip-label"
                                    id="demo-multiple-chip"
                                    className={style.tabinputFieldsSelection}
                                    value={selectDropdown}
                                    onChange={(e) => {setSelectDropdown(e.target.value)}}
                                    style={{color: "#fff !important"}}
                                  >
                                    {vestNFTs && vestNFTs.map((vest) => {
                                      return (
                                        <MenuItem key={vest.id} value={vest}>
                                          <div className={ style.menuOption }>
                                            <Typography>Token #{vest.id}</Typography>
                                            <div>
                                              <Typography align='right' className={ style.smallerText }>{ formatCurrency(vest.lockValue) }</Typography>
                                              <Typography color='textSecondary' className={ style.smallerText }>{veToken?.symbol}</Typography>
                                            </div>
                                          </div>
                                        </MenuItem>
                                      )
                                    })}
                                  </Select>
                                </FormControl>
                              </Box>
                            </Box>
                          </Box>
                          <Box className={style.tabPannelrow3Right} style={{height: "60px"}}>
                            <Button className={style.approveBtn}>
                              Convert tokens
                            </Button>
                          </Box>
                        </Box>
                        <Box className={style.tabPannelrow4}>
                          <Typography variant='p' className={style.balancep}>
                            Converting 0 vetopia Tokens From the selected vetopia NFT to 0 Gasly
                          </Typography>
                        </Box>
                      </Box>
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
              <Grid lg={2.1} item className={style.tableheaderGText}></Grid>
              <Grid lg={1.85} item>
                <Typography variant="h6" className={style.tableheaderGText}>TVL</Typography>
              </Grid>
              <Grid lg={1.5} item>
                <Typography variant="h6">APR</Typography>

              </Grid>
              <Grid lg={1.7} item>
                <Typography variant="h6">Your Staked GAStopia</Typography>

              </Grid>
              <Grid lg={1.7} item>
                <Typography variant="h6">Your Earning</Typography>
              </Grid>
            </Container>
            <Paper elevation={1} className={style.tableRow}>
              <Box className={style.tableRowInner}>
                <Container className={style.tableBoxes}>
                  <Grid item xs={12} lg={2}>
                    <Typography variant="p">
                      Staked GAStopia
                    </Typography>
                  </Grid>
                  <Grid item xs={12} lg={1.75}>
                    <Typography variant="p">6,656,064.4</Typography>
                  </Grid>
                  <Grid item xs={12} lg={1.75}>
                    <Typography variant="p">26.1%</Typography>
                  </Grid>
                  <Grid item xs={12} lg={1.75}>
           
                    <Typography variant="p">{stakingRewardStaked !== "undefined" &&  formatCurrency(
                          BigNumber(stakingRewardStaked?.stakedBalance).div(10 ** 18)
                        )}</Typography>
                  </Grid>
                  <Grid item xs={6} lg={1.5}>
                    <Typography variant="p">{stakingRewardStaked !== "undefined" &&  formatCurrency(
                          BigNumber(stakingRewardStaked?.dysTopiaEarning).div(10 ** 18)
                        )} dystopia </Typography>
                    <Typography variant="p">{stakingRewardStaked !== "undefined" &&  formatCurrency(
                          BigNumber(stakingRewardStaked?.topiaEarning).div(10 ** 18)
                        )} vetopia</Typography>
                  </Grid>
                  <Grid item xs={6} lg={1.5}>
                    <Button className={style.approveBtn} onClick={openModel}>Manage</Button>
                  </Grid>
                  <Grid item xs={6} lg={1.5}>
                    <Button className={style.approveBtn} onClick={()=>onClaimVeTopia()}>Claim Earnings</Button>
                  </Grid>

                </Container>
              </Box>
            </Paper>
          </Grid>
        </Container>
      </Box>
    </Box>
  </Container>
        {
          open &&
          <Mymodel text="Manage SOLIDtopia" open={open} handleClose={handleClose}>
  
            <Box className={style.bottomContainerLeftBottom}>
              <Box className={style.bottomContainerpannelTop}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }} className={style.tabBox}>
  
                  <Tabs value={modelTabs} onChange={handleChangeModeltab} className={style.tabs}>
                    <Tab label="Stake" {...a11yProps(0, "model")} className={style.tab} />
                    <Tab label="Withdraw" {...a11yProps(1, "model")} className={style.tab}  />
                  </Tabs>
  
                </Box>
              </Box>
  
              <TabPanel style={{ backgroundColor: 'rgb(32 39 43)' }} value={modelTabs} index={0}>
                <Box className={style.tabPannel1}>
                  <Box className={style.tabPannelrow3}>
                    <Box className={style.tabPannelrow3Left}>
                      <Box className={style.tabPannelrow3LeftInner}>
                        <Box className={style.tabinputFields}>
                          <Input placeholder='Enter Amount' className={style.AmountInput} value={depositInputveTopia} onChange={onInputDepositStakeVtopia}/>
                          <Button className={style.buttontop}>Max</Button>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                  <Box className={`${style.modelButtons}`} style={{display: "flex", flexFlow: "row wrap", marginLeft: "0px !important", marginTop: "20px"}}>
                    {/* <Button className={style.approveBtn} style={{ marginRight: '10px' }}>
                      Approve
                    </Button> */}
                    <Button className={style.approveBtn} style={{background: "rgb(2, 119, 250)", color: "#fff"}} onClick={()=>{onDepositVeTopia()}} >
                      Convert tokens
                    </Button>
                  </Box>
                </Box>
              </TabPanel>
              <TabPanel style={{ backgroundColor: 'rgb(32 39 43)' }} value={modelTabs} index={1}>
                <Box className={`${style.tabPannel1} ${style.tabPannel1Modell}`}>
                  <Box className={style.tabPannelrow3}>
                    <Box className={style.tabPannelrow3Left}>
                      <Box className={style.tabPannelrow3LeftInner}>
                        <Box className={style.marginTop}>
                          <Box className={style.tabPannelrow3LeftInner}>
                            <Box className={style.tabinputFields}>
                              <Input placeholder='Enter Amount' className={style.AmountInput} value={depositInputveTopia} onChange={onInputDepositStakeVtopia}/>
                              <Button className={style.buttontop}>Max</Button>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                  <Box className={`${style.modelButtons}`} style={{display: "flex", flexFlow: "row wrap", marginLeft: "0px !important", marginTop: "20px"}}>
                    <Button className={style.approveBtn} style={{background: "rgb(2, 119, 250)", color: "#fff"}}  onClick={()=>{onWithdrawVeTopia()}} >
                      Withdraw
                    </Button>
                  </Box>
                </Box>
              </TabPanel>
            </Box>
  
            <Typography id="modal-modal-description" style={{ textAlign: 'center', borderTop: '1px solid rgb(2, 119, 250)', paddingTop: '10px' }} sx={{ mt: 2 }}>
              Please Approve the contract
            </Typography>
          </Mymodel>
        }
        </>
  );
}
