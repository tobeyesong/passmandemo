/** @format */

import React, { Fragment, useRef, useState } from "react";
import { Form, Field } from "react-final-form";
import { FORM_ERROR } from "final-form";
import { Dialog, Transition } from "@headlessui/react";
import { XCircleIcon } from "@heroicons/react/solid";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import Loader from "../loader/Loader";
import { getErrorMessage } from "../../lib/api";
import { useNoteQuery, useUpdateNoteMutation } from "../../hooks/useNotes";

const required = (value) => (value ? undefined : "Required");

const EditNoteModal = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const cancelButtonRef = useRef(null);
  const { data: note, isLoading, error } = useNoteQuery(id);
  const updateNoteMutation = useUpdateNoteMutation();

  if (!open) {
    return <Navigate to='/' />;
  }

  if (isLoading) {
    return <Loader />;
  }

  if (error || !note) {
    return <div className='p-6 text-red-600'>{error?.message || "Note not found"}</div>;
  }

  const onSubmit = async (values) => {
    try {
      await updateNoteMutation.mutateAsync({ id, values });
      navigate("/notes");
      return undefined;
    } catch (mutationError) {
      return { [FORM_ERROR]: getErrorMessage(mutationError) };
    }
  };

  return (
    <Fragment>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as='div'
          static
          className='fixed inset-0 z-10 overflow-y-auto'
          initialFocus={cancelButtonRef}
          open={open}
          onClose={setOpen}>
          <div className='flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0'>
            <div className='flex-auto'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0'
                enterTo='opacity-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'>
                <Dialog.Overlay className='fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75 ' />
              </Transition.Child>

              <span
                className='hidden sm:inline-block sm:align-middle sm:h-screen'
                aria-hidden='true'>
                &#8203;
              </span>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                enterTo='opacity-100 translate-y-0 sm:scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 translate-y-0 sm:scale-100'
                leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'>
                <div className='inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-gray-100 rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6 lg:max-w-5xl'>
                  <div className='px-4 py-5 sm:p-6'>
                    <h3 className='p-2 space-y-8 text-lg font-medium leading-6 text-gray-800 bg-yellow-500 border-2 border-gray-300 divide-y divide-gray-200 shadow-lg rounded-t-md sm:space-y-5'>
                      Edit Note
                    </h3>
                    <hr />

                    <Form
                      key={note._id}
                      onSubmit={onSubmit}
                      initialValues={{
                        title: note.title,
                        caption: note.caption,
                        image: note.image,
                      }}
                      render={({ handleSubmit, submitError }) => (
                        <form onSubmit={handleSubmit}>
                          <div className='space-y-6'>
                            <div className='px-4 py-5 bg-white shadow lg:rounded-b-md sm:rounded-b-md sm:p-6'>
                              <div className='md:grid md:grid-cols-3 md:gap-6'>
                                <div className='md:col-span-1'>
                                  <Field
                                    name='title'
                                    component='input'
                                    placeholder='Enter Name for This Note'
                                    validate={required}>
                                    {({ input, meta, placeholder }) => (
                                      <div className='col-span-6 sm:col-span-3'>
                                        <div>
                                          <label
                                            htmlFor='first-name'
                                            className='block font-medium text-gray-700 text-md'>
                                            Title
                                          </label>
                                          <input
                                            type='text'
                                            {...input}
                                            placeholder={placeholder}
                                            className='block w-full px-4 py-2 pl-1 mb-2 border-2 border-gray-300 rounded-md shadow text-l focus:outline-none border-gray focus:border-blue-500'
                                          />
                                        </div>
                                        {meta.error && meta.touched && (
                                          <div className='col-span-6 p-1 mt-1 mb-2 transition duration-500 ease-in-out rounded-md sm:col-span-3 bg-red-50'>
                                            <div className='flex'>
                                              <div className='flex-shrink-0'>
                                                <XCircleIcon
                                                  className='w-5 h-5 text-red-400'
                                                  aria-hidden='true'
                                                />
                                              </div>
                                              <div className='ml-3'>
                                                <h3 className='text-sm font-medium text-red-800'>
                                                  {meta.error}
                                                </h3>
                                              </div>
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    )}
                                  </Field>
                                </div>
                                <div className='pb-6 mt-5 md:mt-0 md:col-span-2'>
                                  <Field
                                    name='caption'
                                    component='textarea'
                                    placeholder='Enter a Caption for This Note'
                                    className='block w-full p-2 border border-gray-300 rounded-md shadow-sm h-96 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                                    validate={required}
                                  />
                                </div>
                              </div>
                              {submitError && (
                                <div className='p-1 mb-4 transition duration-500 ease-in-out rounded-md bg-red-50'>
                                  <div className='flex'>
                                    <div className='flex-shrink-0'>
                                      <XCircleIcon
                                        className='w-5 h-5 text-red-400'
                                        aria-hidden='true'
                                      />
                                    </div>
                                    <div className='ml-3'>
                                      <h3 className='text-sm font-medium text-red-800'>
                                        {submitError}
                                      </h3>
                                    </div>
                                  </div>
                                </div>
                              )}
                              <hr />
                              <div className='flex justify-end pt-5'>
                                <Link
                                  to='/notes'
                                  type='button'
                                  className='px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
                                  Cancel
                                </Link>
                                <button
                                  type='submit'
                                  disabled={updateNoteMutation.isPending}
                                  className='inline-flex justify-center px-4 py-2 ml-3 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
                                  {updateNoteMutation.isPending
                                    ? "Saving..."
                                    : "Save"}
                                </button>
                              </div>
                            </div>
                          </div>
                        </form>
                      )}
                    />
                  </div>
                </div>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </Fragment>
  );
};

export default EditNoteModal;
