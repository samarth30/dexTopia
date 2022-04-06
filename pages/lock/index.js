import { calendarPickerSkeletonClasses } from '@mui/lab';
import React, { useState, useEffect } from 'react';
import classes from './lock.module.css';

function Lock({ changeTheme }) {
    const [tab, setTab] = useState("token")

  return (
    <div className={classes.container}>
        <div className={classes.title}>
            <div className={classes.heading}>
                <h1>Lock Sex</h1>
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
            {/* <h1>Convert and Stake Solidity NFTs/Tokens Into SOLIDsex</h1>
            <div className={classes.tabs}>
                <p onClick={() => {setTab("token")}}>SOLID TOKEN</p>
                <p onClick={() => {setTab("nft")}}>SOLID NFT</p>
            </div>
            {
                tab === "token" && (
                    <div className={classes.formWrapper}>
                <p>Balance: 0 SOLID</p>
                <form className={classes.form}>
                    <div className={classes.inputBtn}>
                        <input type="Text" placeholder="Enter Amount"/>
                        <button id="clear">Max</button>
                    </div>
                    <div className={classes.approveConvertBtn}>
                        <button id="approve">Approve</button>
                        <button id="convert">Convert</button>
                    </div>
                </form>
                <p>Converting 0 SOLID Tokens to 0 SOLIDsex</p>
            </div>
                )
            }
            {
                tab === "nft" && (
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
                <p>Converting 0 SOLID Tokens to 0 SOLIDsex</p>
            </div>
                )
            } */}
            <div className={classes.footerContainer} style={{color: "#fff", display: "flex", fontWeight: "bolder"}}>
                <div className={classes.stakedName}>Staked SolidSEX </div>
                <div className={classes.tvl}>78112286.2</div>
                <div className={classes.apr}>127.9%</div>
                <div className={classes.stake}>0</div>
                <div className={classes.earnings}>
                    <p style={{margin: "0"}}>0 SEX</p>
                    <p style={{margin: "0"}}>0 SOLID</p>
                </div>
                <div className={classes.manage}>
                    <button>Manage</button>
                </div>
                <div className={classes.claim}>
                    <button>Claim</button>
                </div>
            </div>
        </div>
    </div>
  );
}

export default Lock;
