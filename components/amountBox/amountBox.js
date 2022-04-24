import React from 'react'
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import amountStyle from './amountBox.module.css';

export default function AmountBox({text1,text2,text3}) {
    return (
        <Grid item xs={12} xs={4} className={amountStyle.mainAmountContainer}>
            <Paper className={amountStyle.statsBox} spacing={3}>
                <Typography className={amountStyle.text1} variant="p">{text1}</Typography>
                <Typography className={amountStyle.text2} variant="p">{text2}</Typography>
                <Typography className={amountStyle.text3} variant="p">{text3}</Typography>

            </Paper>
        </Grid>
    )
}
