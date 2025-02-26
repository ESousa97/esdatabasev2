// src/components/Common/Modal.js
import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';

const Modal = ({ open, onClose, title, content, actions }) => {
  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="modal-title" aria-describedby="modal-description">
      {title && <DialogTitle id="modal-title">{title}</DialogTitle>}
      {content && (
        <DialogContent>
          <DialogContentText id="modal-description">{content}</DialogContentText>
        </DialogContent>
      )}
      {actions && <DialogActions>{actions}</DialogActions>}
    </Dialog>
  );
};

export default Modal;
