/** @format */

import React from "react";
import { Form, Field } from "react-final-form";
import { FORM_ERROR } from "final-form";
import { XCircleIcon } from "@heroicons/react/solid";
import { useNavigate } from "react-router-dom";
import { getErrorMessage } from "../../lib/api";
import { useCreateNoteMutation } from "../../hooks/useNotes";
import ModalShell from "./ModalShell";

const required = (value) => (value ? undefined : "Required");

const AddNoteModal = () => {
  const navigate = useNavigate();
  const createNoteMutation = useCreateNoteMutation();
  const handleClose = () => navigate("/notes");

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
    <ModalShell onClose={handleClose}>
      <div className='px-4 py-5 sm:p-6'>
                    <h3 className='p-2 space-y-8 text-lg font-medium leading-6 text-gray-800 bg-yellow-500 border-gray-300 divide-y divide-gray-200 shadow-sm border-3 rounded-t-md sm:space-y-5'>
                      Add a Secure Note
                    </h3>
                    <hr />

                    <Form
                      onSubmit={onSubmit}
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
                                <button
                                  type='button'
                                  onClick={handleClose}
                                  className='px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'>
                                  Cancel
                                </button>
                                <button
                                  type='submit'
                                  disabled={createNoteMutation.isPending}
                                  className='inline-flex justify-center px-4 py-2 ml-3 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
                                  {createNoteMutation.isPending
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
    </ModalShell>
  );
};

export default AddNoteModal;
