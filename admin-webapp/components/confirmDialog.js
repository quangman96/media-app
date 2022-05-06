import { Button, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {useState} from 'react'
const ConfirmDialog = (props) => {
  const { title, children, open, setOpen, onConfirm, id, pagination } = props;
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="confirm-dialog"
    >
      <DialogTitle id="confirm-dialog">{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          onClick={() => setOpen(false)}
          sx={{border: "1px solid #bfbfbf", color: "#adadad"}}
        >
          No
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            setOpen(false);
            onConfirm(id, pagination);
          }}
          color="primary"
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );

};
export default ConfirmDialog;