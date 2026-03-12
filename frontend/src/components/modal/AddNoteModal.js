/** @format */

import React from "react";
import { FORM_ERROR } from "final-form";
import { useLocation, useNavigate } from "react-router-dom";
import { getErrorMessage } from "../../lib/api";
import { useCreateNoteMutation } from "../../hooks/useNotes";
import NoteModalForm from "./NoteModalForm";

const AddNoteModal = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const createNoteMutation = useCreateNoteMutation();
  const closeTo = location.state?.backgroundLocation?.pathname || "/notes";
  const handleClose = () => navigate(closeTo);

  const onSubmit = async (values) => {
    try {
      await createNoteMutation.mutateAsync(values);
      navigate("/dashboard");
      return undefined;
    } catch (error) {
      return { [FORM_ERROR]: getErrorMessage(error) };
    }
  };

  return (
    <NoteModalForm
      title='Add Secure Note'
      description='Store sensitive instructions, backup details, or reference text in a focused writing space.'
      submitLabel='Save Note'
      pendingLabel='Saving...'
      isPending={createNoteMutation.isPending}
      onSubmit={onSubmit}
      onClose={handleClose}
    />
  );
};

export default AddNoteModal;
