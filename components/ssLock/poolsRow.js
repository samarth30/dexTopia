import React, { Fragment, useState, useEffect } from 'react';
import style from './poolsRow.module.css';
import { Typography, Slider, Tooltip, Box, Container, Grid, Paper, Input, Button } from '@mui/material';
import BigNumber from 'bignumber.js';
import stores from '../../stores'
import { ACTIONS } from '../../stores/constants';
import { formatCurrency } from '../../utils';
import { makeStyles, withStyles } from '@mui/styles';
import Skeleton from '@mui/lab/Skeleton';

function descendingComparator(a, b, orderBy) {
    if (!a || !b) {
      return 0;
    }
  
    switch (orderBy) {
      case 'balance':
  
        if (BigNumber(b?.gauge?.balance).lt(a?.gauge?.balance)) {
          return -1;
        }
        if (BigNumber(b?.gauge?.balance).gt(a?.gauge?.balance)) {
          return 1;
        }
        return 0;
  
      case 'liquidity':
  
        let reserveA = BigNumber(a?.reserve0).plus(a?.reserve1).toNumber()
        let reserveB = BigNumber(b?.reserve0).plus(b?.reserve1).toNumber()
  
        if (BigNumber(reserveB).lt(reserveA)) {
          return -1;
        }
        if (BigNumber(reserveB).gt(reserveA)) {
          return 1;
        }
        return 0;
  
      case 'totalVotes':
  
        if (BigNumber(b?.gauge?.weightPercent).lt(a?.gauge?.weightPercent)) {
          return -1;
        }
        if (BigNumber(b?.gauge?.weightPercent).gt(a?.gauge?.weightPercent)) {
          return 1;
        }
        return 0;
  
      case 'apy':
  
        if (BigNumber(b?.gauge?.bribes.length).lt(a?.gauge?.bribes.length)) {
          return -1;
        }
        if (BigNumber(b?.gauge?.bribes.length).gt(a?.gauge?.bribes.length)) {
          return 1;
        }
        return 0;
  
      case 'myVotes':
      case 'mvp':
  
        if (BigNumber(b?.gauge?.bribes.length).lt(a?.gauge?.bribes.length)) {
          return -1;
        }
        if (BigNumber(b?.gauge?.bribes.length).gt(a?.gauge?.bribes.length)) {
          return 1;
        }
        return 0;
  
      default:
        return 0
    }
  
  }
  
  function getComparator(order, orderBy) {
    return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
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
    { id: 'asset', numeric: false, disablePadding: false, label: 'Asset' },
    {
      id: 'balance',
      numeric: true,
      disablePadding: false,
      label: 'My Stake',
    },
    {
      id: 'liquidity',
      numeric: true,
      disablePadding: false,
      label: 'Total Liquidity',
    },
    {
      id: 'totalVotes',
      numeric: true,
      disablePadding: false,
      label: 'Total Votes',
    },
    {
      id: 'apy',
      numeric: true,
      disablePadding: false,
      label: 'Bribes',
    },
    {
      id: 'myVotes',
      numeric: true,
      disablePadding: false,
      label: 'My Votes',
    },
    {
      id: 'mvp',
      numeric: true,
      disablePadding: false,
      label: 'My Vote %',
    }
  ];

export default function PoolsRow({ gauges, setParentSliderValues, defaultVotes, veToken, token,poolReward , poolStaked }) {
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('totalVotes');
  const [sliderValues, setSliderValues] = useState(defaultVotes)
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [ depositLoading, setDepositLoading ] = useState(false)
  const [depositInput,setDepositInput] = useState(false);

  useEffect(() => {
    setSliderValues(defaultVotes)
  }, [defaultVotes]);

  const onSliderChange = (event, value, asset) => {
    let newSliderValues = [...sliderValues]

    newSliderValues = newSliderValues.map((val) => {
      if(asset?.address === val.address) {
        val.value = value
      }
      return val
    })

    setParentSliderValues(newSliderValues)
  }

   
  const onInputField = async (e)=>{
    setDepositInput(e.target.value)
  }

  const onDeposit = async (poolAddress) => {
    setDepositLoading(true)
   await stores.dispatcher.dispatch({ type: ACTIONS.DEPOSITPOOL, content: { poolAddress:poolAddress, amount: depositInput }})
  }

  const onWithdraw = async (poolAddress) => {
    setDepositLoading(true)
   await stores.dispatcher.dispatch({ type: ACTIONS.WITHDRAW_LPDEPOSITOR, content: { poolAddress:poolAddress, amount: depositInput }})
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

//   if (!gauges) {
//     return (
//       <div className={classes.root}>
//         <Skeleton variant="rect" width={'100%'} height={40} className={classes.skelly1} />
//         <Skeleton variant="rect" width={'100%'} height={70} className={classes.skelly} />
//         <Skeleton variant="rect" width={'100%'} height={70} className={classes.skelly} />
//         <Skeleton variant="rect" width={'100%'} height={70} className={classes.skelly} />
//         <Skeleton variant="rect" width={'100%'} height={70} className={classes.skelly} />
//         <Skeleton variant="rect" width={'100%'} height={70} className={classes.skelly} />
//       </div>
//     );
//   }

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

//   const emptyRows = rowsPerPage - Math.min(rowsPerPage, gauges.length - page * rowsPerPage);
//   const marks = [
//   {
//     value: -100,
//     label: '-100',
//   },
//   {
//     value: 0,
//     label: '0',
//   },
//   {
//     value: 100,
//     label: '100',
//   },
// ];

    return (
        <Fragment>
            <Grid xs={12} className={style.tableMainBox}>
                <Paper elevation={0} className={style.tableRow}>
                    <Container className={style.tableRowInner}>
                        <Grid xs={12} lg={2.5} className={style.tableBox1}>
                            <Box className={style.tableBox1Inner}>
                                <Box className={style.tableBoxInnerTop}>
                                    <Box className={style.left}>
                                        <Box className={style.img}>
                                            {/* <img height={32} width={32} src={imgPng} alt="imageqw" srcSet="" /> */}
                                            Imagge
                                        </Box>
                                        <Box className={style.img}>
                                            {/* <img height={32} width={32} src={imgPng} alt="imagewer" srcSet="" /> */}
                                            Imagge
                                        </Box>
                                    </Box>
                                    <Typography variant="p" className={style.right}>
                                        USDC/MIM
                                    </Typography>
                                </Box>
                                <Box className={style.tableBoxInnerBottom}>
                                    <Typography variant='p'>
                                        Pool type: Stable
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>

                        <Grid xs={12} lg={1.5} className={style.tableBox2}>
                            <Typography variant="p" className={style.tableBox2text}>
                                $121.88m
                            </Typography>
                            {/* <img src={symbolcircle} className={style.svgIcon} alt="symbol" srcSet="" /> */}
                        </Grid>
                        <Grid xs={12} lg={1.5} className={style.tableBox2}>
                            <Typography variant="p" className={style.tableBox2text}>
                                14.5%
                            </Typography>
                        </Grid>
                        <Grid xs={12} lg={1.5} className={style.tableBox2}>
                            <Typography variant="p" className={style.tableBox2text}>
                                $0.00
                            </Typography>
                        </Grid>
                        <Grid xs={12} lg={2} className={style.tableBox2}>
                            <Box style={{ marginLeft: '50px' }}>
                                <Typography variant="p" className={style.tableBox2text}>
                                    0 Sex
                                </Typography>
                                <Typography variant="p" className={style.tableBox2text}>
                                    0 Solid
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid xs={6} lg={1.5} className={style.tableBox3}>
                            <Button className={style.manageButton}>Manage</Button>
                        </Grid>
                        <Grid xs={6} lg={1.5} className={style.tableBox3}>
                            <Button>Claim Earnings</Button>
                        </Grid>
                    </Container>
                </Paper>
            </Grid>
        </Fragment>
    )
}