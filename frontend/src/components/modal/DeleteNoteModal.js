/** @format */

import React, { useRef, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import StandardModal from "./StandardModal";
import { useDeleteNoteMutation } from "../../hooks/useNotes";

const DeleteNoteModal = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const cancelButtonRef = useRef(null);
  const deleteNoteMutation = useDeleteNoteMutation();

  if (!open) {
    return <Navigate to='/' />;
  }

  const deleteHandler = async () => {
    await deleteNoteMutation.mutateAsync(id);
    navigate("/");
  };

  const actions = (
    <React.Fragment>
      <button
        type='button'
        disabled={deleteNoteMutation.isPending}
        className='inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm'
        onClick={deleteHandler}>
        {deleteNoteMutation.isPending ? "Deleting..." : "Delete"}
      </button>
      <Link
        to='/notes'
        type='button'
        className='inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm'
        onClick={() => setOpen(false)}
        ref={cancelButtonRef}>
        Cancel
      </Link>
    </React.Fragment>
  );

  return (
    <div>
      <StandardModal
        title='Delete Note'
        content='Are you sure you want to delete this note?'
        actions={actions}
      />
    </div>
  );
};

export default DeleteNoteModal;
