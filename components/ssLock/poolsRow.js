import React, { Fragment } from 'react';
import style from './poolsRow.module.css';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import Input from '@mui/material/Input';
import Button from '@mui/material/Button';

export default function PoolsRow() {
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
