/** @format */

import React from "react";
import { Fragment, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  HomeIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  MenuAlt2Icon,
  XIcon,
  // MapIcon,
  FingerPrintIcon,
  PaperClipIcon,
} from "@heroicons/react/outline";
import { Dialog, Transition } from "@headlessui/react";
import { SearchIcon } from "@heroicons/react/solid";
import Button from "../Button";

const navigation = [
  { name: "Dashboard", href: "/", icon: HomeIcon },
  {
    name: "Passwords",
    href: "/passwords",
    icon: FingerPrintIcon,
  },
  { name: "Notes", href: "/notes", icon: PaperClipIcon },
  // { name: "Addresses", href: "/addresses", icon: MapIcon },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const SearchBar = ({
  isSidebarCollapsed = false,
  onSidebarToggle = () => {},
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { pathname } = useLocation();

  const isActive = (href) =>
    href === "/"
      ? pathname === "/" || pathname === "/dashboard"
      : pathname.startsWith(href);

  return (
    <div className=''>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as='div'
          className='fixed inset-0 z-40 flex md:hidden'
          onClose={setSidebarOpen}>
          <Transition.Child
            as={Fragment}
            enter='transition-opacity ease-linear duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='transition-opacity ease-linear duration-300'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'>
            <Dialog.Overlay className='fixed inset-0 bg-gray-600 bg-opacity-75' />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter='transition ease-in-out duration-300 transform'
            enterFrom='-translate-x-full'
            enterTo='translate-x-0'
            leave='transition ease-in-out duration-300 transform'
            leaveFrom='translate-x-0'
            leaveTo='-translate-x-full'>
            <div className='relative flex flex-col flex-1 w-full max-w-xs pt-5 pb-4 bg-white'>
              <Transition.Child
                as={Fragment}
                enter='ease-in-out duration-300'
                enterFrom='opacity-0'
                enterTo='opacity-100'
                leave='ease-in-out duration-300'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'>
                <div className='absolute top-0 right-0 pt-2 -mr-12'>
                  <button
                    type='button'
                    className='flex items-center justify-center w-10 h-10 ml-1 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
                    onClick={() => setSidebarOpen(false)}>
                    <span className='sr-only'>Close sidebar</span>
                    <XIcon className='w-6 h-6 text-white' aria-hidden='true' />
                  </button>
                </div>
              </Transition.Child>
              <div className='flex items-center flex-shrink-0 px-4'>
                <img
                  className='w-auto h-10 transition-all hover:animate-spin'
                  src='https://media.publit.io/file/noun_vault_3097826-2.svg'
                  alt='PassMan'
                />
                <span className='text-2xl text-gray-500 uppercase '>
                  PassMan
                </span>
              </div>
              <div className='flex-1 h-0 mt-5 overflow-y-auto'>
                <nav className='px-2 space-y-1'>
                  {navigation.map((item) => (
                    <NavLink
                      key={item.name}
                      to={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={classNames(
                        isActive(item.href)
                          ? "bg-gray-100 text-gray-900"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                        "group flex items-center px-2 py-2 text-base font-medium rounded-md"
                      )}>
                      <item.icon
                        className={classNames(
                          isActive(item.href)
                            ? "text-gray-500"
                            : "text-gray-400 group-hover:text-gray-500",
                          "mr-4 flex-shrink-0 h-6 w-6"
                        )}
                        aria-hidden='true'
                      />
                      {item.name}
                    </NavLink>
                  ))}
                </nav>
              </div>
            </div>
          </Transition.Child>
          <div className='flex-shrink-0 w-14' aria-hidden='true'>
            {/* Dummy element to force sidebar to shrink to fit close icon */}
          </div>
        </Dialog>
      </Transition.Root>
      <div className='relative z-10 flex flex-shrink-0 h-16 bg-white shadow'>
        <button
          type='button'
          className='px-4 text-gray-500 border-r border-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden'
          onClick={() => setSidebarOpen(true)}>
          <span className='sr-only'>Open sidebar</span>
          <MenuAlt2Icon className='w-6 h-6' aria-hidden='true' />
        </button>
        <button
          type='button'
          className='items-center hidden px-4 text-gray-500 border-r border-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:inline-flex'
          onClick={onSidebarToggle}>
          <span className='sr-only'>
            {isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          </span>
          {isSidebarCollapsed ? (
            <ChevronDoubleRightIcon className='w-6 h-6' aria-hidden='true' />
          ) : (
            <ChevronDoubleLeftIcon className='w-6 h-6' aria-hidden='true' />
          )}
        </button>
        <div className='flex justify-between flex-1 px-4'>
          <div className='flex items-center flex-1'>
            <Link to='/search' className='w-full cursor-text'>
              <form className='flex w-full md:ml-0' action='#' method='GET'>
                <label htmlFor='search-field' className='sr-only'>
                  Search
                </label>
                <div className='relative w-full text-gray-400 focus-within:text-gray-600'>
                  <div className='absolute inset-y-0 left-0 flex items-center pointer-events-none'>
                    <SearchIcon className='w-5 h-5' aria-hidden='true' />
                  </div>
                  <input
                    id='search-field'
                    className='block py-2 pl-8 pr-3 text-gray-900 placeholder-gray-500 border-transparent focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm'
                    placeholder='Search'
                    type='search'
                    name='search'
                  />
                </div>
              </form>
            </Link>
          </div>
        </div>
      </div>
      <Button />
    </div>
  );
};

export default SearchBar;
