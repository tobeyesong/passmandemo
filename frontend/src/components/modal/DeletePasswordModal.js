/** @format */
import React from "react";
import { useRef, useState, useEffect } from "react";

//REDUX
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { deletePassword } from "../../actions/passwordActions";
import { PASSWORD_DELETE_RESET } from "../../constants/passwordConstants";

import StandardModal from "./StandardModal";

const DeletePasswordModal = ({ match, history }) => {
  const dispatch = useDispatch();
  const passwordId = match.params.id;
  const [open, setOpen] = useState(true);
  const cancelButtonRef = useRef(null);

  const passwordDelete = useSelector((state) => state.passwordDelete);
  const {
    // loading: loadingDelete,
    // error: errorDelete,
    success: successDelete,
  } = passwordDelete;
  const passwordDetails = useSelector((state) => state.passwordDetails);
  const { password } = passwordDetails;

  useEffect(() => {
    if (successDelete) {
      dispatch({ type: PASSWORD_DELETE_RESET });
      history.push("/");
    }
  }, [dispatch, history, passwordId, password, successDelete]);

  if (!open) {
    return <Redirect to='/' />;
  }

  const deleteHandler = (id) => {
    dispatch(deletePassword(id));
  };

  const actions = (
    <React.Fragment>
      <button
        type='button'
        className='inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm'
        onClick={() => deleteHandler(passwordId)}>
        Delete
      </button>
      <Link
        to='/'
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
        title='Delete Password'
        content='Are you sure you want to delete this password?'
        actions={actions}
      />
    </div>
  );
};

export default DeletePasswordModal;
