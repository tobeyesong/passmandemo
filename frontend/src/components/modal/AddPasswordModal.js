/** @format */

import React, { useState } from "react";
import { Form, Field } from "react-final-form";
import { FORM_ERROR } from "final-form";
import { useNavigate } from "react-router-dom";
import { XCircleIcon, EyeIcon, EyeOffIcon } from "@heroicons/react/solid";
import { OnChange } from "../forms/OnChange";
import PasswordMeter from "../misc/PasswordMeter";
import { getErrorMessage } from "../../lib/api";
import { useCreatePasswordMutation } from "../../hooks/usePasswords";
import ModalShell from "./ModalShell";

const required = (value) => (value ? undefined : "Required");

const AddPasswordModal = () => {
  const navigate = useNavigate();
  const [target, setTarget] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const createPasswordMutation = useCreatePasswordMutation();
  const handleClose = () => navigate("/passwords");

  const togglePassword = () => {
    setPasswordShown((current) => !current);
  };

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
    <ModalShell onClose={handleClose}>
      <div className='px-4 py-5 sm:p-6'>
                    <h3 className='p-2 space-y-8 text-lg font-medium leading-6 text-gray-800 bg-yellow-500 divide-y divide-gray-200 shadow-lg bg-yellow-500border-2 rounded-t-md sm:space-y-5'>
                      Add Password
                    </h3>
                    <hr />

                    <Form
                      onSubmit={onSubmit}
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
                                      <PasswordMeter target={target} />
                                    </div>
                                  )}
                                </Field>
                                <OnChange
                                  name='sitePassword'
                                  onChange={(value) => setTarget(value)}
                                />
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
                                placeholder='Notes'
                                className='box-border block w-full h-32 p-4 px-4 py-2 pl-1 mb-2 border-4 border-gray-300 rounded-md shadow text-l focus:outline-none border-gray focus:border-blue-500'
                              />
                            </div>
                            <div className='pt-5'>
                              <div className='flex justify-end'>
                                <button
                                  type='button'
                                  onClick={handleClose}
                                  className='px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
                                  Cancel
                                </button>

                                <button
                                  type='submit'
                                  disabled={createPasswordMutation.isPending}
                                  className='inline-flex justify-center px-4 py-2 ml-3 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
                                  {createPasswordMutation.isPending
                                    ? "Creating..."
                                    : "Create"}
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

export default AddPasswordModal;
