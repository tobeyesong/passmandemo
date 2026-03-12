/** @format */

import React from "react";
import { FORM_ERROR } from "final-form";
import { useLocation, useNavigate } from "react-router-dom";
import { getErrorMessage } from "../../lib/api";
import { useCreatePasswordMutation } from "../../hooks/usePasswords";
import PasswordModalForm from "./PasswordModalForm";

const AddPasswordModal = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const createPasswordMutation = useCreatePasswordMutation();
  const closeTo = location.state?.backgroundLocation?.pathname || "/passwords";
  const handleClose = () => navigate(closeTo);

  const onSubmit = async (values) => {
    try {
      await createPasswordMutation.mutateAsync(values);
      navigate("/dashboard");
      return undefined;
    } catch (error) {
      return { [FORM_ERROR]: getErrorMessage(error) };
    }
  };

  return (
    <PasswordModalForm
      title='Add Password'
      description='Capture the site, username, password, and any recovery details in one place.'
      submitLabel='Create Entry'
      pendingLabel='Creating...'
      isPending={createPasswordMutation.isPending}
      onSubmit={onSubmit}
      onClose={handleClose}
    />
  );
};

export default AddPasswordModal;
