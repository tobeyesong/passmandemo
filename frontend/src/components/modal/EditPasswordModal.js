/** @format */

import React, { Fragment, useRef, useState } from "react";
import { Form, Field } from "react-final-form";
import { FORM_ERROR } from "final-form";
import { Dialog, Transition } from "@headlessui/react";
import { XCircleIcon, EyeIcon, EyeOffIcon } from "@heroicons/react/solid";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Loader from "../loader/Loader";
import { getErrorMessage } from "../../lib/api";
import {
  usePasswordQuery,
  useUpdatePasswordMutation,
} from "../../hooks/usePasswords";

const required = (value) => (value ? undefined : "Required");

const EditPasswordModal = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [passwordShown, setPasswordShown] = useState(false);
  const cancelButtonRef = useRef(null);
  const { data: password, isLoading, error } = usePasswordQuery(id);
  const updatePasswordMutation = useUpdatePasswordMutation();
  const closeTo = location.state?.backgroundLocation?.pathname || "/passwords";
  const handleClose = () => navigate(closeTo);

  const togglePassword = () => {
    setPasswordShown((current) => !current);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error || !password) {
    return <div className='p-6 text-red-600'>{error?.message || "Password not found"}</div>;
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
    <Fragment>
      <Transition.Root show as={Fragment}>
        <Dialog
          as='div'
          className='fixed inset-0 z-50 overflow-y-auto'
          initialFocus={cancelButtonRef}
          open
          onClose={handleClose}>
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
                      Edit Password
                    </h3>
                    <hr />

                    <Form
                      key={password._id}
                      onSubmit={onSubmit}
                      initialValues={{
                        url: password.url,
                        username: password.username,
                        sitePassword: password.sitePassword,
                        notes: password.notes,
                      }}
                      render={({ handleSubmit, submitError }) => (
                        <form onSubmit={handleSubmit}>
                          <div className='p-4 space-y-8 bg-white border-2 border-gray-100 divide-y divide-gray-200 shadow-lg rounded-b-md sm:space-y-5'>
                            <div>
                              <div className=''>
                                <label
                                  htmlFor='company-website'
                                  className='block text-sm font-medium text-gray-700'>
                                  URL
                                </label>
                                <Field
                                  name='url'
                                  component='input'
                                  placeholder='example.com'
                                  validate={required}>
                                  {({ input, meta, placeholder }) => (
                                    <div>
                                      <div className='flex'>
                                        <span className='block px-4 py-2 pl-1 mb-2 text-gray-500 border border-r-0 border-gray-300 border- rounded-l-md bg-gray-50'>
                                          https://
                                        </span>
                                        <input
                                          {...input}
                                          placeholder={placeholder}
                                          className='block w-full px-4 py-2 pl-1 mb-2 border-2 border-gray-300 shadow rounded-r-md text-l focus:outline-none border-gray focus:border-blue-500'
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

                              <div className='grid grid-cols-6 gap-6 '>
                                <Field
                                  name='username'
                                  component='input'
                                  placeholder='Enter Username'
                                  validate={required}>
                                  {({ input, meta, placeholder }) => (
                                    <div className='col-span-6 sm:col-span-3'>
                                      <div>
                                        <label
                                          htmlFor='first-name'
                                          className='block text-sm font-medium text-gray-700'>
                                          Username
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
                                <Field
                                  name='sitePassword'
                                  component='input'
                                  placeholder='Enter Password'
                                  validate={required}>
                                  {({ input, meta, placeholder }) => (
                                    <div className='col-span-6 sm:col-span-3'>
                                      <div>
                                        <label
                                          htmlFor='first-name'
                                          className='block text-sm font-medium text-gray-700'>
                                          Site Password
                                        </label>
                                        <div className='flex '>
                                          <input
                                            type={
                                              passwordShown
                                                ? "text"
                                                : "password"
                                            }
                                            {...input}
                                            placeholder={placeholder}
                                            className='block w-full px-4 py-2 pl-1 mb-2 border-2 border-t-2 border-b-2 border-l-2 border-gray-300 shadow rounded-l-md text-l focus:outline-none focus:border-blue-500'
                                          />
                                          <span className=''>
                                            <div className='relative grid gap-0 px-2 py-2 bg-gray-100 border-2 border-t-2 border-b-2 border-r-2 border-gray-300 shadow focus:outline-none hover:bg-gray-200 rounded-r-md sm:gap-2 sm:p-x-6 '>
                                              <button
                                                type='button'
                                                onClick={togglePassword}
                                                className='flex-shrink-0 w-6 h-auto text-indigo-600 focus:outline-none'
                                                aria-hidden='true'>
                                                {passwordShown ? (
                                                  <EyeOffIcon />
                                                ) : (
                                                  <EyeIcon />
                                                )}
                                              </button>
                                            </div>
                                          </span>
                                        </div>
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

                                {submitError && (
                                  <div className='p-1 mt-1 mb-2 transition duration-500 ease-in-out rounded-md bg-red-50'>
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
                              </div>

                              <Field
                                name='notes'
                                component='textarea'
                                placeholder='Enter Notes Here'
                                className='box-border block w-full h-32 p-4 px-4 py-2 pl-1 mb-2 border-4 border-gray-300 rounded-md shadow text-l focus:outline-none border-gray focus:border-blue-500'
                              />
                            </div>
                            <div className='pt-5'>
                              <div className='flex justify-end'>
                                <button
                                  type='button'
                                  className='px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
                                  onClick={handleClose}
                                  Cancel
                                </button>
                                <button
                                  type='submit'
                                  disabled={updatePasswordMutation.isPending}
                                  className='inline-flex justify-center px-4 py-2 ml-3 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
                                  {updatePasswordMutation.isPending
                                    ? "Updating..."
                                    : "Update"}
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

export default EditPasswordModal;
