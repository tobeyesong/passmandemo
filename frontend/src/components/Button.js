/** @format */

import React, { Fragment } from "react";
import { Link, useLocation } from "react-router-dom";
import { PlusSmIcon as PlusSmIconOutline } from "@heroicons/react/outline";
import { Popover, Transition } from "@headlessui/react";
import {
  FingerPrintIcon,
  PaperClipIcon,
} from "@heroicons/react/outline";
import {
  AppPanel,
  appActionButtonStyle,
  appPrimaryButtonStyle,
  classNames,
} from "./app/appTheme";

const solutions = [
  {
    name: "Add Password",
    link: "/passwords/add",
    icon: FingerPrintIcon,
    description: "Store a site, username, and password in one clean entry.",
  },
  {
    name: "Add Note",
    link: "/add/note",
    icon: PaperClipIcon,
    description: "Keep backup codes or sensitive instructions easy to find.",
  },
];

const Button = () => {
  const location = useLocation();

  return (
    <Popover className='fixed bottom-6 right-6 z-[35]'>
      {({ open }) => (
        <>
          <Popover.Button
            className={classNames(
              "inline-flex h-16 w-16 items-center justify-center rounded-full bg-amber-500 text-white transition duration-200 hover:-translate-y-1 hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2",
              open ? "rotate-45" : ""
            )}
            style={appPrimaryButtonStyle}>
            <PlusSmIconOutline className='h-8 w-8' aria-hidden='true' />
          </Popover.Button>

          <Transition
            as={Fragment}
            enter='transition ease-out duration-200'
            enterFrom='opacity-0 translate-y-2'
            enterTo='opacity-100 translate-y-0'
            leave='transition ease-in duration-150'
            leaveFrom='opacity-100 translate-y-0'
            leaveTo='opacity-0 translate-y-2'>
            <Popover.Panel className='absolute bottom-20 right-0 z-[35] w-80'>
              <AppPanel className='p-3'>
                <div className='px-3 pb-3 pt-2'>
                  <p className='text-[11px] font-semibold uppercase tracking-[0.3em] text-amber-700'>
                    Quick Create
                  </p>
                  <p className='mt-2 text-sm leading-6 text-slate-600'>
                    Start with the feature you need right now.
                  </p>
                </div>
                <div className='grid gap-2'>
                  {solutions.map((item) => (
                    <Link
                      key={item.name}
                      to={item.link}
                      state={{ backgroundLocation: location }}
                      className='flex items-start gap-3 rounded-[1.35rem] bg-slate-50 px-4 py-4 text-left transition duration-200 hover:bg-white'
                      style={appActionButtonStyle}>
                      <span className='flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-[1rem] bg-white text-amber-600'>
                        <item.icon className='h-5 w-5' aria-hidden='true' />
                      </span>
                      <span className='min-w-0'>
                        <span className='block text-sm font-semibold text-slate-950'>
                          {item.name}
                        </span>
                        <span className='mt-1 block text-sm leading-6 text-slate-600'>
                          {item.description}
                        </span>
                      </span>
                    </Link>
                  ))}
                </div>
              </AppPanel>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default Button;
