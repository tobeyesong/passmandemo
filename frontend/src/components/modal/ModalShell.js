/** @format */

import React, { useEffect } from "react";
import { modalPanelStyle } from "./modalTheme";

const ModalShell = ({
  children,
  onClose,
  maxWidth = "max-w-4xl",
  panelClassName = "",
}) => {
  useEffect(() => {
    const { body } = document;
    const previousOverflow = body.style.overflow;

    body.style.overflow = "hidden";

    return () => {
      body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose?.();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className='fixed inset-0 z-50 overflow-y-auto'>
      <div className='flex min-h-screen items-center justify-center px-4 py-8 text-center sm:px-6 sm:py-10'>
        <button
          type='button'
          aria-label='Close modal'
          className='fixed inset-0 bg-slate-950/70 backdrop-blur-[3px]'
          onClick={onClose}
        />
        <div className='pointer-events-none fixed inset-0 overflow-hidden'>
          <div className='absolute left-[8%] top-16 h-40 w-40 rounded-full bg-amber-300/20 blur-3xl' />
          <div className='absolute bottom-10 right-[8%] h-64 w-64 rounded-full bg-sky-300/10 blur-3xl' />
        </div>
        <div
          role='dialog'
          aria-modal='true'
          className={`relative w-full overflow-hidden rounded-[2rem] text-left ring-1 ring-slate-900/10 ${maxWidth} ${panelClassName}`}
          style={modalPanelStyle}
          onClick={(event) => event.stopPropagation()}>
          <div className='absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-amber-300 via-orange-300 to-sky-300' />
          {children}
        </div>
      </div>
    </div>
  );
};

export default ModalShell;
