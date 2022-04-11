import React, { useState, useEffect } from 'react';
import { useRouter } from "next/router";

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import SvgIcon from '@mui/material/SvgIcon';
import ArrowDropDown from '@mui/icons-material/ArrowDropDown';
import DashboardOutlined from '@material-ui/icons/DashboardOutlined';
import AccountBalanceWalletOutlined from '@material-ui/icons/AccountBalanceWalletOutlined';
import NotificationsNoneOutlined from '@material-ui/icons/NotificationsNoneOutlined';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { withStyles, withTheme } from "@mui/styles";
import Unlock from "../unlock";
import TransactionQueue from "../transactionQueue";

import { ACTIONS } from "../../stores/constants";

import stores from "../../stores";
import { formatAddress } from "../../utils";
import { useAppThemeContext } from '../../ui/AppThemeProvider';

import style from './header.module.css';
// import logo from '../../public/images/logo.svg';
// import starLogo from '../../public/images/star.svg';


const pages = ['HOME', 'SWAP', 'POOLS', 'CONVERT SOLID', 'LOCK SEX', 'VOTE', 'LIQUIDITY', 'VEST'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const returnPage = (page) => {
  switch (page) {
    case 'HOME':
      return 'home'
      break;
    case 'SWAP':
      return 'swap'
      break;
    case 'POOLS':
      return 'pools'
      break;
    case 'CONVERT SOLID':
      return 'convert'
      break;
    case 'LOCK SEX':
      return 'lock'
      break;
    case 'VOTE':
      return 'vote'
      break;
    case 'LIQUIDITY':
      return 'liquidity'
      break;
    case 'VEST':
      return 'vest'
      break;
    default:
      break;
  }
}

const {
  CONNECT_WALLET,
  CONNECTION_DISCONNECTED,
  ACCOUNT_CONFIGURED,
  ACCOUNT_CHANGED,
  FIXED_FOREX_BALANCES_RETURNED,
  FIXED_FOREX_CLAIM_VECLAIM,
  FIXED_FOREX_VECLAIM_CLAIMED,
  FIXED_FOREX_UPDATED,
  ERROR,
} = ACTIONS;

function WrongNetworkIcon(props) {
  const { color, className } = props;
  return (
    <SvgIcon viewBox="0 0 64 64" strokeWidth="1" className={className}>
      <g strokeWidth="2" transform="translate(0, 0)">
        <path
          fill="none"
          stroke="#ffffff"
          strokeWidth="2"
          strokeLinecap="square"
          strokeMiterlimit="10"
          d="M33.994,42.339 C36.327,43.161,38,45.385,38,48c0,3.314-2.686,6-6,6c-2.615,0-4.839-1.673-5.661-4.006"
          strokeLinejoin="miter"
        ></path>{" "}
        <path
          fill="none"
          stroke="#ffffff"
          strokeWidth="2"
          strokeLinecap="square"
          strokeMiterlimit="10"
          d="M47.556,32.444 C43.575,28.462,38.075,26,32,26c-6.075,0-11.575,2.462-15.556,6.444"
          strokeLinejoin="miter"
        ></path>{" "}
        <path
          fill="none"
          stroke="#ffffff"
          strokeWidth="2"
          strokeLinecap="square"
          strokeMiterlimit="10"
          d="M59.224,21.276 C52.256,14.309,42.632,10,32,10c-10.631,0-20.256,4.309-27.224,11.276"
          strokeLinejoin="miter"
        ></path>{" "}
        <line
          data-color="color-2"
          fill="none"
          stroke="#ffffff"
          strokeWidth="2"
          strokeLinecap="square"
          strokeMiterlimit="10"
          x1="10"
          y1="54"
          x2="58"
          y2="6"
          strokeLinejoin="miter"
        ></line>
      </g>
    </SvgIcon>
  );
}

const StyledMenu = withStyles({
  paper: {
    border: "1px solid rgba(126,153,176,0.2)",
    marginTop: "10px",
    minWidth: "230px",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: "none",
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: "#FFF",
      },
    },
  },
}))(MenuItem);

const Header = () => {
  const accountStore = stores.accountStore.getStore("account");
  const router = useRouter();

  const [account, setAccount] = useState(accountStore);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [unlockOpen, setUnlockOpen] = useState(false);
  const [chainInvalid, setChainInvalid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [transactionQueueLength, setTransactionQueueLength] = useState(0);

  useEffect(() => {
    const accountConfigure = () => {
      const accountStore = stores.accountStore.getStore("account");
      setAccount(accountStore);
      closeUnlock();
    };
    const connectWallet = () => {
      onAddressClicked();
    };
    const accountChanged = () => {
      const invalid = stores.accountStore.getStore("chainInvalid");
      setChainInvalid(invalid);
    };

    const invalid = stores.accountStore.getStore("chainInvalid");
    setChainInvalid(invalid);

    stores.emitter.on(ACCOUNT_CONFIGURED, accountConfigure);
    stores.emitter.on(CONNECT_WALLET, connectWallet);
    stores.emitter.on(ACCOUNT_CHANGED, accountChanged);
    return () => {
      stores.emitter.removeListener(ACCOUNT_CONFIGURED, accountConfigure);
      stores.emitter.removeListener(CONNECT_WALLET, connectWallet);
      stores.emitter.removeListener(ACCOUNT_CHANGED, accountChanged);
    };
  }, []);

  const onAddressClicked = () => {
    setUnlockOpen(true);
  };

  const closeUnlock = () => {
    setUnlockOpen(false);
  };

  const navigate = (url) => {
    router.push(url);
  };

  const callClaim = () => {
    setLoading(true);
    stores.dispatcher.dispatch({
      type: FIXED_FOREX_CLAIM_VECLAIM,
      content: {},
    });
  };

  const switchChain = async () => {
    let hexChain = "0x" + Number(process.env.NEXT_PUBLIC_CHAINID).toString(16);
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: hexChain }],
      });
    } catch (switchError) {
      console.log("switch error", switchError);
    }
  };

  const setQueueLength = (length) => {
    setTransactionQueueLength(length);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // const { appTheme } = useAppThemeContext();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (page) => {
    setAnchorElNav(null);
    router.push(`/${page}`);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const { appTheme } = useAppThemeContext();

  return (
    <AppBar position="static" className={style.headermenu}>
      <Container maxWidth="xl" className={style.headerContainer}>
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
            onClick={() => router.push("/home")}
          >
            {/* <img src={logo} alt="logo header" /> */}
            DexTopia
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            {/* <img src={logo} alt="logo header" /> */}
            LogoHeader
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={
                  () => {
                    const pg = returnPage(page);
                    router.push(`/${pg}`)
                  }}
                sx={{ my: 2, color: 'white', display: 'block' }}
                style={{color: "#fff !important"}}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }} className={style.navbarRight}>
            <Box className={style.navBarRightTextMain}>
              <Box className={style.navBarRightTextInner}>
                <Box className={style.navBarRightLogo}>
                  {/* <img src={starLogo} alt="starLogo" /> */}
                  star logo
                </Box>
              </Box>
            </Box>
            <Box>
              {/* <Button variant="contained" className={style.buttonNavbar}>Connect wallet</Button> */}
              {account && account.address ? (
            <div>
              <Button
                disableElevation
                className={style.buttonNavbar}
                variant="contained"
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
              >
                {account && account.address && (
                  <div
                    // className={`${style.accountIcon} ${cstylemetamask}`}
                  ></div>
                )}
                  {account && account.address
                    ? formatAddress(account.address)
                    : "Connect Wallet"}
                <ArrowDropDown />
              </Button>

              <StyledMenu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                // className={style.userMenu}
              >
                <StyledMenuItem
                  className={style.hidden}
                  onClick={() => router.push("/dashboard")}
                >
                  <ListItemIcon className={style.userMenuIcon}>
                    <DashboardOutlined fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    className={style.userMenuText}
                    primary="Dashboard"
                  />
                </StyledMenuItem>
                <StyledMenuItem onClick={onAddressClicked}>
                  <ListItemIcon className={style.userMenuIcon}>
                    <AccountBalanceWalletOutlined fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    className={style.userMenuText}
                    primary="Switch Wallet Provider"
                  />
                </StyledMenuItem>
              </StyledMenu>
            </div>
          ) : (
            <Button
              disableElevation
              className={style.buttonNavbar}
              variant="contained"
              onClick={onAddressClicked}
            >
              {account && account.address && (
                <div
                  className={`${style.accountIcon} ${style.metamask}`}
                ></div>
              )}

              {!account?.address && (
                <img src="/images/ui/icon-wallet.svg" className={style.walletIcon} />
              )}

              <div className={style.walletPointContainer}>
                <div className={style.walletPoint}>
                </div>
              </div>

              <Typography className={style.headBtnTxt}>
                {account && account.address
                  ? formatAddress(account.address)
                  : "Connect Wallet"}
              </Typography>
            </Button>
          )}
            </Box>

            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
