import React, { Fragment } from 'react';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import modelStyle from './model.module.css';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    color: '#fff',
    bgcolor: '#20272b',
    borderRdius: '4px',
    border: '1px solid rgb(2, 119, 250)',
    boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
    p: 4,
};

export default function Mymodel({ open, text, handleClose, children }) {
    return (
        <Fragment>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                closeAfterTransition
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <Box className={modelStyle.modelHeader}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                {text}
                            </Typography>
                            <img src="/images/close.svg" onClick={handleClose} className={modelStyle.modalclloseImage} alt="closeIcon" />
                        </Box>
                        {children}
                    </Box>
                </Fade>
            </Modal>
        </Fragment>
    )
}