import React from 'react'
import style from './convert.module.css';

import TablePagination from '@mui/material/TablePagination';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
// import search from '../asset/images/search.svg';
import TextField from '@mui/material/TextField';
import voteStyle from './ssVotes.module.css';
import ButtonGroup from '@mui/material/ButtonGroup';
// import likeimage from '../asset/images/like.svg';
// import dislikeimage from '../asset/images/dislike.svg';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: 'transparent',
    padding: theme.spacing(1),
    textAlign: 'center',
    color: '#fff',
}));

export default function Vote() {

    return (
            <Container id="main" className={style.mainContainer}>
                <Box id="mainContainer" className={style.mainContainerInner}>
                    <Box className={style.containerTop}>
                        <Box className={style.topContainer}>
                            <Grid item className={style.topGrid1} lg={4}>
                                <Typography variant="h1" className={style.mainText}>Vote</Typography>
                            </Grid>

                            <Grid item className={style.topGrid2} xs={6} lg={2.25}>
                                <Paper elevation={1} className={style.topGrid2Inner}>
                                    <Typography className={style.topGrid2Innertext1}>Total Deposits</Typography>
                                    <Typography className={style.topGrid2InnerPrice}>0.00/0.00</Typography>
                                </Paper>
                            </Grid>
                        </Box>

                        {/* // Bottom */}
                        <Grid className={voteStyle.bottomContainer}>
                            <Grid xs={12} className={voteStyle.topContainerInner}>
                                <Paper className={voteStyle.topContainerBox}>
                                    <Box className={voteStyle.header1}>
                                        <Box className={voteStyle.left}>
                                            <Typography variant='p'>
                                                Vote for one or more pools to receive SOLID emissions.
                                            </Typography>
                                        </Box>
                                        <Box className={voteStyle.right}>
                                            <Box className={voteStyle.inputBoxContainer}>
                                                <Input placeholder="Search pools" className={voteStyle.inputBox}></Input>
                                                {/* <img src={search} alt="search" className={voteStyle.searchIcon} srcSet="" /> */}
                                            </Box>

                                        </Box>

                                    </Box>

                                    <Box className={voteStyle.header2}>
                                        <Typography variant="p" className={voteStyle.textRow2}>
                                            Voted this week: 10,922,147  vlSEX  (14.9% of locked)
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
                                                <Grid xs={12} container className={voteStyle.hederBoxInner}>
                                                    <Grid item xs={3}>
                                                        <Typography variant="p" className={voteStyle.headertext}>
                                                            USDC/OXD (Volatile)
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={2}>
                                                        <Typography variant="p" className={voteStyle.hyfernSymbol}>
                                                            ---
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={0.7}>
                                                        <Typography variant="p" className={voteStyle.hyfernSymbol}>
                                                            ---
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={2.3}>
                                                        <Typography variant="p" className={voteStyle.hyfernSymbol}>
                                                            ---
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={1}>
                                                        <Typography variant="p" className={voteStyle.hyfernSymbol}>
                                                            ---
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={3} className={voteStyle.multiBoxes}>
                                                        <Box className={voteStyle.boxes}>
                                                            <Box className={voteStyle.left}>
                                                                <TextField placeholder="Enter vote" className={voteStyle.inputBox} variant="outlined" />
                                                                <Button className={voteStyle.inpputButtonMax}>Max</Button>
                                                            </Box>
                                                            <Box className={voteStyle.right}>
                                                                <ButtonGroup variant="contained" aria-label="outlined primary button group">
                                                                    <Button className={voteStyle.like}>
                                                                        {/* <img src={likeimage} className={voteStyle.svgIcons} alt="likeimage" /> */}
                                                                    </Button>
                                                                    <Button className={voteStyle.dislike}>
                                                                        {/* <img src={dislikeimage} className={voteStyle.svgIcons} alt="likeimage" /> */}
                                                                    </Button>
                                                                </ButtonGroup>
                                                            </Box>
                                                        </Box>
                                                    </Grid>
                                                </Grid>
                                            </Grid>

                                            <Grid xs={12} item className={voteStyle.hederBox}>
                                                <Grid xs={12} container className={voteStyle.hederBoxInner}>
                                                    <Grid item xs={3}>
                                                        <Typography variant="p" className={voteStyle.headertext}>
                                                            USDC/OXD (Volatile)
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={2}>
                                                        <Typography variant="p" className={voteStyle.hyfernSymbol}>
                                                            ---
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={0.7}>
                                                        <Typography variant="p" className={voteStyle.hyfernSymbol}>
                                                            ---
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={2.3}>
                                                        <Typography variant="p" className={voteStyle.hyfernSymbol}>
                                                            ---
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={1}>
                                                        <Typography variant="p" className={voteStyle.hyfernSymbol}>
                                                            ---
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={3} className={voteStyle.multiBoxes}>
                                                        <Box className={voteStyle.boxes}>
                                                            <Box className={voteStyle.left}>
                                                                <TextField placeholder="Enter vote" className={voteStyle.inputBox} variant="outlined" />
                                                                <Button className={voteStyle.inpputButtonMax}>Max</Button>
                                                            </Box>
                                                            <Box className={voteStyle.right}>
                                                                <ButtonGroup variant="contained" aria-label="outlined primary button group">
                                                                    <Button className={voteStyle.like}>
                                                                        {/* <img src={likeimage} className={voteStyle.svgIcons} alt="likeimage" /> */}
                                                                    </Button>
                                                                    <Button className={voteStyle.dislike}>
                                                                        {/* <img src={dislikeimage} className={voteStyle.svgIcons} alt="likeimage" /> */}
                                                                    </Button>
                                                                </ButtonGroup>
                                                            </Box>
                                                        </Box>
                                                    </Grid>
                                                </Grid>
                                            </Grid>


                                            <Box style={{ width: '100%' }}>
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

                                        {/* list */}
                                        <Box className={voteStyle.bottomVoteListData}>
                                            <Box className={voteStyle.bottomVoteListBox}>
                                                <Typography className={voteStyle.textData}>USDC/OXD (Volatile)</Typography>
                                                <Typography className={voteStyle.textData}>3,392,968</Typography>
                                            </Box>
                                        </Box>

                                        <Box className={voteStyle.bottomVoteListData}>
                                            <Box className={voteStyle.bottomVoteListBox}>
                                                <Typography className={voteStyle.textData}>USDC/OXD (Volatile)</Typography>
                                                <Typography className={voteStyle.textData}>3,392,968</Typography>
                                            </Box>
                                        </Box>

                                        <Box className={voteStyle.bottomVoteListData}>
                                            <Box className={voteStyle.bottomVoteListBox}>
                                                <Typography className={voteStyle.textData}>USDC/OXD (Volatile)</Typography>
                                                <Typography className={voteStyle.textData}>3,392,968</Typography>
                                            </Box>
                                        </Box>

                                        <Box style={{ width: '100%',marginTop: '50px'}}>
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
            </Container>

    )
}
