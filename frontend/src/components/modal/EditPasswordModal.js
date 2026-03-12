/** @format */

import React from "react";
import { FORM_ERROR } from "final-form";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Loader from "../loader/Loader";
import { getErrorMessage } from "../../lib/api";
import {
  usePasswordQuery,
  useUpdatePasswordMutation,
} from "../../hooks/usePasswords";
import PasswordModalForm from "./PasswordModalForm";
import StandardModal from "./StandardModal";
import {
  modalSecondaryButtonClassName,
} from "./modalTheme";

const EditPasswordModal = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { data: password, isLoading, error } = usePasswordQuery(id);
  const updatePasswordMutation = useUpdatePasswordMutation();
  const closeTo = location.state?.backgroundLocation?.pathname || "/passwords";
  const handleClose = () => navigate(closeTo);

  if (isLoading) {
    return <Loader />;
  }

  if (error || !password) {
    return (
      <StandardModal
        onClose={handleClose}
        eyebrow='Entry Status'
        title='Password unavailable'
        content={error?.message || "This password could not be loaded."}
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
      await updatePasswordMutation.mutateAsync({ id, values });
      navigate(closeTo);
      return undefined;
    } catch (mutationError) {
      return { [FORM_ERROR]: getErrorMessage(mutationError) };
    }
  };

  return (
    <PasswordModalForm
      title='Edit Password'
      description='Update the site details, login, password, or recovery notes for this entry.'
      submitLabel='Update Entry'
      pendingLabel='Updating...'
      initialValues={{
        url: password.url,
        username: password.username,
        sitePassword: password.sitePassword,
        notes: password.notes,
      }}
      isPending={updatePasswordMutation.isPending}
      onSubmit={onSubmit}
      onClose={handleClose}
    />
  );
};

export default EditPasswordModal;
