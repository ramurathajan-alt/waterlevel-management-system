import React from 'react';
import './ConfirmationDialog.css';

type ConfirmationDialogProps = {
  action: 'open' | 'close';
  onCancel: () => void;
  onConfirm: () => void;
};

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({ action, onCancel, onConfirm }) => {
  return (
    <div className="confirmation-dialog">
      <h3>Confirm Gate Action</h3>
      <p>Are you sure you want to {action} this gate?</p>
      <button className="cancel-button" onClick={onCancel}>Cancel</button>
      <button className="confirm-button" onClick={onConfirm}>Confirm {action}</button>
    </div>
  );
};

export default ConfirmationDialog;
