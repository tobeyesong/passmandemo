/** @format */

import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  TrashIcon,
  PencilIcon,
  ChevronDoubleUpIcon,
} from "@heroicons/react/outline";
import Loader from "../loader/Loader";
import { listPasswords } from "../../actions/passwordActions";

import PasswordState from "../emptyState/passwordState";

//Toastify
import { ToastContainer } from "react-toastify";

const PasswordContent = (props) => {
  const dispatch = useDispatch();
  const passwordList = useSelector((state) => state.passwordList);
  const { loading, error, passwords } = passwordList;

  useEffect(() => {
    dispatch(listPasswords());
  }, [dispatch]);

  return (
    <div>
      <main className='relative flex-1 overflow-y-auto focus:outline-none'>
        <div className='py-6'>
          <div className='px-4 mx-auto max-w-7xl sm:px-6 md:px-8'>
            <div>
              <ToastContainer autoClose={2000} />
              <h1 className='text-2xl font-semibold text-gray-900'>
                {props.title}
              </h1>
              <Fragment>
                {loading ? (
                  <Loader />
                ) : error ? (
                  <h3 className='animate-pulse'>{error}</h3>
                ) : passwords.length === 0 ? (
                  <PasswordState />
                ) : (
                  <Fragment>
                    <ul className='grid grid-cols-1 gap-5 mt-3 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4 group'>
                      {passwords.map((password) => (
                        <div key={password._id}>
                          <div className='border-r-4 rounded-md hover:border-yellow-400'>
                            <li className='flex col-span-1 rounded-md shadow-sm'>
                              <img
                                alt='logo '
                                src={`https://img.logo.dev/${password.url}?token=pk_H82lg8wdSsOq6I1XLEFkyg`}
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src =
                                    "https://media.publit.io/file/MiscPasswordIcon.svg";
                                }}
                                className='flex items-center flex-shrink-0 object-contain text-sm font-medium text-white shadow-sm w-14 rounded-l-md'
                              />

                              <div className='flex flex-row-reverse items-center flex-1 truncate bg-white border-t border-b border-r border-gray-200 rounded-r-md'>
                                <div className='flex-1 px-4 py-2 text-sm truncate'>
                                  <a
                                    href={password.href}
                                    className='font-medium text-gray-900 hover:text-gray-600'>
                                    {password.username}
                                  </a>
                                  <p className='text-gray-500 '>
                                    {password.url}
                                  </p>
                                </div>
                                <div className='absolute flex-shrink-0 m-2 transform scale-0 group-hover:scale-100 '>
                                  <a
                                    href={`https://${password.url}`}
                                    className='inline-flex items-center justify-center w-8 h-8 mr-1 text-gray-400 bg-transparent bg-gray-100 rounded-full hover:text-gray-500 focus:outline-none '>
                                    <ChevronDoubleUpIcon
                                      className='w-5 h-5 text-gray-400 rounded hover:bg-blue-700 hover:text-gray-100'
                                      aria-hidden='true'
                                    />
                                  </a>
                                  <Link
                                    to={`/password/${password._id}/edit`}
                                    type='button'
                                    className='inline-flex items-center justify-center w-8 h-8 mr-1 text-gray-400 bg-transparent bg-gray-100 rounded-full hover:text-gray-500 focus:outline-none '>
                                    <PencilIcon
                                      className='w-5 h-5 text-gray-400 rounded hover:bg-gray-800 hover:text-gray-100'
                                      aria-hidden='true'
                                    />
                                  </Link>
                                  <Link
                                    to={`/password/${password._id}/delete`}
                                    type='button'
                                    className='inline-flex items-center justify-center w-8 h-8 text-gray-400 bg-transparent bg-gray-100 rounded-full hover:text-gray-500 focus:outline-none '>
                                    <TrashIcon
                                      className='w-5 h-5 text-gray-400 rounded hover:bg-red-600 hover:text-gray-100'
                                      aria-hidden='true'
                                    />
                                  </Link>
                                </div>
                              </div>
                            </li>
                          </div>
                        </div>
                      ))}
                    </ul>{" "}
                  </Fragment>
                )}
              </Fragment>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PasswordContent;
