import React, { useState, useEffect, useCallback } from "react";
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
  Container,
  Box,
} from "@mui/material";
import BigNumber from "bignumber.js";
import { useRouter } from "next/router";
import style from "./ssVotes.module.css";
import style1 from "./pool.module.css"
import { formatCurrency } from "../../utils/utils";
import PoolsRow from "./poolsRow"
import CustomBox from "./customBox"

import stores from "../../stores";
import { ACTIONS } from "../../stores/constants/constants";


export default function ssLock() {
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
  const [tockenLockerDataRedux,settockenLockerDataRedux] = useState({lockedBalance:"0" , activeUserLocks:[] , balanceOfTopiaToken : "0" , userWeight: "0" , startTimeTockenLocker :0,getweek : 0})
  const [voteLoading, setVoteLoading] = useState(false);
  const [votes, setVotes] = useState([]);
  const [veToken, setVeToken] = useState(null);
  const [token, setToken] = useState(null);
  const [vestNFTs, setVestNFTs] = useState([]);
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("token");
console.log("tockenLockerDataRedux",tockenLockerDataRedux)
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
    const stakingRewardsStakedBalancedata = stores.stableSwapStore.getStore("stakingRewardStakedBalance");
    console.log(stakingRewardsStakedBalancedata)
    setstakingRewardStaked(stakingRewardsStakedBalancedata)
    const tockenLockerDatas = stores.dispatcher.dispatch({
      type: ACTIONS.DEXTOPIA_TOCKEN_LOCKER_DATA,
      content: {},
    });
    const tockenLockerData = stores.stableSwapStore.getStore("tockenLockerData");
    console.log(tockenLockerData,"lock")
    settockenLockerDataRedux(tockenLockerData)
    
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

  const [depositInput, setDepositInput] = useState("");
  const [depositInputWeeks, setDepositInputWeeks] = useState("");

  const onInputField = async (e) => {
    setDepositInput(e.target.value);
  };
  const onInputFieldWeeks = async (e) => {
    setDepositInputWeeks(e.target.value);
  };

  const onDeposit = async () => {
    // setDepositLoading(true)
    await stores.dispatcher.dispatch({
      type: ACTIONS.DEXTOPIA_TOCKEN_LOCKER_DEPOSIT,
      content: { amount: depositInput ,  weeks:depositInputWeeks },
    });
  };


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

  return (
    <Container id="main" className={style.mainContainer}>
    <Box id="mainContainer" className={style.mainContainerInner}>
        <Box className={style.containerTop}>
            <Box className={style.topContainer}>
                <Grid item className={style.topGrid1} lg={4}>
                    <Typography variant="h1" className={style.mainText}>Locks</Typography>
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
            </Box>

            <Box className={style1.bottomContainer}>
                <Container item xs={12} className={style1.tableMainBox}>
                    <Grid xs={12} item className={style1.tableHeader}>
                        <Box className={style1.tableHeaderInner}>
                            <Container className={style1.tableHeaderInnerBoxes}>
                                <Grid item xs={2.5} className={style1.box1}></Grid>
                                <Grid item xs={1.5} className={style1.box2}>
                                    <Button>
                                        <Typography variant="h6" className={style1.h3text}>
                                            TVL
                                        </Typography>
                                    </Button>

                                </Grid>
                                <Grid item xs={1.5} className={style1.box2}>
                                    <Button>
                                        <Typography variant="h6" className={style1.h3text}>
                                            APR
                                        </Typography>
                                    </Button>
                                </Grid>
                                <Grid item xs={1.5} className={style1.box2}>
                                    <Button>
                                        <Typography variant="h6" className={style1.h3text}>
                                            Your Deposits
                                        </Typography>
                                    </Button>
                                </Grid>
                                <Grid item xs={2} className={style1.box2}>
                                    <Button>
                                        <Typography variant="h6" className={style1.h3text}>
                                            Your Earnings
                                        </Typography>
                                    </Button>
                                </Grid>
                            </Container>
                        </Box>
                    </Grid>
                    
                    <PoolsRow tockenLockerDataRedux={tockenLockerDataRedux} />

                    {/* Bottom boxes */}

                    <Box>
                        <Grid style={{marginTop:'50px'}} container spacing={2}>
                            <Grid item md={6} xs={12}>
                                <CustomBox tableSize="400" text="Your Topia locks - 0% of vTopia" rows = {tockenLockerDataRedux} />
                            </Grid>
                            <Grid item md={6} xs={12}>
                            <CustomBox text="Current Week Claimable Earnings " />
                            </Grid>
                            <Grid item md={7} xs={0}></Grid>
                            <Grid item md={5} xs={12}>
                            <CustomBox tableSize="400" text="Next Weeks Total Earnings" />
                            </Grid>
                        </Grid>
                    </Box>

                </Container>


            </Box>

        </Box>
    </Box>
</Container>
  );
}
