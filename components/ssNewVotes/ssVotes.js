import React, { useState, useEffect, useCallback } from "react";
import style from "./convert.module.css";

import TablePagination from "@mui/material/TablePagination";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/router";
import BigNumber from "bignumber.js";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Slider from "@mui/material/Slider";
import { makeStyles, withStyles } from "@mui/styles";

import TextField from "@mui/material/TextField";
import voteStyle from "./ssVotes.module.css";
import ButtonGroup from "@mui/material/ButtonGroup";
import { formatCurrency } from "../../utils";
import GaugesTable from "./ssVotesTable.js";

import stores from "../../stores";
import { ACTIONS } from "../../stores/constants";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "transparent",
  padding: theme.spacing(1),
  textAlign: "center",
  color: "#fff",
}));
// const PrettoSlider = styled(Slider)(({theme, appTheme}) => {
//   return ({
//     color: appTheme === 'dark' ? '#3880ff' : '#3880ff',
//     height: 2,
//     padding: '15px 0',
//     '& .MuiSlider-thumb': {
//       height: 10,
//       width: 10,
//       backgroundColor: appTheme === 'dark' ? '#4CADE6' : '#5688A5',
//       boxShadow: 'none',
//       '&:focus, &:hover, &.Mui-active': {
//         boxShadow: 'none',
//         '@media (hover: none)': {
//           boxShadow: 'none',
//         },
//       },
//     },
//     '& .MuiSlider-valueLabel': {
//       fontSize: 10,
//       fontWeight: 400,
//       top: -6,
//       border: '1px solid #0B5E8E',
//       background: '#B9DFF5',
//       padding: 5,
//       borderRadius: 0,
//       '&:before': {
//         borderBottom: '1px solid #0B5E8E',
//         borderRight: '1px solid #0B5E8E',
//       },
//       '& *': {
//         color: '#325569',
//       },
//     },
//     '& .MuiSlider-track': {
//       border: 'none',
//       backgroundColor: '#9BC9E4',
//     },
//     '& .MuiSlider-rail': {
//       opacity: 1,
//       backgroundColor: '#9BC9E4',
//     },
//     '& .MuiSlider-mark': {
//       opacity: 1,
//       backgroundColor: '#CFE5F2',
//       height: 2,
//       width: 2,
//       '&.MuiSlider-markActive': {
//         backgroundColor: '#CFE5F2',
//         opacity: 1,
//       },
//     },
//   });
// });
const PrettoSlider = withStyles({
  root: {
    color: "#7155FF",
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: "#7155FF",
    border: "2px solid currentColor",
    marginTop: -8,
    marginLeft: -12,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  track: {
    height: 8,
  },
  rail: {
    height: 8,
  },
})(Slider);

function descendingComparator(a, b, orderBy) {
  if (!a || !b) {
    return 0;
  }

  switch (orderBy) {
    case "balance":
      if (BigNumber(b?.gauge?.balance).lt(a?.gauge?.balance)) {
        return -1;
      }
      if (BigNumber(b?.gauge?.balance).gt(a?.gauge?.balance)) {
        return 1;
      }
      return 0;

    case "liquidity":
      let reserveA = BigNumber(a?.reserve0).plus(a?.reserve1).toNumber();
      let reserveB = BigNumber(b?.reserve0).plus(b?.reserve1).toNumber();

      if (BigNumber(reserveB).lt(reserveA)) {
        return -1;
      }
      if (BigNumber(reserveB).gt(reserveA)) {
        return 1;
      }
      return 0;

    case "totalVotes":
      if (BigNumber(b?.gauge?.weightPercent).lt(a?.gauge?.weightPercent)) {
        return -1;
      }
      if (BigNumber(b?.gauge?.weightPercent).gt(a?.gauge?.weightPercent)) {
        return 1;
      }
      return 0;

    case "apy":
      if (BigNumber(b?.gauge?.bribes.length).lt(a?.gauge?.bribes.length)) {
        return -1;
      }
      if (BigNumber(b?.gauge?.bribes.length).gt(a?.gauge?.bribes.length)) {
        return 1;
      }
      return 0;

    case "myVotes":
    case "mvp":
      if (BigNumber(b?.gauge?.bribes.length).lt(a?.gauge?.bribes.length)) {
        return -1;
      }
      if (BigNumber(b?.gauge?.bribes.length).gt(a?.gauge?.bribes.length)) {
        return 1;
      }
      return 0;

    default:
      return 0;
  }
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export default function Vote() {
  const router = useRouter();

  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);

  const [gauges, setGauges] = useState([]);
  const [voteLoading, setVoteLoading] = useState(false);
  const [votes, setVotes] = useState([]);
  const [veToken, setVeToken] = useState(null);
  const [token, setToken] = useState(null);
  const [vestNFTs, setVestNFTs] = useState([]);
  const [search, setSearch] = useState("");

  const [order, setOrder] = useState("desc");
  const [orderBy, setOrderBy] = useState("totalVotes");
  const [sliderValues, setSliderValues] = useState(votes);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [gaugeItems, setGaugeItems] = useState([]);
  const [page, setPage] = useState(0);
  const [topiaVoterData, setTopiaVoterData] = useState({
    availableVotes: 0,
    getWeek: 0,
    getPoolProtectionData: 0,
    startTime: 0,
    userVotes: 0,
    poolVotesForWeekDatas: 0,
  });

  const [totalVotesDoneinWeek, setTotalVotesDoneinWeek] = useState(0);

  useEffect(() => {
    setSliderValues(votes);
  }, [votes]);

  const ssUpdated = () => {
    setVeToken(stores.stableSwapStore.getStore("veToken"));
    const as = stores.stableSwapStore.getStore("pairs");

    const filteredAssets = as.filter((asset) => {
      return asset.gauge && asset.gauge.address;
    });
    setGauges(filteredAssets);

    const poolRewards = stores.dispatcher.dispatch({
      type: ACTIONS.VOTEDATA,
      content: { filteredAssets },
    });

    const topiaVotersDatas = stores.stableSwapStore.getStore("topiaVotersData");

    setTopiaVoterData(topiaVotersDatas);

    let tvlsum =
      topiaVotersDatas &&
      topiaVotersDatas.poolVotesForWeekDatas &&
      topiaVotersDatas.poolVotesForWeekDatas.map((object) => {
        return object && object[0];
      });

    tvlsum =
      tvlsum && tvlsum.reduce((a, b) => parseFloat(a) + parseFloat(b), 0);
    setTotalVotesDoneinWeek(tvlsum);

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
          <Grid container style={{ background: "white !important" }}>
            <Grid item lg="auto" md="auto" sm={12} xs={12}>
              <Typography variant="body2" className={classes.smallText}>
                Please select your veNFT:
              </Typography>
            </Grid>

            <Grid item lg={6} md={6} sm={12} xs={12}>
              <div className={classes.mediumInputAmount}>
                <Select
                  style={{ background: "white !important" }}
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

  useEffect(() => {
    setSliderValues(votes);
  }, [votes]);

  const onSliderChange = (event, value, asset) => {
    let newSliderValues = [...sliderValues];

    newSliderValues = newSliderValues.map((val) => {
      if (asset?.address === val.address) {
        val.value = value;
      }
      return val;
    });

    setVotes(newSliderValues);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (!gauges) {
    return (
      <div className={classes.root}>
        <Skeleton
          variant="rect"
          width={"100%"}
          height={40}
          className={classes.skelly1}
        />
        <Skeleton
          variant="rect"
          width={"100%"}
          height={70}
          className={classes.skelly}
        />
        <Skeleton
          variant="rect"
          width={"100%"}
          height={70}
          className={classes.skelly}
        />
        <Skeleton
          variant="rect"
          width={"100%"}
          height={70}
          className={classes.skelly}
        />
        <Skeleton
          variant="rect"
          width={"100%"}
          height={70}
          className={classes.skelly}
        />
        <Skeleton
          variant="rect"
          width={"100%"}
          height={70}
          className={classes.skelly}
        />
      </div>
    );
  }

  const getSearchResult = () => {
    const res = gauges?.filter((pair) => {
      if (!search || search?.trim() === "") {
        return true;
      }

      const searchLower = search?.trim().toLowerCase();

      if (
        pair.symbol.toLowerCase().includes(searchLower) ||
        pair.address.toLowerCase().includes(searchLower) ||
        pair.token0.symbol.toLowerCase().includes(searchLower) ||
        pair.token0.address.toLowerCase().includes(searchLower) ||
        pair.token0.name.toLowerCase().includes(searchLower) ||
        pair.token1.symbol.toLowerCase().includes(searchLower) ||
        pair.token1.address.toLowerCase().includes(searchLower) ||
        pair.token1.name.toLowerCase().includes(searchLower)
      ) {
        return true;
      }

      return false;
    });
    setGaugeItems(res);
  };

  useEffect(() => {
    setGaugeItems(gauges || []);
  }, [gauges]);

  useEffect(() => {
    getSearchResult();
  }, [search]);

  return (
    <Container id="main" className={style.mainContainer}>
      <Box id="mainContainer" className={style.mainContainerInner}>
        <Box className={style.containerTop}>
          <Box className={style.topContainer}>
            <Grid item className={style.topGrid1} lg={4}>
              <Typography variant="h1" className={style.mainText}>
                Vote
              </Typography>
            </Grid>

            <Grid item className={style.topGrid2} xs={6} lg={2.25}>
              <Paper elevation={1} className={style.topGrid2Inner}>
                <Typography className={style.topGrid2Innertext1}>
                Remaining vote weight
                </Typography>
                <Typography className={style.topGrid2InnerPrice}>
                 {topiaVoterData && topiaVoterData?.availableVotes && topiaVoterData?.userVotes && topiaVoterData?.availableVotes} 
                /{topiaVoterData && topiaVoterData?.availableVotes && topiaVoterData?.userVotes && (parseFloat(topiaVoterData?.availableVotes)+parseFloat(topiaVoterData?.userVotes))}
        
                </Typography>
              </Paper>
            </Grid>
          </Box>

          {/* // Bottom */}
          <Grid className={voteStyle.bottomContainer}>
            <Grid xs={12} className={voteStyle.topContainerInner}>
              <Paper className={voteStyle.topContainerBox}>
                <Box className={voteStyle.header1}>
                  <Box className={voteStyle.left}>
                    <Typography variant="p">
                      Vote for one or more pools to receive DYST emissions.
                    </Typography>
                  </Box>
                  <Box className={voteStyle.right}>
                    <Box className={voteStyle.inputBoxContainer}>
                      <Input
                        value={search}
                        placeholder="Search pools"
                        className={voteStyle.inputBox}
                        onChange={onSearchChanged}
                      ></Input>
                      <img
                        src="/images/search.svg"
                        alt="search"
                        className={voteStyle.searchIcon}
                        srcSet=""
                      />
                    </Box>
                  </Box>
                </Box>

                <Box className={voteStyle.header2}>
                  <Typography variant="p" className={voteStyle.textRow2}>
                    Voted this week: {totalVotesDoneinWeek} vlTOPIA
                    {/* (14.9% of locked) */}
                  </Typography>
                </Box>

                <Box className={voteStyle.header3}>
                  <Grid container spacing={2}>
                    <Grid item xs={3}></Grid>
                    <Grid item xs={2}>
                      Emissions
                    </Grid>
                    <Grid item xs={0.7}>
                      APR
                    </Grid>
                    <Grid item xs={2.3}>
                      New Emissions
                    </Grid>
                    <Grid item xs={1}>
                      New APR
                    </Grid>
                  </Grid>
                </Box>

                <Box className={voteStyle.header4}>
                  <Container className={voteStyle.header4Inner}>
                    <Grid xs={12} item className={voteStyle.hederBox}>
                      {gaugeItems?.map((gauge, index) => {
                        if (!gauge) {
                          return null;
                        }
                        let sliderValue = sliderValues.find(
                          (el) => el.address === gauge?.address
                        )?.value;
                        if (sliderValue) {
                          sliderValue = BigNumber(sliderValue).toNumber(0);
                        } else {
                          sliderValue = 0;
                        }
                        {
                          console.log(sliderValue);
                        }
                        return (
                          <Grid
                            key={index}
                            xs={12}
                            container
                            className={voteStyle.hederBoxInner}
                          >
                            <Grid item md={3} xs={6}>
                              <Typography
                                variant="p"
                                className={voteStyle.headertext}
                              >
                                {gauge.symbol}
                              </Typography>
                            </Grid>
                            <Grid item md={2} xs={6}>
                              <Typography
                                variant="p"
                                className={voteStyle.hyfernSymbol}
                              >
                                {gauge &&
                                  gauge.balance &&
                                  gauge.balance.substring(0, 4)}
                              </Typography>
                            </Grid>
                            <Grid item md={0.7} xs={6}>
                              <Typography
                                variant="p"
                                className={voteStyle.hyfernSymbol}
                              >
                                {gauge &&
                                  gauge.totalSupply &&
                                  gauge.totalSupply.substring(0, 4)}
                              </Typography>
                            </Grid>
                            <Grid item md={2.3} xs={6}>
                              <Typography
                                variant="p"
                                className={voteStyle.hyfernSymbol}
                              >
                                {gauge &&
                                  gauge.claimable0 &&
                                  gauge.claimable0.substring(0, 4)}
                              </Typography>
                            </Grid>
                            <Grid item md={1} xs={6}>
                              <Typography
                                variant="p"
                                className={voteStyle.hyfernSymbol}
                              >
                                {gauge &&
                                  gauge.claimable1 &&
                                  gauge.claimable1.substring(0, 4)}
                              </Typography>
                            </Grid>
                            <Grid
                              item
                              xs={12}
                              md={3}
                              lg={3}
                              className={voteStyle.multiBoxes}
                            >
                              <Box className={voteStyle.boxes}>
                                {/* <Box className={voteStyle.left}>
                                                                <TextField placeholder="Enter vote" className={voteStyle.inputBox} variant="outlined" />
                                                                <Button className={voteStyle.inpputButtonMax}>Max</Button>
                                                            </Box> */}

                                {/* <ButtonGroup variant="contained" aria-label="outlined primary button group">
                                                                    <Button className={voteStyle.like}>
                                                                        <img src="/images/like.svg" className={voteStyle.svgIcons} alt="likeimage" />
                                                                    </Button>
                                                                    <Button className={voteStyle.dislike}>
                                                                        <img src="/images/dislike.svg" className={voteStyle.svgIcons} alt="likeimage" />
                                                                    </Button>
                                                                </ButtonGroup> */}
                                {console.log("preeto", sliderValue)}
                                <PrettoSlider
                                  valueLabelDisplay="auto"
                                  value={sliderValue}
                                  onChange={(event, value) => {
                                    onSliderChange(event, value, gauge);
                                  }}
                                  min={-100}
                                  max={100}
                                  marks
                                  step={1}
                                />
                              </Box>
                            </Grid>
                          </Grid>
                        );
                      })}
                    </Grid>
                    <div>
                      {gaugeItems?.length === 0 && search !== "" && (
                        <Paper elevation={0} className={voteStyle.tableRow}>
                          <p className={voteStyle.tableRowInfo}>
                            No result found{" "}
                          </p>
                        </Paper>
                      )}
                    </div>
                    <Box style={{ width: "100%" }}>
                      <TablePagination
                        className={voteStyle.pagination}
                        component="div"
                        count={100}
                        page={1}
                        onPageChange={null}
                        rowsPerPage={10}
                        onRowsPerPageChange={null}
                      />
                    </Box>
                  </Container>
                </Box>

                <Box className={voteStyle.header5}>
                  <Button className={voteStyle.btn}>Vote</Button>
                </Box>
              </Paper>
            </Grid>
          </Grid>
          <Grid xs={12} className={voteStyle.bottomContainer}>
            <Paper className={voteStyle.bottomVoteInnnerContainer}>
              <Box className={voteStyle.topVoteheader}>
                <Button>
                  <Typography className={voteStyle.textData} variant="p">
                    Current week votes
                  </Typography>
                </Button>
              </Box>
              <Box className={voteStyle.bottomVoteList}>
                <Box className={voteStyle.bottomVoteListColumn}>
                  {gaugeItems?.map((gauge, index) => {
                    if (!gauge) {
                      return null;
                    }
                    let sliderValue = sliderValues.find(
                      (el) => el.address === gauge?.address
                    )?.value;
                    if (sliderValue) {
                      sliderValue = BigNumber(sliderValue).toNumber(0);
                    } else {
                      sliderValue = 0;
                    }
                    {
                      console.log(sliderValue);
                    }
                    return (
                      <Box className={voteStyle.bottomVoteListData} key={index}>
                        <Box className={voteStyle.bottomVoteListBox}>
                          <Typography className={voteStyle.textData}>
                            {gauge.symbol}
                          </Typography>
                          <Typography className={voteStyle.textData}>
                            {topiaVoterData &&
                              topiaVoterData?.poolVotesForWeekDatas &&
                              topiaVoterData?.poolVotesForWeekDatas[index]}
                          </Typography>
                        </Box>
                      </Box>
                      
                    );
                  })}
                  

                  <Box style={{ width: "100%", marginTop: "50px" }}>
                    <TablePagination
                      className={voteStyle.pagination}
                      component="div"
                      count={100}
                      page={1}
                      onPageChange={null}
                      rowsPerPage={10}
                      onRowsPerPageChange={null}
                    />
                  </Box>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Box>
      </Box>
      <Paper elevation={10} className={voteStyle.actionButtons}>
        <Grid container spacing={2}>
          <Grid item lg={6}>
            <div className={voteStyle.infoSection}>
              <Typography color="common.white">Voting Power Used: </Typography>
              <Typography
                className={`${
                  BigNumber(totalVotes).gt(100)
                    ? voteStyle.errorText
                    : voteStyle.helpText
                }`}
              >
                {totalVotes} %
              </Typography>
            </div>
          </Grid>
          <Grid item lg={6}>
            <Button
              className={voteStyle.buttonOverrideFixed}
              variant="contained"
              size="large"
              color="primary"
              disabled={
                voteLoading ||
                BigNumber(totalVotes).eq(0) ||
                BigNumber(totalVotes).gt(100)
              }
              onClick={onVote}
            >
              <Typography className={voteStyle.actionButtonText}>
                {voteLoading ? `Casting Votes` : `Cast Votes`}
              </Typography>
              {voteLoading && (
                <CircularProgress
                  size={10}
                  className={voteStyle.loadingCircle}
                />
              )}
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
