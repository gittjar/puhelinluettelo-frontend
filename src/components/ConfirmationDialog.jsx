import React from 'react';

const ConfirmationDialog = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="confirmation-dialog">
      <p>{message}</p>
      <button className="button-confirmation" onClick={onConfirm}>Yes</button>
      <button className="button-confirmation" onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default ConfirmationDialog;
