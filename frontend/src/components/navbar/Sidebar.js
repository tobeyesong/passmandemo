/** @format */

import React from "react";
import {
  HomeIcon,
  // MapIcon,
  FingerPrintIcon,
  PaperClipIcon,
} from "@heroicons/react/outline";
import { NavLink, useLocation } from "react-router-dom";

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

const Sidebar = ({ isCollapsed = false }) => {
  const { pathname } = useLocation();

  const isActive = (href) =>
    href === "/"
      ? pathname === "/" || pathname === "/dashboard"
      : pathname.startsWith(href);

  return (
    <aside
      className={classNames(
        "relative hidden h-screen flex-shrink-0 border-r border-gray-200 bg-white transition-all duration-300 ease-in-out md:flex",
        isCollapsed ? "w-20" : "w-64"
      )}>
      <div className='flex min-h-0 flex-1 flex-col overflow-hidden'>
        <div
          className={classNames(
            "flex h-20 flex-shrink-0 items-center border-b border-gray-100",
            isCollapsed ? "justify-center px-2" : "px-4"
          )}>
          <img
            className='h-10 w-auto transition-all hover:animate-spin'
            src='https://media.publit.io/file/noun_vault_3097826-2.svg'
            alt='PassMan'
          />
          {!isCollapsed && (
            <span className='ml-3 text-2xl uppercase text-gray-500'>
              PassMan
            </span>
          )}
        </div>

        <div className='flex min-h-0 flex-1 flex-col overflow-y-auto py-4'>
          <nav className='flex-1 space-y-2 px-2'>
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                title={isCollapsed ? item.name : undefined}
                className={() =>
                  classNames(
                    "group flex items-center rounded-xl py-3 text-sm font-medium transition",
                    isCollapsed ? "justify-center px-2" : "px-3",
                    isActive(item.href)
                      ? "bg-yellow-400 text-gray-700 shadow-sm"
                      : "text-gray-600 hover:bg-yellow-100 hover:text-gray-900"
                  )
                }>
                <item.icon
                  className={classNames(
                    "h-6 w-6 flex-shrink-0",
                    isCollapsed ? "" : "mr-3"
                  )}
                  aria-hidden='true'
                />
                {isCollapsed ? (
                  <span className='sr-only'>{item.name}</span>
                ) : (
                  item.name
                )}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
