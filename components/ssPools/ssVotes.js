import React, { useState, useEffect, useCallback } from 'react';
import { Paper, Typography, Button, CircularProgress, InputAdornment, TextField, MenuItem, Select, Grid, Container, Box, Input, TablePagination, Tabs, Tab } from '@mui/material';
import BigNumber from 'bignumber.js';
import { Search } from '@mui/icons-material';
import { useRouter } from "next/router";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import style from './convert.module.css';
import style1 from './ssVotes.module.css';
import { formatCurrency } from '../../utils';
import PoolsRow from './poolsRow';
import Mymodel from "./Mymodel"

import GaugesTable from './ssVotesTable.js'

import stores from '../../stores'
import { ACTIONS } from '../../stores/constants';

export default function ssPools() {
  const router = useRouter()

  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);

  const [gauges, setGauges] = useState([])
  const [poolReward, setPoolReward] = useState([])
  const [poolStaked, setPoolStaked] = useState([])
  const [voteLoading, setVoteLoading] = useState(false)
  const [votes, setVotes] = useState([])
  const [veToken, setVeToken] = useState(null)
  const [token, setToken] = useState(null)
  const [vestNFTs, setVestNFTs] = useState([])
  const [search, setSearch] = useState('');
  const [TvlData, setTvlData] = useState();
  const [TotalValueLocked, setTotalValueLocked] = useState(0)
  const [YourDepositTotal, setYourDepositTotal] = useState(0);

  const [modelTabs, setModeltabs] = useState(0);

  const [open, setOpen] = useState(false);

  const openModel = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const handleChangeModeltab = (event, newValue) => {
    setModeltabs(newValue);
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  const [ssUpdateDone, setssUpdateDone] = useState(false);
  let ssupdateDone = false;
  const ssUpdated = () => {
    setVeToken(stores.stableSwapStore.getStore('veToken'))
    const as = stores.stableSwapStore.getStore('pairs');

    const filteredAssets = as.filter((asset) => {
      return asset.gauge && asset.gauge.address
    })
    if (filteredAssets.length > 0 && !ssupdateDone) {
      console.log('hell')
      console.log(filteredAssets, "hellllll")
      ssupdateDone = true;
      setssUpdateDone(true);
      setGauges(filteredAssets)
    }
    let realfilteredassets = filteredAssets.map((object) => {
      return object.address
    })

    const poolRewards = stores.dispatcher.dispatch({ type: ACTIONS.POOLREWARDS, content: { filteredAssets } })
    const tvldataas = stores.dispatcher.dispatch({ type: ACTIONS.TVL_DATA_POOLS, content: { realfilteredassets } })

    const ass = stores.stableSwapStore.getStore('poolRewards')
    console.log(ass, "pipppp")
    setPoolReward(ass)

    const asss = stores.stableSwapStore.getStore("poolStakedBalance");
    console.log(asss, "pipp")
    setPoolStaked(asss);

    const tvldata = stores.stableSwapStore.getStore("tvls");

    let tvlsum = tvldata.map((object) => {
      return object.tvl;
    })
    tvlsum = tvlsum.reduce((a, b) => a + b, 0)

    let yourDepositsTotal = asss.map((object, i) => {
      console.log(object, "object")
      if (object) {
        return object && tvldata[i] && Number(BigNumber(tvldata[i].lpBalanceInAPool).div((BigNumber(object).div(10 ** 18)))) * tvldata[i]?.tvl
      }

    })
    yourDepositsTotal = yourDepositsTotal.reduce((a, b) => a + b, 0)

    setYourDepositTotal(yourDepositsTotal)
    setTotalValueLocked(tvlsum)
    setTvlData(tvldata)
    const poolStakedBalances = stores.dispatcher.dispatch({ type: ACTIONS.POOLSTAKED, content: { filteredAssets } })
    const stakingRewardsStakedBalance = stores.dispatcher.dispatch({ type: ACTIONS.DEXTOPIA_STAKING_REWARD_STAKEDAMOUNT, content: {} })

    const tockenLockerDatas = stores.dispatcher.dispatch({ type: ACTIONS.DEXTOPIA_TOCKEN_LOCKER_DATA, content: {} })


    const nfts = stores.stableSwapStore.getStore('vestNFTs');
    setVestNFTs(nfts)

    if (nfts && nfts.length > 0) {
      setToken(nfts[0]);
    }

    if (nfts && nfts.length > 0 && filteredAssets && filteredAssets.length > 0) {
      stores.dispatcher.dispatch({ type: ACTIONS.GET_VEST_VOTES, content: { tokenID: nfts[0].id } })
      // stores.dispatcher.dispatch({ type: ACTIONS.GET_VEST_BALANCES, content: { tokenID: nfts[0].id } })
    }

    forceUpdate()
  }

  useEffect(() => {
    const vestVotesReturned = (vals) => {
      setVotes(vals.map((asset) => {
        return {
          address: asset?.address,
          value: BigNumber((asset && asset.votePercent) ? asset.votePercent : 0).toNumber(0)
        }
      }))
      forceUpdate()
    }

    const vestBalancesReturned = (vals) => {
      setGauges(vals)
      forceUpdate()
    }

    const stableSwapUpdated = () => {
      ssUpdated()
    }

    const voteReturned = () => {
      setVoteLoading(false)
    }

    ssUpdated()

    // stores.dispatcher.dispatch({ type: ACTIONS.GET_VEST_NFTS, content: {} })

    stores.emitter.on(ACTIONS.UPDATED, stableSwapUpdated);
    stores.emitter.on(ACTIONS.VOTE_RETURNED, voteReturned);
    stores.emitter.on(ACTIONS.ERROR, voteReturned);
    stores.emitter.on(ACTIONS.VEST_VOTES_RETURNED, vestVotesReturned)
    // stores.emitter.on(ACTIONS.VEST_NFTS_RETURNED, vestNFTsReturned)
    stores.emitter.on(ACTIONS.VEST_BALANCES_RETURNED, vestBalancesReturned)

    return () => {
      stores.emitter.removeListener(ACTIONS.UPDATED, stableSwapUpdated);
      stores.emitter.removeListener(ACTIONS.VOTE_RETURNED, voteReturned);
      stores.emitter.removeListener(ACTIONS.ERROR, voteReturned);
      stores.emitter.removeListener(ACTIONS.VEST_VOTES_RETURNED, vestVotesReturned)
      // stores.emitter.removeListener(ACTIONS.VEST_NFTS_RETURNED, vestNFTsReturned)
      stores.emitter.removeListener(ACTIONS.VEST_BALANCES_RETURNED, vestBalancesReturned)
    };
  }, []);

  const onVote = () => {
    setVoteLoading(true)
    stores.dispatcher.dispatch({ type: ACTIONS.VOTE, content: { votes, tokenID: token.id } })
  }


  let totalVotes = votes.reduce((acc, curr) => { return BigNumber(acc).plus(BigNumber(curr.value).lt(0) ? (curr.value * -1) : curr.value).toNumber() }, 0)

  const handleChange = (event) => {
    setToken(event.target.value);
    stores.dispatcher.dispatch({ type: ACTIONS.GET_VEST_VOTES, content: { tokenID: event.target.value.id } })
  }

  const onSearchChanged = (event) => {
    setSearch(event.target.value);
  };

  const onBribe = () => {
    router.push('/bribe/create')
  }

  const renderMediumInput = (value, options) => {
    return (
      <div className={classes.textField}>
        <div className={classes.mediumInputContainer}>
          <Grid container>
            <Grid item lg='auto' md='auto' sm={12} xs={12}>
              <Typography variant="body2" className={classes.smallText}>Please select your veNFT:</Typography>
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
                  {options && options.map((option) => {
                    return (
                      <MenuItem key={option.id} value={option}>
                        <div className={classes.menuOption}>
                          <Typography>Token #{option.id}</Typography>
                          <div>
                            <Typography align='right' className={classes.smallerText}>{formatCurrency(option.lockValue)}</Typography>
                            <Typography color='textSecondary' className={classes.smallerText}>{veToken?.symbol}</Typography>
                          </div>
                        </div>
                      </MenuItem>
                    )
                  })}
                </Select>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    )
  }

  console.log("Hey i am gauges", gauges)
  const [filter, setFilter] = useState("")
  const [gaugeItems, setGaugeItems] = useState([])



  const updateGauges = async () => {
    if (!filter && filter === "") {
      return null
    }
    let newGauges;
    if (filter === "reset") {
      newGauges = gauges
    } else if (filter === "stable") {
      newGauges = gauges?.filter(item => item.isStable === true)
    } else if (filter === "volatile") {
      newGauges = gauges?.filter(item => item.isStable === false)
      console.log("Im valotile", newGauges)
    } else if (filter === "mine") {
      newGauges = gauges?.filter(item => parseFloat(item.balance) > 0)
    }

    setGaugeItems(newGauges || [])

  }

  useEffect(() => {
    setGaugeItems(gauges || [])
  }, [gauges])

  useEffect(() => {
    updateGauges()
  }, [filter])

  console.log("hey its gaguges", gauges)

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

  const getSearchResult = () => {
    const res = gauges?.filter((pair) => {
      if (!search || search?.trim() === '') {
        return true
      }

      const searchLower = search?.trim().toLowerCase()

      if (pair.symbol.toLowerCase().includes(searchLower) || pair.address.toLowerCase().includes(searchLower) ||
        pair.token0.symbol.toLowerCase().includes(searchLower) || pair.token0.address.toLowerCase().includes(searchLower) || pair.token0.name.toLowerCase().includes(searchLower) ||
        pair.token1.symbol.toLowerCase().includes(searchLower) || pair.token1.address.toLowerCase().includes(searchLower) || pair.token1.name.toLowerCase().includes(searchLower)) {
        return true
      }

      return false

    })
    setGaugeItems(res)
  }

  useEffect(() => {
    getSearchResult()
  }, [search])

  return (
    // <>
    //   <Typography style={{ textAlign: 'center' }} variant="h1" className={style.mainText}>Coming Soon</Typography>
    // </>
    <>
      <Container id="main" className={style.mainContainer}>
        <Box id="mainContainer" className={style.mainContainerInner}>
          <Box className={style.containerTop}>
            <Box className={style.topContainer}>
              <Grid item className={style.topGrid1} lg={4}>
                <Typography variant="h1" className={style.mainText}>Pools</Typography>
              </Grid>
              <Grid item className={style.topGrid2} xs={6} lg={2.25}>
                <Paper elevation={1} className={style.topGrid2Inner}>
                  <Typography className={style.topGrid2Innertext1}>Total Value Locked</Typography>
                  <Typography className={style.topGrid2InnerPrice}>${TotalValueLocked.toLocaleString()}</Typography>
                </Paper>
              </Grid>
              <Grid item className={style.topGrid2} xs={6} lg={2.25}>
                <Paper elevation={1} className={style.topGrid2Inner}>
                  <Typography className={style.topGrid2Innertext1}>Your Total Deposits</Typography>
                  {console.log(YourDepositTotal, "parsefloat")}
                  <Typography className={style.topGrid2InnerPrice}>${YourDepositTotal && parseFloat(YourDepositTotal) > 0 && YourDepositTotal < 100000000000000000 ? YourDepositTotal.toLocaleString() : 0}</Typography>
                </Paper>
              </Grid>
            </Box>
            <Box className={style1.bottomContainer}>
              <Box className={style1.bottomTopBar}>
                <Typography sx={{ color: 'white' }} variant="h3">Filter</Typography>
                <Box className={style1.left}>
                  <Button className={style1.btn} onClick={() => setFilter("reset")} > ALL</Button>
                  <Button className={style1.btn} onClick={() => setFilter("stable")} >STABLE</Button>
                  <Button className={style1.btn} onClick={() => setFilter("volatile")} >Volatile</Button>
                  <Button className={style1.btn} onClick={() => setFilter("mine")} >My Deposits</Button>
                </Box>
                <Box className={style1.right}>
                  <Box className={style1.rightInput}>
                    <Input placeholder="Search Pools" value={search} onChange={onSearchChanged} className={style1.inputBox}></Input>
                    <img src="/images/search.svg" className={style1.searchIcon} alt="search" />
                  </Box>
                  <Button className={style1.btn} >Claim All Earnings</Button>
                </Box>
              </Box>
              {/* // main */}

              <Container item xs={12} className={style1.tableMainBox}>
                <Grid xs={12} item className={style1.tableHeader}>
                  <Box className={style1.tableHeaderInner}>
                    {gaugeItems?.length > 0 &&
                      <Container className={style1.tableHeaderInnerBoxes}>
                        <Grid item xs={2.5} className={style1.box1}></Grid>
                        <Grid item xs={1.5} className={style1.box2}>
                          <Button classname={style1.tableCellButton} > 
                            <Typography variant="h6" className={style1.h3text}>
                              TVL
                            </Typography>
                          </Button>

                        </Grid>
                        <Grid item xs={1.5} className={style1.box2}>
                          <Button classname={style1.tableCellButton} >
                            <Typography variant="h6" className={style1.h3text}>
                              APR
                            </Typography>
                          </Button>
                        </Grid>
                        <Grid item xs={1.5} className={style1.box2}>
                          <Button classname={style1.tableCellButton} >
                            <Typography variant="h6" className={style1.h3text}>
                              Your Deposits
                            </Typography>
                          </Button>
                        </Grid>
                        <Grid item xs={2} className={style1.box2}>
                          <Button classname={style1.tableCellButton} >
                            <Typography variant="h6" className={style1.h3text}>
                              Your Earnings
                            </Typography>
                          </Button>
                        </Grid>
                      </Container>
                    }
                  </Box>
                </Grid>

                <div>
                  {
                    gaugeItems?.length > 0 && ssUpdateDone &&

                    <PoolsRow
                      gauges={gaugeItems?.filter((pair) => {
                        if (!search || search?.trim() === '') {
                          return true
                        }

                        const searchLower = search?.trim().toLowerCase()

                        if (pair.symbol.toLowerCase().includes(searchLower) || pair.address.toLowerCase().includes(searchLower) ||
                          pair.token0.symbol.toLowerCase().includes(searchLower) || pair.token0.address.toLowerCase().includes(searchLower) || pair.token0.name.toLowerCase().includes(searchLower) ||
                          pair.token1.symbol.toLowerCase().includes(searchLower) || pair.token1.address.toLowerCase().includes(searchLower) || pair.token1.name.toLowerCase().includes(searchLower)) {
                          return true
                        }

                        return false

                      })}
                      setParentSliderValues={setVotes} defaultVotes={votes} veToken={veToken} token={token} poolReward={poolReward} poolStaked={poolStaked}
                      TvlData={TvlData}
                    />
                  }
                </div>
                <div>
                  {
                    gaugeItems?.length === 0 && (filter !== "" || search !== "") &&
                    <Paper
                      elevation={0}
                      className={style1.tableRow}
                    >
                      <p className={style1.tableRowInfo} >No result found </p>
                    </Paper>
                  }

                </div>
                <TablePagination
                  component="div"
                  className={style1.pagination}
                  count={10}
                  page={10}
                  onPageChange={null}
                  rowsPerPage={10}
                  onRowsPerPageChange={null}
                />

              </Container>
            </Box>
          </Box>
        </Box>
      </Container>

    </>
  );
}
