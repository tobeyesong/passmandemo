/** @format */

import React, { useEffect, useState } from "react";
import { Transition } from "@headlessui/react";
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

const LABEL_REVEAL_DELAY_MS = 180;

const Sidebar = ({ isCollapsed = false }) => {
  const { pathname } = useLocation();
  const [showExpandedLabels, setShowExpandedLabels] = useState(!isCollapsed);
  const shouldRenderExpandedLabels = !isCollapsed && showExpandedLabels;

  useEffect(() => {
    if (isCollapsed) {
      setShowExpandedLabels(false);
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setShowExpandedLabels(true);
    }, LABEL_REVEAL_DELAY_MS);

    return () => window.clearTimeout(timeoutId);
  }, [isCollapsed]);

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
              className={classNames(
                "min-w-0 overflow-hidden transition-[max-width] duration-300 ease-out",
                isCollapsed ? "max-w-0" : "max-w-[11rem]"
              )}>
              <Transition
                as='div'
                show={shouldRenderExpandedLabels}
                enter='transform-gpu transition duration-220 ease-out'
                enterFrom='translate-x-2 opacity-0'
                enterTo='translate-x-0 opacity-100'
                leave='transition-none duration-0'
                leaveFrom='translate-x-0 opacity-100'
                leaveTo='translate-x-0 opacity-0'>
                <p className='text-[11px] font-semibold uppercase tracking-[0.3em] text-amber-200'>
                  Secure Vault
                </p>
                <p className='mt-1 truncate text-lg font-semibold text-white'>
                  PassMan
                </p>
              </Transition>
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
                      ? "bg-white/10 text-white"
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
                  <div
                    className={classNames(
                      "min-w-0 overflow-hidden transition-[max-width] duration-300 ease-out",
                      isCollapsed ? "max-w-0" : "max-w-[10rem]"
                    )}>
                    <Transition
                      as='div'
                      show={shouldRenderExpandedLabels}
                      enter='transform-gpu transition duration-220 ease-out'
                      enterFrom='translate-x-2 opacity-0'
                      enterTo='translate-x-0 opacity-100'
                      leave='transition-none duration-0'
                      leaveFrom='translate-x-0 opacity-100'
                      leaveTo='translate-x-0 opacity-0'>
                      <span className='block truncate'>{item.name}</span>
                    </Transition>
                  </div>
                  {isCollapsed ? (
                    <span className='sr-only'>{item.name}</span>
                  ) : null}
                </NavLink>
              );
            })}
          </nav>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
