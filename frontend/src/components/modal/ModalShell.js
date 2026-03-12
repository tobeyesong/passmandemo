/** @format */

import React, { useEffect } from "react";

const ModalShell = ({
  children,
  onClose,
  maxWidth = "max-w-5xl",
  panelClassName = "bg-gray-100",
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
      <div className='flex min-h-screen items-end justify-center px-4 py-6 text-center sm:items-center sm:p-6'>
        <button
          type='button'
          aria-label='Close modal'
          className='fixed inset-0 bg-gray-500 bg-opacity-75'
          onClick={onClose}
        />
        <div
          role='dialog'
          aria-modal='true'
          className={`relative w-full transform overflow-hidden rounded-lg text-left shadow-xl ${maxWidth} ${panelClassName}`}
          onClick={(event) => event.stopPropagation()}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default ModalShell;
