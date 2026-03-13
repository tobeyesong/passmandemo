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
import DensityToggle from "../app/DensityToggle";
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
  density = "comfortable",
  onDensityChange = () => {},
  hero = false,
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

  const topBarStyle = hero
    ? {
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        boxShadow:
          "inset 0 1px 0 rgba(255, 255, 255, 0.14), inset 0 -1px 0 rgba(255, 255, 255, 0.04), 0 18px 44px rgba(15, 23, 42, 0.14)",
      }
    : appTopBarStyle;

  const actionSurfaceStyle = hero
    ? {
        boxShadow:
          "inset 0 1px 0 rgba(255, 255, 255, 0.12), 0 12px 26px rgba(15, 23, 42, 0.16)",
      }
    : appActionButtonStyle;

  const searchSurfaceStyle = hero
    ? {
        boxShadow:
          "inset 0 0 0 1px rgba(255, 255, 255, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.06)",
      }
    : appSearchFieldStyle;

  return (
    <div className='relative'>
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
                <div className='group flex items-center gap-3 rounded-[1.75rem] bg-white/5 p-3 ring-1 ring-white/10'>
                  <div className='flex h-12 w-12 items-center justify-center rounded-[1.2rem] bg-white text-slate-950 shadow-[0_12px_30px_rgba(15,23,42,0.18)]'>
                    <img
                      className='h-8 w-auto transition-transform duration-700 ease-out motion-safe:group-hover:animate-spin'
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

      <div className={hero ? "" : "px-4 pt-4 sm:px-6 lg:px-8"}>
        <div
          className={classNames(
            "rounded-[1.85rem] px-3 py-3",
            hero
              ? "bg-white/10 ring-1 ring-white/[0.12]"
              : "bg-white/70 ring-1 ring-white/70"
          )}
          style={topBarStyle}>
          <div className='flex flex-wrap items-center gap-3 2xl:flex-nowrap'>
            <div className='order-1 flex flex-wrap items-center gap-3'>
              <button
                type='button'
                className={classNames(
                  "inline-flex h-11 w-11 items-center justify-center rounded-[1rem] text-white focus:outline-none focus:ring-2 focus:ring-amber-300 md:hidden",
                  hero ? "bg-white/10 ring-1 ring-white/10" : "bg-slate-900"
                )}
                style={hero ? actionSurfaceStyle : undefined}
                onClick={() => setSidebarOpen(true)}>
                <span className='sr-only'>Open sidebar</span>
                <MenuAlt2Icon className='h-5 w-5' aria-hidden='true' />
              </button>
              <button
                type='button'
                className={classNames(
                  "hidden h-11 w-11 items-center justify-center rounded-[1rem] focus:outline-none focus:ring-2 focus:ring-amber-300 md:inline-flex",
                  hero
                    ? "bg-white/10 text-white ring-1 ring-white/10 hover:bg-white/[0.14]"
                    : "bg-white text-slate-600"
                )}
                style={actionSurfaceStyle}
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
                <p
                  className={classNames(
                  "text-[11px] font-semibold uppercase tracking-[0.24em]",
                    hero ? "text-white/[0.62]" : "text-slate-500"
                  )}>
                  Workspace
                </p>
                <p
                  className={classNames(
                    "mt-1 truncate text-sm font-semibold",
                    hero ? "text-white" : "text-slate-950"
                  )}>
                  {currentLabel}
                </p>
              </div>
            </div>

            <Link
              to='/search'
              className='order-3 min-w-0 basis-full 2xl:order-2 2xl:flex-1'>
              <div
                className={classNames(
                  "flex items-center gap-3 rounded-[1.5rem] px-4 py-3 text-left transition duration-200",
                  hero
                    ? "bg-white/[0.08] text-white hover:bg-white/[0.12]"
                    : "bg-slate-100/90 hover:bg-white"
                )}
                style={searchSurfaceStyle}>
                <div
                  className={classNames(
                    "flex h-11 w-11 items-center justify-center rounded-[1rem]",
                    hero ? "bg-white/10 text-white" : "bg-white text-amber-600"
                  )}
                  style={actionSurfaceStyle}>
                  <SearchIcon className='h-5 w-5' aria-hidden='true' />
                </div>
                <div className='min-w-0'>
                  <p
                    className={classNames(
                      "text-[11px] font-semibold uppercase tracking-[0.24em]",
                      hero ? "text-white/[0.62]" : "text-slate-500"
                    )}>
                    Search The Vault
                  </p>
                  <p
                    className={classNames(
                      "truncate text-sm",
                      hero ? "text-white/[0.84]" : "text-slate-700"
                    )}>
                    Passwords, notes, domains, and stored context
                  </p>
                </div>
              </div>
            </Link>

            {!hero ? (
              <div
                className='order-2 ml-auto hidden items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-600 2xl:order-3 2xl:inline-flex'
                style={appSearchFieldStyle}>
                <span className='h-2 w-2 rounded-full bg-emerald-400' />
                {currentLabel}
              </div>
            ) : null}
            <DensityToggle
              density={density}
              onChange={onDensityChange}
              tone={hero ? "hero" : "default"}
              className='order-2 ml-auto self-start 2xl:order-4 2xl:ml-0 2xl:self-auto'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
