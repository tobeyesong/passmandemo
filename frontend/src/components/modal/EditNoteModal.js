/** @format */

import React from "react";
import { FORM_ERROR } from "final-form";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Loader from "../loader/Loader";
import { getErrorMessage } from "../../lib/api";
import { useNoteQuery, useUpdateNoteMutation } from "../../hooks/useNotes";
import NoteModalForm from "./NoteModalForm";
import StandardModal from "./StandardModal";
import { modalSecondaryButtonClassName } from "./modalTheme";

const EditNoteModal = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { data: note, isLoading, error } = useNoteQuery(id);
  const updateNoteMutation = useUpdateNoteMutation();
  const closeTo = location.state?.backgroundLocation?.pathname || "/notes";
  const handleClose = () => navigate(closeTo);

  if (isLoading) {
    return <Loader />;
  }

  if (error || !note) {
    return (
      <StandardModal
        onClose={handleClose}
        eyebrow='Entry Status'
        title='Note unavailable'
        content={error?.message || "This note could not be loaded."}
        actions={
          <button
            type='button'
            onClick={handleClose}
            className={modalSecondaryButtonClassName}>
            Close
          </button>
        }
      />
    );
  }

  const onSubmit = async (values) => {
    try {
      await updateNoteMutation.mutateAsync({ id, values });
      navigate(closeTo);
      return undefined;
    } catch (mutationError) {
      return { [FORM_ERROR]: getErrorMessage(mutationError) };
    }
  };

  return (
    <NoteModalForm
      title='Edit Note'
      description='Revise the title or body while keeping the note easy to scan and read.'
      submitLabel='Update Note'
      pendingLabel='Saving...'
      initialValues={{
        title: note.title,
        caption: note.caption,
        image: note.image,
      }}
      isPending={updateNoteMutation.isPending}
      onSubmit={onSubmit}
      onClose={handleClose}
    />
  );
};

export default EditNoteModal;
