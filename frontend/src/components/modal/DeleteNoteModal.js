/** @format */

import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import StandardModal from "./StandardModal";
import { useDeleteNoteMutation } from "../../hooks/useNotes";
import {
  modalDangerButtonClassName,
  modalDangerButtonStyle,
  modalSecondaryButtonClassName,
} from "./modalTheme";

const DeleteNoteModal = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const deleteNoteMutation = useDeleteNoteMutation();
  const closeTo = location.state?.backgroundLocation?.pathname || "/notes";
  const handleClose = () => navigate(closeTo);

  const deleteHandler = async () => {
    await deleteNoteMutation.mutateAsync(id);
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
        disabled={deleteNoteMutation.isPending}
        className={modalDangerButtonClassName}
        style={modalDangerButtonStyle}
        onClick={deleteHandler}>
        {deleteNoteMutation.isPending ? "Deleting..." : "Delete"}
      </button>
    </React.Fragment>
  );

  return (
    <div>
      <StandardModal
        onClose={handleClose}
        title='Delete Note'
        content='Are you sure you want to delete this note? Its title and body will be permanently removed.'
        actions={actions}
      />
    </div>
  );
};

export default DeleteNoteModal;
