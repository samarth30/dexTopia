import React, { Fragment, useState, useEffect } from "react";
import style from "./poolsRow.module.css";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import BigNumber from "bignumber.js";
import { formatCurrency } from "../../utils";
import Mymodel from "./Mymodel";
import {   TablePagination, Tabs, Tab } from '@mui/material';
import stores from '../../stores'
import { ACTIONS } from '../../stores/constants';
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";

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

const headCells = [
  { id: "asset", numeric: false, disablePadding: false, label: "Asset" },
  {
    id: "balance",
    numeric: true,
    disablePadding: false,
    label: "My Stake",
  },
  {
    id: "liquidity",
    numeric: true,
    disablePadding: false,
    label: "Total Liquidity",
  },
  {
    id: "totalVotes",
    numeric: true,
    disablePadding: false,
    label: "Total Votes",
  },
  {
    id: "apy",
    numeric: true,
    disablePadding: false,
    label: "Bribes",
  },
  {
    id: "myVotes",
    numeric: true,
    disablePadding: false,
    label: "My Votes",
  },
  {
    id: "mvp",
    numeric: true,
    disablePadding: false,
    label: "My Vote %",
  },
];

export default function PoolsRow({
  gauges,
  setParentSliderValues,
  defaultVotes,
  veToken,
  token,
  poolReward,
  poolStaked,
}) {
  const [order, setOrder] = useState("desc");
  const [orderBy, setOrderBy] = useState("totalVotes");
  const [sliderValues, setSliderValues] = useState(defaultVotes);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [depositLoading, setDepositLoading] = useState(false);
  const [depositInput, setDepositInput] = useState(0);

  useEffect(() => {
    setSliderValues(defaultVotes);
  }, [defaultVotes]);

  const onSliderChange = (event, value, asset) => {
    let newSliderValues = [...sliderValues];

    newSliderValues = newSliderValues.map((val) => {
      if (asset?.address === val.address) {
        val.value = value;
      }
      return val;
    });

    setParentSliderValues(newSliderValues);
  };

  const onInputField = async (e) => {
    setDepositInput(e.target.value);
  };

  const [open, setOpen] = useState(false);
  const [PoolAddressSelected,setPoolAddressSelected] = useState("");
  const [maxLpBalance , setMaxLpBalance] = useState("0");
  const [maxLpStaked , setMaxLpStaked] = useState("0");

  const openModel = (poolAddress , row , poolstakedparticular) => {
    setDepositInput(0)
    setPoolAddressSelected(poolAddress)
    setMaxLpBalance(row?.balance);
    setMaxLpStaked(poolstakedparticular)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeModeltab = (event, newValue) => {
    setModeltabs(newValue);
  };
  const [modelTabs, setModeltabs] = useState(0);
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
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  function reverseFormatNumber(val,locale){
    var group = new Intl.NumberFormat(locale).format(1111).replace(/1/g, '');
    var decimal = new Intl.NumberFormat(locale).format(1.1).replace(/1/g, '');
    var reversedVal = val.replace(new RegExp('\\' + group, 'g'), '');
    reversedVal = reversedVal.replace(new RegExp('\\' + decimal, 'g'), '.');
    return Number.isNaN(reversedVal)?0:reversedVal;
}

  const onDeposit = async () => {
    setDepositLoading(true);
    await stores.dispatcher.dispatch({
      type: ACTIONS.DEPOSITPOOL,
      content: { poolAddress: PoolAddressSelected, amount: reverseFormatNumber(depositInput) },
    });
  };

  const onWithdraw = async () => {
    setDepositLoading(true);
    await stores.dispatcher.dispatch({
      type: ACTIONS.WITHDRAW_LPDEPOSITOR,
      content: { poolAddress: PoolAddressSelected, amount: reverseFormatNumber(depositInput) },
    });
  };

  const onclaimSingleEarning = async (address)=>{
    // window.alert(address)
    await stores.dispatcher.dispatch({
      type: ACTIONS.LP_DEPOSITOR_GET_REWARD,
      content: { poolAddresses: address },
    });
  }

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
        <Skeleton variant="rect" width={'100%'} height={40} className={classes.skelly1} />
        <Skeleton variant="rect" width={'100%'} height={70} className={classes.skelly} />
        <Skeleton variant="rect" width={'100%'} height={70} className={classes.skelly} />
        <Skeleton variant="rect" width={'100%'} height={70} className={classes.skelly} />
        <Skeleton variant="rect" width={'100%'} height={70} className={classes.skelly} />
        <Skeleton variant="rect" width={'100%'} height={70} className={classes.skelly} />
      </div>
    );
  }

  // const renderTooltip = (pair) => {
  //   return (
  //     <div className={ classes.tooltipContainer }>
  //       {
  //         pair?.gauge?.bribes.map((bribe, idx) => {

  //           let earned = 0
  //           if(pair.gauge.bribesEarned && pair.gauge.bribesEarned.length > idx) {
  //             earned = pair.gauge.bribesEarned[idx].earned
  //           }

  //           return (<div className={ classes.inlineBetween }>
  //             <Typography>Bribe:</Typography>
  //             <Typography>{ formatCurrency(bribe.rewardAmount) } { bribe.token.symbol }</Typography>
  //           </div>)
  //         })
  //       }
  //     </div>
  //   )
  // }

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, gauges.length - page * rowsPerPage); // part of main code
  const marks = [
    {
      value: -100,
      label: "-100",
    },
    {
      value: 0,
      label: "0",
    },
    {
      value: 100,
      label: "100",
    },
  ];

  return (
    <>
    <Fragment>
      <Grid xs={12} className={style.tableMainBox}>
        {stableSort(gauges, getComparator(order, orderBy))
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((row, index) => {
            if (!row) {
              return null;
            }
            let sliderValue = sliderValues.find(
              (el) => el.address === row?.address
            )?.value;
            if (sliderValue) {
              sliderValue = BigNumber(sliderValue).toNumber(0);
            } else {
              sliderValue = 0;
            }

            return (
              <Paper
                elevation={0}
                className={style.tableRow}
                key={row?.gauge?.address}
              >
                <Container className={style.tableRowInner}>
                  <Grid xs={12} lg={2.5} className={style.tableBox1}>
                    <Box className={style.tableBox1Inner}>
                      <Box className={style.tableBoxInnerTop}>
                        <Box className={style.left}>
                          <Box className={style.img}>
                            <img
                              height={32}
                              width={32}
                              src={
                                row && row.token0 && row.token0.logoURI
                                  ? row.token0.logoURI
                                  : ``
                              }
                              alt="imageqw"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "/tokens/unknown-logo.png";
                              }}
                              srcSet=""
                            />
                          </Box>
                          <Box className={style.img}>
                            <img
                              height={32}
                              width={32}
                              src={
                                row && row.token1 && row.token1.logoURI
                                  ? row.token1.logoURI
                                  : ``
                              }
                              alt="imageqw"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "/tokens/unknown-logo.png";
                              }}
                              srcSet=""
                            />
                          </Box>
                        </Box>
                        <Typography variant="p" className={style.right}>
                          {row?.symbol}
                        </Typography>
                      </Box>
                      <Box className={style.tableBoxInnerBottom}>
                        <Typography variant="p">
                          {row?.isStable ? "Stable Pool" : "Volatile Pool"}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>

                  <Grid xs={12} lg={1.5} className={style.tableBox2}>
                    <Typography variant="p" className={style.tableBox2text}>
                      {poolStaked[index] &&
                        formatCurrency(
                          BigNumber(poolStaked[index][0]).div(10 ** 18)
                        )}
                    </Typography>
                   
                  </Grid>
                  
                  <Grid xs={12} lg={2} className={style.tableBox2}>
                    <Box style={{ marginLeft: "50px" }}>
                      <Typography variant="p" className={style.tableBox2text}>
                        {poolReward[index] &&
                          formatCurrency(
                            BigNumber(poolReward[index][0][0][0]?.solid).div(
                              10 ** 18
                            )
                          )}{" "}
                        Dystopia
                      </Typography>
                      <Typography variant="p" className={style.tableBox2text}>
                        {poolReward[index] &&
                          formatCurrency(
                            BigNumber(poolReward[index][0][0][0]?.sex).div(
                              10 ** 18
                            )
                          )}{" "}
                        Topia
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid xs={6} lg={1.5} className={style.tableBox3}>
                    <Button className={style.manageButton} onClick={()=>{openModel(row?.address , row , poolStaked[index])}}>
                      Manage
                    </Button>
                  </Grid>
                  <Grid xs={6} lg={1.5} className={style.tableBox3}>
                    <Button onClick={()=>{onclaimSingleEarning(row?.address)}}>Claim Earnings</Button>
                  </Grid>
                </Container>
              </Paper>
            );
          })}
      </Grid>
      
    </Fragment>

{open && (
  <Mymodel text="Manage Lp Staker" open={open} handleClose={handleClose}>
    <Box className={style.bottomContainerLeftBottom}>
      <Box className={style.bottomContainerpannelTop}>
        <Box
          sx={{ borderBottom: 1, borderColor: "divider" }}
          className={style.tabBox}
        >
          <Tabs
            value={modelTabs}
            onChange={handleChangeModeltab}
            className={style.tabs}
          >
            <Tab
              label="Stake"
              {...a11yProps(0, "model")}
              className={style.tab}
            />
            <Tab
              label="Withdraw"
              {...a11yProps(1, "model")}
              className={style.tab}
            />
          </Tabs>
        </Box>
      </Box>

      <TabPanel
        style={{ backgroundColor: "rgb(32 39 43)" }}
        value={modelTabs}
        index={0}
      >
        <Box className={style.tabPannel1}>
          <Box className={style.tabPannelrow3}>
            <Box className={style.tabPannelrow3Left}>
              <Box className={style.tabPannelrow3LeftInner}>
                <Box className={style.tabinputFields}>
                  <Input
                    autoFocus="autoFocus"
                    placeholder="Enter Amount"
                    className={style.AmountInput}
                    onChange={onInputField}
                    value={depositInput}
                  />
                  <Button className={style.buttontop} onClick={()=>{setDepositInput(maxLpBalance)}}>Max</Button>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box
            className={`${style.tabPannelrow3Right} ${style.modelButtons}`}
          >
            {/* <Button className={style.approveBtn} style={{ marginRight: '10px' }}>
              Approve
            </Button> */}
            <Button className={style.approveBtn} onClick={()=>{onDeposit()}}>Deposit</Button>
          </Box>
        </Box>
      </TabPanel>
      <TabPanel
        style={{ backgroundColor: "rgb(32 39 43)" }}
        value={modelTabs}
        index={1}
      >
        <Box className={`${style.tabPannel1} ${style.tabPannel1Modell}`}>
          <Box className={style.tabPannelrow3}>
            <Box className={style.tabPannelrow3Left}>
              <Box className={style.tabPannelrow3LeftInner}>
                <Box className={style.marginTop}>
                  <Box className={style.tabPannelrow3LeftInner}>
                    <Box className={style.tabinputFields}>
                      <Input
                      autoFocus="autoFocus"
                        placeholder="Enter Amount"
                        className={style.AmountInput}
                        onChange={onInputField}
                    value={depositInput}
                      />
                      <Button className={style.buttontop} onClick={()=>{setDepositInput(formatCurrency(
                          BigNumber(maxLpStaked).div(10 ** 18)
                        ,15)  )}}>Max</Button>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box
            className={`${style.tabPannelrow3Right} ${style.modelButtons}`}
          >
            <Button className={style.approveBtn} onClick={()=>{onWithdraw()}}>Withdraw</Button>
          </Box>
        </Box>
      </TabPanel>
    </Box>

    <Typography
      id="modal-modal-description"
      style={{
        textAlign: "center",
        borderTop: "1px solid rgb(2, 119, 250)",
        paddingTop: "10px",
      }}
      sx={{ mt: 2 }}
    >
      {/* Please Approve the contract */}
    </Typography>
  </Mymodel>
)}
</>
  );
}
