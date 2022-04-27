import React, { useState, useEffect, useCallback } from "react";
import {
  Paper,
  Typography,
  Button,
  MenuItem,
  Select,
  Grid,
  Box,
  Container,
  Tab,
  Tabs,
  InputLabel,
  FormControl,
} from "@mui/material";
import BigNumber from "bignumber.js";
import { useRouter } from "next/router";
import style from './ssPartners.module.css';
import { formatCurrency } from "../../utils/utils";
import stores from "../../stores";
import { ACTIONS } from "../../stores/constants/constants";

export default function ssPartners() {
  const router = useRouter();

  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);

  const [gauges, setGauges] = useState([]);
  const [poolReward, setPoolReward] = useState([]);
  const [poolStaked, setPoolStaked] = useState([]);
  const [stakingRewardStaked, setstakingRewardStaked] = useState({
    dysTopiaEarning: "0",
    stakedBalance: "0",
    topiaEarning: "0",
  });

  const [topiaPartnerData,setTopiaPartnerData] = useState({
    totalMintPct : 0,
    claimable:0, 
    earlyPartnerDeadline:0,
    finalPartnerDeadline:0, 
    totalMinted:0,
    partnerCount:0,
    isEarlyPartner:false , 
    userData : 0
  })

  const [veTopiaBalance, setveTopiaBalance] = useState("0");
  const [dystopiaBalance,setDystopiaBalance] = useState("0");
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
  const [selectDropdown, setSelectDropdown] = useState("0");
  const [depositInput, setDepositInput] = useState("0");

  useEffect(() => {
    const nfts = stores.stableSwapStore.getStore("vestNFTs");
    setVestNFTs(nfts);
  }, []);

  const openModel = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChanges = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeModeltab = (event, newValue) => {
    setModeltabs(newValue);
  };

  const sendVedysttoTopiaPartners = async ()=>{
    window.alert(selectDropdown.id)
    await stores.dispatcher.dispatch({
      type: ACTIONS.DEXTOPIA_TOPIA_PARTNER_EARLY_PARTNER_SENDVENFT,
      content: { id: selectDropdown.id },
    });
  }

  const claimPartners = async ()=>{
    await stores.dispatcher.dispatch({
      type: ACTIONS.DEXTOPIA_TOPIA_PARTNER_CLAIM,
      content: {  },
    });
  }

  const earlyPartnerClaim = async ()=>{
    await stores.dispatcher.dispatch({
      type: ACTIONS.DEXTOPIA_TOPIA_PARTNER_EARLY_PARTNER_CLAIM,
      content: {  },
    });
  }
// console.log( selectDropdown,"idii")
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
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

    const vedepositordata = stores.dispatcher.dispatch({
      type: ACTIONS.VE_DEPOSITOR_DATA,
      content: {},
    });

    const stakingRewardsStakedBalancedata = stores.stableSwapStore.getStore(
      "StakingRewardStakedBalances"
    );

    setstakingRewardStaked({
      dysTopiaEarning: stakingRewardsStakedBalancedata?.dysTopiaEarning,
      stakedBalance: stakingRewardsStakedBalancedata?.stakedBalance,
      topiaEarning: stakingRewardsStakedBalancedata?.topiaEarning,
    });

    const vedepositordatas = stores.stableSwapStore.getStore("veDepositorData");
    // console.log(vedepositordatas, "vedepo");
    setveTopiaBalance(vedepositordatas?.balanceOfVeTopia);
    setDystopiaBalance(vedepositordatas?.balanceOfDystToken);

    const nfts = stores.stableSwapStore.getStore("vestNFTs");
    setVestNFTs(nfts);

    if (nfts && nfts.length > 0) {
      setToken(nfts[0]);
    }


    const topiapartnersdatas = stores.dispatcher.dispatch({ type: ACTIONS.DEXTOPIA_TOPIA_PARTNER_DATA, content: {} }) 
    const topiaParntersdata =  stores.stableSwapStore.getStore('topiaPartnersData');
    setTopiaPartnerData(topiaParntersdata)

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

  const onDeposit = async (depositInput) => {
    // setDepositLoading(true)
    await stores.dispatcher.dispatch({
      type: ACTIONS.VE_DEPOSITOR_DEPOSIT,
      content: { amount: depositInput },
    });
  };

  const [depositInputveTopia, setDepositInputVeTopia] = useState("0");

  const onInputDepositStakeVtopia = async (e) => {
    console.log("siflskjfklsdlja", e);
   setDepositInputVeTopia(e.target.value);
  };

  const onInputDepositDyst = async (e)=>{
    setDepositInput(e.target.value);
  }

  function reverseFormatNumber(val,locale){
    var group = new Intl.NumberFormat(locale).format(1111).replace(/1/g, '');
    var decimal = new Intl.NumberFormat(locale).format(1.1).replace(/1/g, '');
    var reversedVal = val.replace(new RegExp('\\' + group, 'g'), '');
    reversedVal = reversedVal.replace(new RegExp('\\' + decimal, 'g'), '.');
    return Number.isNaN(reversedVal)?0:reversedVal;
}

  const onDepositVeTopia = async () => {

    console.log(reverseFormatNumber(depositInputveTopia),"alow")
    await stores.dispatcher.dispatch({
      type: ACTIONS.DEXTOPIA_STAKING_REWARD_DEPOSIT,
      content: { amount: reverseFormatNumber(depositInputveTopia) },
    });
  };

  const onWithdrawVeTopia = async () => {
    await stores.dispatcher.dispatch({
      type: ACTIONS.DEXTOPIA_STAKING_REWARD_WITHDRAW,
      content: { amount: reverseFormatNumber(depositInputveTopia) },
    });
  };

  const onClaimVeTopia = async () => {
    await stores.dispatcher.dispatch({
      type: ACTIONS.DEXTOPIA_STAKING_REWARD_GETREWARD,
      content: {},
    });
  };

  useEffect(() => {
    const vestVotesReturned = async (vals) => {
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

    const stableSwapUpdated = async () => {
      await ssUpdated();
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
                  <Typography className={style.topGrid2InnerPrice}>{topiaPartnerData?.partnerCount}/15</Typography>
                </Paper>
              </Grid>
              <Grid item className={style.topGrid2} xs={6} lg={2.25}>
                <Paper elevation={1} className={style.topGrid2Inner}>
                  <Typography className={style.topGrid2Innertext1}>Early Partner Deadline</Typography>
                  <Typography className={style.topGrid2InnerPrice}>{`${new Date(parseFloat(1651046763 * 1000)).toDateString()}`}</Typography>
                </Paper>
              </Grid>
              <Grid item className={style.topGrid2} xs={6} lg={2.25}>
                <Paper elevation={1} className={style.topGrid2Inner}>
                  <Typography className={style.topGrid2Innertext1}>Final Partner Deadline</Typography>
                  <Typography className={style.topGrid2InnerPrice}> {`${new Date(parseFloat(1651046763 * 1000)).toDateString()}`}</Typography>
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
                      Convert Dystopia NFTs into DexTopia To Become Early Partner
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
                                  <InputLabel
                                    style={{ color: "#fff" }}
                                    id="demo-multiple-chip-label"
                                  >
                                    Select Token ID
                                  </InputLabel>
                                  <Select
                                    labelId="demo-multiple-chip-label"
                                    id="demo-multiple-chip"
                                    className={style.tabinputFieldsSelection}
                                    value={selectDropdown}
                                    onChange={(e) => {
                                      setSelectDropdown(e.target.value);
                                    }}
                                    style={{ color: "#fff !important" }}
                                  >
                                    {vestNFTs &&
                                      vestNFTs.map((vest) => {
                                        return (
                                          <MenuItem key={vest.id} value={vest}>
                                            <div className={style.menuOption}>
                                              <Typography>
                                                Token #{vest.id}
                                              </Typography>
                                              <div>
                                                <Typography
                                                  align="right"
                                                  className={style.smallerText}
                                                >
                                                  {formatCurrency(
                                                    vest.lockValue
                                                  )}
                                                </Typography>
                                                <Typography
                                                  color="textSecondary"
                                                  className={style.smallerText}
                                                >
                                                  {veToken?.symbol}
                                                </Typography>
                                              </div>
                                            </div>
                                          </MenuItem>
                                        );
                                      })}
                                  </Select>
                                </FormControl>
               
                              </Box>
                            </Box>
                          </Box>
                        </Box>
                        <Box className={style.tabPannelrow3Right}>
                          <Button className={style.approveBtn} onClick={()=>{sendVedysttoTopiaPartners()}}>
                            Convert tokens
                          </Button>
                        </Box>
                        {/* <Box className={style.tabPannelrow4}>
                          <Typography variant='p' className={style.balancep}>
                            Converting 0 SOLID Tokens From the selected SOLID NFT to 0 SOLIDDsex
                          </Typography>
                        </Box> */}
                      </Box>
                    </TabPanel>
                  </Box>
                </Paper>
                <Box style={{ display: "flex", flexWrap: "wrap", margin: "1rem 0", background: "transparent", justifyContent: "space-between" }}>
                      <Box style={{ width: "45%", margin: '0 0.5rem', padding: "1.5rem", color: "white", background: "#1f272b", border: "4px solid #194172" }}>
                        <Typography>
                          Negative Vote Protection
                        </Typography>
                        <Typography>
                          Only Available to early partners
                        </Typography>
                      </Box>
                      <Box style={{ width: "45%", margin: '0 0.5rem', padding: "1.5rem", color: "white", background: "#1f272b", border: "4px solid #194172" }}>
                        <Typography>
                          Partners whitelist token
                        </Typography>
                        <Typography>
                          Only Available to early partners
                        </Typography>
                      </Box>
                </Box>
                <Box style={{background: "#1f272b", padding: "1.5rem", margin: "1rem 0", width: "30%", border: "4px solid #194172"}}>
                    <Typography variant='h4' color='common.white'>
                      Partner Claim
                    </Typography>
                    <Typography variant='h6' color='common.white'>
                      Claimable Topia
                    </Typography>
                    <Typography variant='h3' color='common.white'>
                     {formatCurrency(BigNumber(topiaPartnerData?.claimable).div(10**18))}
                    </Typography>
                    <Button variant="contained">claim</Button>
                </Box>
              </Grid>
            </Container>

          </Box>
        </Box >
      </Container >
  );
}
