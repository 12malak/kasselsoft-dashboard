import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
function DeleteDialog({ open, onClose }) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const isLightMode=theme.palette.mode === 'light';
    const buttonDialogStyle = {
        color :isLightMode ? "#000" :"#fff"
    }
    return (
        <Dialog
            fullScreen={fullScreen}
            open={open}
            onClose={onClose}
            aria-labelledby="responsive-dialog-title"
        >
            <DialogTitle id="responsive-dialog-title" style={{display:"flex"}}>
           <WarningAmberIcon style={{color:"red"}}/>{"Confirm Delete"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to delete this item? This action cannot be undone.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={onClose} style={buttonDialogStyle}>
                    Cancel
                </Button>
                <Button onClick={onClose} color="primary" style={{color:"red"}}>
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default DeleteDialog;
