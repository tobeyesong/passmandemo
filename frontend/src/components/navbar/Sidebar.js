/** @format */

import React from "react";
import {
  HomeIcon,
  // MapIcon,
  FingerPrintIcon,
  PaperClipIcon,
} from "@heroicons/react/outline";
import { NavLink } from "react-router-dom";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: HomeIcon },
  {
    name: "Passwords",
    href: "/passwords",
    icon: FingerPrintIcon,
  },
  { name: "Notes", href: "/notes", icon: PaperClipIcon },
  // { name: "Addresses", href: "/addresses", icon: MapIcon },
];

const Sidebar = () => {
  return (
    <div className='flex h-screen overflow-hidden bg-gray-100'>
      {/* Static sidebar for desktop */}
      <div className='hidden md:flex md:flex-shrink-0'>
        <div className='flex flex-col w-64'>
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className='flex flex-col flex-grow pt-5 pb-4 overflow-y-auto bg-white border-r border-gray-200'>
            <div className='flex items-center flex-shrink-0 px-4'>
              <img
                className='w-auto h-10 transition-all hover:animate-spin'
                src='https://media.publit.io/file/noun_vault_3097826-2.svg'
                alt='PassMan'
              />
              <span className='text-2xl text-gray-500 uppercase '>PassMan</span>
            </div>
            <div className='flex flex-col flex-grow mt-5'>
              <nav className='flex-1 px-2 space-y-1 bg-white'>
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className={({ isActive }) =>
                      isActive
                        ? "bg-yellow-400 flex items-center px-2 py-2 text-sm font-medium text-gray-600 rounded-md group hover:bg-yellow-100 hover:text-gray-900"
                        : "flex items-center px-2 py-2 text-sm font-medium text-gray-600 rounded-md group hover:bg-yellow-100 hover:text-gray-900"
                    }>
                    <item.icon
                      className='flex-shrink-0 w-6 h-6 mr-3'
                      aria-hidden='true'
                    />
                    {item.name}
                  </NavLink>
                ))}
              </nav>
              <div className='px-4 py-3 text-xs text-gray-400'>
                <a href='https://logo.dev' title='Logo API' className='hover:text-gray-600'>
                  Logos provided by Logo.dev
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
