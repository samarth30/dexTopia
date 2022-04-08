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
} from "@mui/material";
import BigNumber from "bignumber.js";
import { Search } from "@mui/icons-material";
import { useRouter } from "next/router";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import classes from "./ssVotes.module.css";
import { formatCurrency } from "../../utils/utils";

import GaugesTable from "./ssVotesTable.js";

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
  const [voteLoading, setVoteLoading] = useState(false);
  const [votes, setVotes] = useState([]);
  const [veToken, setVeToken] = useState(null);
  const [token, setToken] = useState(null);
  const [vestNFTs, setVestNFTs] = useState([]);
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("token");

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
    <div className={classes.container}>
      {/* <div className={ classes.topBarContainer }>

        <Grid container spacing={1}>
          <Grid item lg='auto' lg='auto' sm={12} xs={12}>
            
              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                startIcon={<AddCircleOutlineIcon />}
                size='large'
                className={ classes.buttonOverride }
                color='primary'
                onClick={ onBribe }
              >
                <Typography className={ classes.actionButtonText }>{ `Create Bribe` }</Typography>
              </Button>
           
          </Grid>
          <Grid item lg={true} md={true} sm={12} xs={12}>
            <TextField
              className={classes.searchContainer}
              variant="outlined"
              fullWidth
              placeholder="MATIC, MIM, 0x..."
              value={search}
              onChange={onSearchChanged}
              inputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item lg='auto' lg='auto' sm={12} xs={12}>
            <div className={ classes.tokenIDContainer }>
              { renderMediumInput(token, vestNFTs) }
            </div>
          </Grid>
        </Grid>
      </div>
      <Paper elevation={0} className={ classes.tableContainer }>
        <GaugesTable gauges={ gauges.filter((pair) => {
          if(!search || search === '') {
            return true
          }

          const searchLower = search.toLowerCase()

          if(pair.symbol.toLowerCase().includes(searchLower) || pair.address.toLowerCase().includes(searchLower) ||
            pair.token0.symbol.toLowerCase().includes(searchLower) || pair.token0.address.toLowerCase().includes(searchLower) || pair.token0.name.toLowerCase().includes(searchLower) ||
            pair.token1.symbol.toLowerCase().includes(searchLower) || pair.token1.address.toLowerCase().includes(searchLower) ||  pair.token1.name.toLowerCase().includes(searchLower)) {
            return true
          }

          return false

        }) } setParentSliderValues={setVotes} defaultVotes={votes} veToken={veToken} token={ token } poolReward={poolReward} poolStaked={poolStaked} />
      </Paper>
      <Paper elevation={10} className={ classes.actionButtons }>
        <Grid container spacing={2}>
          <Grid item lg={6}>
            <div className={ classes.infoSection }>
              <Typography>Voting Power Used: </Typography>
              <Typography className={ `${BigNumber(totalVotes).gt(100) ? classes.errorText : classes.helpText}` }>{ totalVotes } %</Typography>
            </div>
          </Grid>
          <Grid item lg={6}>
            <Button
              className={ classes.buttonOverrideFixed }
              variant='contained'
              size='large'
              color='primary'
              disabled={ voteLoading || BigNumber(totalVotes).eq(0) || BigNumber(totalVotes).gt(100) }
              onClick={ onVote }
              >
              <Typography className={ classes.actionButtonText }>{ voteLoading ? `Casting Votes` : `Cast Votes` }</Typography>
              { voteLoading && <CircularProgress size={10} className={ classes.loadingCircle } /> }
            </Button>
          </Grid>
        </Grid>
      </Paper> */}

      <div className={classes.title}>
        <div className={classes.heading}>
          <h1>Convert</h1>
        </div>
        <div className={classes.depositBox}>
          <p>Total Deposits</p>
          <p>$0.00</p>
        </div>
        <div className={classes.claimableRewards}>
          <p>Claimable Rewards</p>
          <p>$0.00</p>
        </div>
      </div>
      <div className={classes.convertStakeContainer}>
        <h1>Convert and Stake Solidity NFTs/Tokens Into SOLIDsex</h1>
        <div className={classes.tabs}>
          <p
            onClick={() => {
              setTab("token");
            }}
          >
            SOLID TOKEN
          </p>
          <p
            onClick={() => {
              setTab("nft");
            }}
          >
            SOLID NFT
          </p>
        </div>
        {tab === "token" && (
          <div className={classes.formWrapper}>
            <p>Balance: 0 SOLID</p>
            <div className={classes.form}>
              <div className={classes.inputBtn}>
                <input
                  type="number"
                  value={depositInput}
                  // className={styles.votes__depositWithdrawInput}
                  placeholder="enter amount"
                  onChange={onInputField}
                />
                <input
                  type="number"
                  value={depositInputWeeks}
                  // className={styles.votes__depositWithdrawInput}
                  placeholder="enter weeks"
                  onChange={onInputFieldWeeks}
                />
                <button id="clear">Max</button>
              </div>
              <div className={classes.approveConvertBtn}>
                {/* <button id="approve">Approve</button> */}
                <button
                  onClick={() => onDeposit()}
                  // className={styles.votes__depositWithdrawBtn}
                >
                  LOCK
                </button>
                {/* <button >Convert</button> */}
              </div>
            </div>
            <p>Converting 0 SOLID Tokens to 0 SOLIDsex</p>
          </div>
        )}
        {tab === "nft" && (
          <div className={classes.formWrapper}>
            <p>Balance: 0 SOLID</p>
            <form className={classes.form}>
              <div className={classes.inputBtn}>
                <label for="cars">Choose a car:</label>
                <select id="cars" name="cars">
                  <option value="volvo">Volvo XC90</option>
                  <option value="saab">Saab 95</option>
                  <option value="mercedes">Mercedes SLK</option>
                  <option value="audi">Audi TT</option>
                </select>
              </div>
              <div className={classes.approveConvertBtn}>
                <button id="convert">Convert NFT</button>
              </div>
            </form>
            {/* <p>Converting 0 SOLID Tokens to 0 SOLIDsex</p> */}
          </div>
        )}
        <div
          className={classes.footerContainer}
          style={{ color: "#fff", display: "flex", fontWeight: "bolder" }}
        >
          {/* <div className={classes.stakedName}>Staked SolidSEX </div>
          <div className={classes.tvl}>78112286.2</div>
          <div className={classes.apr}>127.9%</div>
          <div className={classes.stake}>0</div>
          <div className={classes.earnings}>
            <p style={{ margin: "0" }}>0 SEX</p>
            <p style={{ margin: "0" }}>0 SOLID</p>
          </div> */}
          {/* <div className={classes.manage}>
            <button>Manage</button>
          </div> */}
        
{/*         
          <div className={classes.claim}>
          dysTopiaEarning : {stakingRewardStaked && stakingRewardStaked?.dysTopiaEarning}
          </div>
          <div className={classes.claim}>
          stakedBalance : {stakingRewardStaked?.stakedBalance}
          </div>
          <div className={classes.claim}>
          topiaEarning : {stakingRewardStaked?.topiaEarning}
          </div>
      */}
        </div>
      </div>
    </div>
  );
}
