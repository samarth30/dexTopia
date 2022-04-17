import React from 'react'
import boxStyle from './box.module.css';

import TablePagination from '@mui/material/TablePagination';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import PoolsRow from '../poolsRow/poolsRow'


import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: 'rgb(32, 39, 43)',
        color: "#fff",
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        color: "#fff",
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(n)': {
        backgroundColor: 'rgb(32, 39, 43)',
    },
    'td': {
        color: '#fff',
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    }
}));



export default function CustomBox({text,amount, col, tableSize, rows, isPegination }) {
    return (
        <Box className={boxStyle.boxInner}>
            <Box className={boxStyle.topContainer}>
                <Typography variant="h3" className={boxStyle.h3text}>
                    {text}
                </Typography>
                <Typography variant="h5">
                    {amount ? amount : "$0"}
                </Typography>
            </Box>
            <Box className={boxStyle.bottomContainer}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: tableSize ? tableSize : 500 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Dessert (100g serving)</StyledTableCell>
                                <StyledTableCell>Calories</StyledTableCell>
                                <StyledTableCell>Fat(g)</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows && rows.length > 0 && rows.map((row) => (
                                <StyledTableRow key={row.name}>
                                    <StyledTableCell component="th" scope="row">
                                        {row.name}
                                    </StyledTableCell>
                                    <StyledTableCell>{row.calories}</StyledTableCell>
                                    <StyledTableCell>{row.fat}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>

                    {
                        isPegination && (
                            <TablePagination
                                component="div"
                                className={boxStyle.pagenation}
                                count={100}
                                page={1}
                                onPageChange={null}
                                rowsPerPage={10}
                                onRowsPerPageChange={null}
                            />
                        )
                    }

                </TableContainer>
            </Box>

            <Box className={boxStyle.buttonDiv}>
                <Button variant="contained" disableElevation style={{background: "#842fb9 none repeat scroll 0% 0%", border: "1px solid #842fb9"}}>
                    Disable elevation
                </Button>
            </Box>
        </Box>
    )
}
