/** @format */

import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import StandardModal from "./StandardModal";
import { useDeletePasswordMutation } from "../../hooks/usePasswords";

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
        disabled={deletePasswordMutation.isPending}
        className='inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm'
        onClick={deleteHandler}>
        {deletePasswordMutation.isPending ? "Deleting..." : "Delete"}
      </button>
      <button
        type='button'
        className='inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm'
        onClick={handleClose}>
        Cancel
      </button>
    </React.Fragment>
  );

  return (
    <div>
      <StandardModal
        onClose={handleClose}
        title='Delete Password'
        content='Are you sure you want to delete this password?'
        actions={actions}
      />
    </div>
  );
};

export default DeletePasswordModal;
