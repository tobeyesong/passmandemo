/** @format */

import React, { Fragment, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  HomeIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  MenuAlt2Icon,
  XIcon,
  FingerPrintIcon,
  PaperClipIcon,
} from "@heroicons/react/outline";
import { Dialog, Transition } from "@headlessui/react";
import { SearchIcon } from "@heroicons/react/solid";
import Button from "../Button";
import {
  appActionButtonStyle,
  appSearchFieldStyle,
  appSidebarStyle,
  appTopBarStyle,
  classNames,
} from "../app/appTheme";

const navigation = [
  { name: "Dashboard", href: "/", icon: HomeIcon },
  {
    name: "Passwords",
    href: "/passwords",
    icon: FingerPrintIcon,
  },
  { name: "Notes", href: "/notes", icon: PaperClipIcon },
];

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

  const currentLabel = (() => {
    if (pathname.startsWith("/search")) {
      return "Search";
    }

    const match = navigation.find((item) => isActive(item.href));
    return match?.name || "Workspace";
  })();

  return (
    <div className='relative z-20'>
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
            <Dialog.Overlay className='fixed inset-0 bg-slate-950/70 backdrop-blur-[2px]' />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter='transition ease-in-out duration-300 transform'
            enterFrom='-translate-x-full'
            enterTo='translate-x-0'
            leave='transition ease-in-out duration-300 transform'
            leaveFrom='translate-x-0'
            leaveTo='-translate-x-full'>
            <div
              className='relative flex w-full max-w-xs flex-1 flex-col overflow-hidden'
              style={appSidebarStyle}>
              <Transition.Child
                as={Fragment}
                enter='ease-in-out duration-300'
                enterFrom='opacity-0'
                enterTo='opacity-100'
                leave='ease-in-out duration-300'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'>
                <div className='absolute right-4 top-4'>
                  <button
                    type='button'
                    className='flex h-10 w-10 items-center justify-center rounded-[1rem] bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-amber-300'
                    onClick={() => setSidebarOpen(false)}>
                    <span className='sr-only'>Close sidebar</span>
                    <XIcon className='h-5 w-5' aria-hidden='true' />
                  </button>
                </div>
              </Transition.Child>

              <div className='border-b border-white/10 px-5 pb-6 pt-7'>
                <div className='flex items-center gap-3 rounded-[1.75rem] bg-white/5 p-3 ring-1 ring-white/10'>
                  <div className='flex h-12 w-12 items-center justify-center rounded-[1.2rem] bg-amber-400/90 text-slate-950 shadow-[0_12px_30px_rgba(245,158,11,0.25)]'>
                    <img
                      className='h-8 w-auto'
                      src='https://media.publit.io/file/noun_vault_3097826-2.svg'
                      alt='PassMan'
                    />
                  </div>
                  <div className='min-w-0'>
                    <p className='text-[11px] font-semibold uppercase tracking-[0.3em] text-amber-200'>
                      Secure Vault
                    </p>
                    <p className='mt-1 truncate text-lg font-semibold text-white'>
                      PassMan
                    </p>
                  </div>
                </div>
              </div>

              <div className='flex-1 overflow-y-auto px-3 py-5'>
                <nav className='space-y-2'>
                  {navigation.map((item) => {
                    const active = isActive(item.href);

                    return (
                      <NavLink
                        key={item.name}
                        to={item.href}
                        onClick={() => setSidebarOpen(false)}
                        className={classNames(
                          "group relative flex items-center gap-3 rounded-[1.35rem] px-3 py-3 text-sm font-medium transition duration-200",
                          active
                            ? "bg-white/10 text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]"
                            : "text-slate-300 hover:bg-white/5 hover:text-white"
                        )}>
                        {active ? (
                          <span className='absolute left-0 top-1/2 h-8 w-1 -translate-y-1/2 rounded-r-full bg-amber-300' />
                        ) : null}
                        <span
                          className={classNames(
                            "flex h-10 w-10 items-center justify-center rounded-[1rem] transition",
                            active
                              ? "bg-white/10 text-amber-200"
                              : "bg-white/5 text-slate-300 group-hover:bg-white/10 group-hover:text-white"
                          )}>
                          <item.icon className='h-5 w-5' aria-hidden='true' />
                        </span>
                        {item.name}
                      </NavLink>
                    );
                  })}
                </nav>
              </div>
            </div>
          </Transition.Child>
          <div className='w-14 flex-shrink-0' aria-hidden='true' />
        </Dialog>
      </Transition.Root>

      <div className='px-4 pt-4 sm:px-6 lg:px-8'>
        <div
          className='rounded-[1.85rem] bg-white/70 px-3 py-3 ring-1 ring-white/70'
          style={appTopBarStyle}>
          <div className='flex flex-col gap-3 lg:flex-row lg:items-center'>
            <div className='flex items-center gap-3'>
              <button
                type='button'
                className='inline-flex h-11 w-11 items-center justify-center rounded-[1rem] bg-slate-900 text-white shadow-[0_12px_24px_rgba(15,23,42,0.16)] focus:outline-none focus:ring-2 focus:ring-amber-300 md:hidden'
                onClick={() => setSidebarOpen(true)}>
                <span className='sr-only'>Open sidebar</span>
                <MenuAlt2Icon className='h-5 w-5' aria-hidden='true' />
              </button>
              <button
                type='button'
                className='hidden h-11 w-11 items-center justify-center rounded-[1rem] bg-white text-slate-600 focus:outline-none focus:ring-2 focus:ring-amber-300 md:inline-flex'
                style={appActionButtonStyle}
                onClick={onSidebarToggle}>
                <span className='sr-only'>
                  {isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                </span>
                {isSidebarCollapsed ? (
                  <ChevronDoubleRightIcon className='h-5 w-5' aria-hidden='true' />
                ) : (
                  <ChevronDoubleLeftIcon className='h-5 w-5' aria-hidden='true' />
                )}
              </button>
              <div className='hidden min-w-0 sm:block'>
                <p className='text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500'>
                  Workspace
                </p>
                <p className='mt-1 truncate text-sm font-semibold text-slate-950'>
                  {currentLabel}
                </p>
              </div>
            </div>

            <Link to='/search' className='flex-1'>
              <div
                className='flex items-center gap-3 rounded-[1.5rem] bg-slate-100/90 px-4 py-3 text-left transition duration-200 hover:bg-white'
                style={appSearchFieldStyle}>
                <div
                  className='flex h-11 w-11 items-center justify-center rounded-[1rem] bg-white text-amber-600'
                  style={appActionButtonStyle}>
                  <SearchIcon className='h-5 w-5' aria-hidden='true' />
                </div>
                <div className='min-w-0'>
                  <p className='text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500'>
                    Search The Vault
                  </p>
                  <p className='truncate text-sm text-slate-700'>
                    Passwords, notes, domains, and stored context
                  </p>
                </div>
              </div>
            </Link>

            <div
              className='hidden items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-600 lg:inline-flex'
              style={appSearchFieldStyle}>
              <span className='h-2 w-2 rounded-full bg-emerald-400' />
              {currentLabel}
            </div>
          </div>
        </div>
      </div>

      <Button />
    </div>
  );
};

export default SearchBar;
