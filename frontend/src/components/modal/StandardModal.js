/** @format */

import React from "react";
import { ExclamationIcon } from "@heroicons/react/outline";
import ModalShell from "./ModalShell";
import {
  ModalHeader,
  ModalSurface,
  modalActionRowClassName,
  modalInsetStyle,
  modalIconButtonStyle,
} from "./modalTheme";

export default function Modal({
  onClose,
  eyebrow = "Confirm Action",
  title,
  content,
  actions,
}) {
  return (
    <ModalShell onClose={onClose} maxWidth='max-w-2xl'>
      <div className='p-4 sm:p-6'>
        <ModalHeader
          eyebrow={eyebrow}
          title={title}
          description='Use the stronger action only if you are certain. This step cannot be undone.'
          tone='danger'
        />

        <ModalSurface className='space-y-6'>
          <div className='flex items-start gap-4'>
            <div
              className='flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-[1rem] bg-red-50 text-red-600'
              style={{ ...modalInsetStyle, ...modalIconButtonStyle }}>
              <ExclamationIcon className='h-6 w-6' aria-hidden='true' />
            </div>
            <div className='space-y-2'>
              <p className='text-base font-semibold text-slate-900'>
                Permanent change
              </p>
              <p className='text-sm leading-6 text-slate-600'>{content}</p>
            </div>
          </div>

          <div className={modalActionRowClassName}>{actions}</div>
        </ModalSurface>
      </div>
    </ModalShell>
  );
}
