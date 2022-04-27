import { calendarPickerSkeletonClasses } from '@mui/lab';
import React, { useState, useEffect } from 'react';
import classes from '../../pages/vote/vote.module.css';
import CCPartner from '../../components/ssPartners/ssPartners';
import { Typography, Button, Paper, SvgIcon } from "@mui/material";
import Unlock from '../../components/unlock';

import stores from '../../stores';
import { ACTIONS } from '../../stores/constants';
function Partner({ changeTheme }) {

  const accountStore = stores.accountStore.getStore('account');
  const [account, setAccount] = useState(accountStore);
  const [unlockOpen, setUnlockOpen] = useState(false);

  useEffect(() => {
    const accountConfigure = () => {
      const accountStore = stores.accountStore.getStore('account');
      setAccount(accountStore);
      closeUnlock();
    };
    const connectWallet = () => {
      onAddressClicked();
    };

    stores.emitter.on(ACTIONS.ACCOUNT_CONFIGURED, accountConfigure);
    stores.emitter.on(ACTIONS.CONNECT_WALLET, connectWallet);
    return () => {
      stores.emitter.removeListener(ACTIONS.ACCOUNT_CONFIGURED, accountConfigure);
      stores.emitter.removeListener(ACTIONS.CONNECT_WALLET, connectWallet);
    };
  }, []);

  const onAddressClicked = () => {
    setUnlockOpen(true);
  };

  const closeUnlock = () => {
    setUnlockOpen(false);
  };
  const [tab, setTab] = useState("token")

  return (
    <div className={classes.ffContainer}>
      {account && account.address ?
        <div className={classes.connected}>
          <CCPartner />
        </div>
        :
        <Paper className={classes.notConnectedContent}>
          <div className={classes.sphere}></div>
          <div className={classes.contentFloat}>
            <Typography className={classes.mainHeadingNC} variant='h1'>Convert</Typography>
            <Typography className={classes.mainDescNC} color='common.white' variant='body2'>
              Use your veSolid to vote for your selected liquidity pair’s rewards distribution or create a bribe to encourage others to do the same.
            </Typography>
            <Button
              disableElevation
              className={classes.buttonConnect}
              variant="contained"
              onClick={onAddressClicked}>
              {account && account.address && <div className={`${classes.accountIcon} ${classes.metamask}`}></div>}
              <Typography>Connect Wallet to Continue</Typography>
            </Button>
          </div>
        </Paper>
      }
      {unlockOpen && <Unlock modalOpen={unlockOpen} closeModal={closeUnlock} />}
    </div>
  );
}

export default Partner;
