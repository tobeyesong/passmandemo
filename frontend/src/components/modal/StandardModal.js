/** @format */

import React from "react";
import { ExclamationIcon } from "@heroicons/react/outline";
import ModalShell from "./ModalShell";

export default function Modal(props) {
  return (
    <ModalShell onClose={props.onClose} maxWidth='max-w-lg' panelClassName='bg-white'>
      <div className='p-6'>
        <div className='sm:flex sm:items-start'>
          <div className='mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10'>
            <ExclamationIcon
              className='h-6 w-6 text-red-600'
              aria-hidden='true'
            />
          </div>
          <div className='mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left'>
            <h3 className='text-lg font-medium leading-6 text-gray-900'>
              {props.title}
            </h3>
            <div className='mt-2'>
              <p className='text-sm text-gray-500'>{props.content}</p>
            </div>
          </div>
        </div>
        <div className='mt-5 sm:mt-4 sm:flex sm:flex-row-reverse'>
          {props.actions}
        </div>
      </div>
    </ModalShell>
  );
}
