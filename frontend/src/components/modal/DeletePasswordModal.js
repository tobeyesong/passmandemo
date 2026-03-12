/** @format */

import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import StandardModal from "./StandardModal";
import { useDeletePasswordMutation } from "../../hooks/usePasswords";
import {
  modalDangerButtonClassName,
  modalDangerButtonStyle,
  modalSecondaryButtonClassName,
} from "./modalTheme";

const DeletePasswordModal = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const deletePasswordMutation = useDeletePasswordMutation();
  const closeTo = location.state?.backgroundLocation?.pathname || "/passwords";
  const handleClose = () => navigate(closeTo);

  const deleteHandler = async () => {
    await deletePasswordMutation.mutateAsync(id);
    navigate(closeTo);
  };

  const actions = (
    <React.Fragment>
      <button
        type='button'
        className={modalSecondaryButtonClassName}
        onClick={handleClose}>
        Cancel
      </button>
      <button
        type='button'
        disabled={deletePasswordMutation.isPending}
        className={modalDangerButtonClassName}
        style={modalDangerButtonStyle}
        onClick={deleteHandler}>
        {deletePasswordMutation.isPending ? "Deleting..." : "Delete"}
      </button>
    </React.Fragment>
  );

  return (
    <div>
      <StandardModal
        onClose={handleClose}
        title='Delete Password'
        content='Are you sure you want to delete this password? The stored URL, username, and notes will be removed from the vault.'
        actions={actions}
      />
    </div>
  );
};

export default DeletePasswordModal;
