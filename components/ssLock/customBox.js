import React , {useState} from "react";
import boxStyle from "./box.module.css";
import { formatCurrency } from "../../utils/utils";
import TablePagination from "@mui/material/TablePagination";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import stores from '../../stores'
import { ACTIONS } from '../../stores/constants';
import Paper from "@mui/material/Paper";
import BigNumber from "bignumber.js";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import PoolsRow from "../poolsRow/poolsRow";
import Mymodel from "./Mymodel"
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import style from './poolsRow.module.css';
import {  Select, MenuItem } from '@mui/material';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "rgb(32, 39, 43)",
    color: "#fff",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    color: "#fff",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(n)": {
    backgroundColor: "rgb(32, 39, 43)",
  },
  td: {
    color: "#fff",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function CustomBox({
  text,
  amount,
  col,
  tableSize,
  rows,
  isPegination,
}) {


    const [open, setOpen] = useState(false)
    const [MaxAmount, setMaxAmount] = useState(0)

  const openModel = (weeks , maxamount) => {
    SetLockInput(0)
      setfetchedweeks(weeks);
      setMaxAmount(maxamount);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const[weekInputField,setWeekInputField] = useState(11);

  const onChangeWeekInputField = (e)=>{
    setWeekInputField(e.target.value);
  }

  const[fetchedweeks , setfetchedweeks] = useState(0);

  const[lockInput,SetLockInput] = useState(0);

  const onChangeLockInput = (e)=>{
    SetLockInput(e.target.value);
  }

  function reverseFormatNumber(val,locale){
    var group = new Intl.NumberFormat(locale).format(1111).replace(/1/g, '');
    var decimal = new Intl.NumberFormat(locale).format(1.1).replace(/1/g, '');
    var reversedVal = val.replace(new RegExp('\\' + group, 'g'), '');
    reversedVal = reversedVal.replace(new RegExp('\\' + decimal, 'g'), '.');
    return Number.isNaN(reversedVal)?0:reversedVal;
}

  const extendLockFunction = async () => {
    // setDepositLoading(true)
    await stores.dispatcher.dispatch({
      type: ACTIONS.DEXTOPIA_TOCKEN_LOCKER_EXTEND,
      content: { amount: reverseFormatNumber(lockInput) ,  weeks: fetchedweeks , newWeeks  :weekInputField },
    });
  };

  return (
    <Box className={boxStyle.boxInner}>
      <Box className={boxStyle.topContainer}>
        <Typography variant="h3" className={boxStyle.h3text}>
          {text}
        </Typography>
        <Typography variant="h5">{amount ? amount : "$0"}</Typography>
      </Box>
      <Box className={boxStyle.bottomContainer}>
        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: tableSize ? tableSize : 500 }}
            aria-label="customized table"
          >
            <TableHead>
              <TableRow>
                <StyledTableCell>Amount</StyledTableCell>
                <StyledTableCell>Expiry</StyledTableCell>
                <StyledTableCell>Weeks</StyledTableCell>
                <StyledTableCell></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows?.activeUserLocks &&
                rows?.activeUserLocks?.length > 0 &&
                rows?.activeUserLocks.map((row, i) => (
                  <StyledTableRow key={i}>
                    <StyledTableCell component="th" scope="row">
                      {formatCurrency(BigNumber(row[1]).div(10 ** 18))}
                    </StyledTableCell>
                    {console.log(
                      "date",
                      parseFloat(rows?.startTimeTockenLocker) +
                        (parseFloat(rows?.getweek) + parseFloat(row[0])) *
                          604800
                    )}
                    <StyledTableCell>{`${new Date(
                      (parseFloat(rows?.startTimeTockenLocker) +
                        (parseFloat(rows?.getweek) + parseFloat(row[0])) *
                          604800) *
                        1000
                    ).toDateString()}`}</StyledTableCell>
                    <StyledTableCell>{row[0]}</StyledTableCell>
                    <Button
                      variant="contained"
                      disableElevation
                      style={{
                        background: "#842fb9 none repeat scroll 0% 0%",
                        border: "1px solid #842fb9",
                      }}
                      onClick={()=>{openModel(row[0],formatCurrency(BigNumber(row[1]).div(10 ** 18))) }}
                    >
                      extend Lock
                    </Button>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>

          {isPegination && (
            <TablePagination
              component="div"
              className={boxStyle.pagenation}
              count={100}
              page={1}
              onPageChange={null}
              rowsPerPage={10}
              onRowsPerPageChange={null}
            />
          )}
        </TableContainer>
      </Box>

      <Box className={boxStyle.buttonDiv}>
        <Button
          variant="contained"
          disableElevation
          style={{
            background: "#842fb9 none repeat scroll 0% 0%",
            border: "1px solid #842fb9",
          }}
        >
          Disable elevation
        </Button>
      </Box>
      {open && (
        <Mymodel text="Manage Tocken Locker" open={open} handleClose={handleClose}>
          <Box className={style.bottomContainerLeftBottom}>
            <Box className={style.bottomContainerpannelTop}>
              <Box
                sx={{ borderBottom: 1, borderColor: "divider" }}
                className={style.tabBox}
              >
                {/* <Tabs
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
                </Tabs> */}
                <Box className={style.tabPannel1}>
                <Box className={style.tabPannelrow3}>
                  <Box className={style.tabPannelrow3Left}>
                    <Box className={style.tabPannelrow3LeftInner}>
                      <Box className={style.tabinputFields}>
                        <Input
                        value={lockInput}
                        onChange={onChangeLockInput}
                          placeholder="Enter Amount"
                          className={style.AmountInput}
                          style={{ color: "#fff" }}
                        />
                        <Button className={style.buttontop}
                         onClick={()=>{SetLockInput(MaxAmount)}}>Max</Button>
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Age"
                  value={fetchedweeks}
         
                >
                  <MenuItem value={fetchedweeks}>{fetchedweeks} weeks</MenuItem>
                </Select>
                <br></br>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Age"
                  value={weekInputField}
                  onChange={onChangeWeekInputField}
                >
                  <MenuItem value={11}>11 weeks</MenuItem>
                  <MenuItem value={12}>12 weeks</MenuItem>
                  <MenuItem value={13}>13 weeks</MenuItem>
                  <MenuItem value={14}>14 weeks</MenuItem>
                  <MenuItem value={15}>15 weeks</MenuItem>
                  <MenuItem value={16}>16 weeks</MenuItem>
                </Select>
                <Box
                  className={`${style.modelButtons}`}
                  style={{
                    display: "flex",
                    flexFlow: "row wrap",
                    marginLeft: "0px !important",
                    marginTop: "20px",
                  }}
                >
                  {/* <Button className={style.approveBtn} style={{ marginRight: '10px' }}>
                      Approve
                    </Button> */}
                  {/* <Button
                    className={style.approveBtn}
                    style={{ background: "rgb(2, 119, 250)", color: "#fff" }}
                  >
                    Convert tokens
                  </Button> */}
                  <Button
                    className={style.approveBtn}
                    style={{ background: "rgb(2, 119, 250)", color: "#fff", marginLeft: "0.5rem" }}
                    onClick={()=>{extendLockFunction()}}
                  >
                    Lock tokens
                  </Button>
                </Box>
              </Box>
              </Box>
            </Box>
          </Box>

          {/* <Typography
            id="modal-modal-description"
            style={{
              textAlign: "center",
              borderTop: "1px solid rgb(2, 119, 250)",
              paddingTop: "10px",
            }}
            sx={{ mt: 2 }}
          >
            Please Approve the contract
          </Typography> */}
        </Mymodel>
      )}
    </Box>
  );
}
