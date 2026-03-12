/** @format */

import React from "react";
import {
  HomeIcon,
  FingerPrintIcon,
  PaperClipIcon,
} from "@heroicons/react/outline";
import { NavLink, useLocation } from "react-router-dom";
import {
  appSidebarStyle,
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

const Sidebar = ({ isCollapsed = false }) => {
  const { pathname } = useLocation();

  const isActive = (href) =>
    href === "/"
      ? pathname === "/" || pathname === "/dashboard"
      : pathname.startsWith(href);

  return (
    <aside
      className={classNames(
        "relative hidden h-screen flex-shrink-0 transition-all duration-300 ease-in-out md:flex",
        isCollapsed ? "w-24" : "w-72"
      )}
      style={appSidebarStyle}>
      <div className='flex min-h-0 flex-1 flex-col overflow-hidden'>
        <div
          className={classNames(
            "border-b border-white/10 pb-6 pt-7",
            isCollapsed ? "px-3" : "px-5"
          )}>
          <div
            className={classNames(
              "group flex items-center overflow-hidden rounded-[1.75rem] bg-white/5 p-3 ring-1 ring-white/10",
              isCollapsed ? "justify-center" : "gap-3"
            )}>
            <div className='flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-[1.2rem] bg-white text-slate-950 shadow-[0_12px_30px_rgba(15,23,42,0.18)]'>
              <img
                className={classNames(
                  "h-8 w-auto transform-gpu transition-transform duration-700 ease-in-out",
                  isCollapsed ? "rotate-180" : "rotate-[360deg]"
                )}
                src='https://media.publit.io/file/noun_vault_3097826-2.svg'
                alt='PassMan'
              />
            </div>
            <div
              aria-hidden={isCollapsed}
              className={classNames(
                "min-w-0 overflow-hidden transition-all duration-300 ease-out",
                isCollapsed
                  ? "max-w-0 translate-x-2 opacity-0"
                  : "max-w-[11rem] translate-x-0 opacity-100 delay-75"
              )}>
              <p className='text-[11px] font-semibold uppercase tracking-[0.3em] text-amber-200'>
                Secure Vault
              </p>
              <p className='mt-1 truncate text-lg font-semibold text-white'>
                PassMan
              </p>
            </div>
          </div>
        </div>

        <div className='flex min-h-0 flex-1 flex-col overflow-y-auto px-3 py-5'>
          <nav className='flex-1 space-y-2'>
            {navigation.map((item) => {
              const active = isActive(item.href);

              return (
                <NavLink
                  key={item.name}
                  to={item.href}
                  title={isCollapsed ? item.name : undefined}
                  className={classNames(
                    "group relative flex items-center rounded-[1.35rem] px-3 py-3 text-sm font-medium transition duration-200",
                    isCollapsed ? "justify-center" : "gap-3",
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
                  {!isCollapsed ? (
                    <div className='min-w-0'>
                      <span className='block truncate'>{item.name}</span>
                    </div>
                  ) : (
                    <span className='sr-only'>{item.name}</span>
                  )}
                </NavLink>
              );
            })}
          </nav>

          {!isCollapsed ? (
            <div className='rounded-[1.5rem] bg-white/5 p-4 text-sm text-slate-300 ring-1 ring-white/10'>
              <p className='text-[11px] font-semibold uppercase tracking-[0.26em] text-amber-200'>
                Vault Tip
              </p>
              <p className='mt-3 leading-6 text-slate-300/90'>
                Use passwords for logins and notes for backup codes,
                instructions, or anything you need to revisit quickly.
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
