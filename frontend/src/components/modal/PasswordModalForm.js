/** @format */

import React, { useEffect, useState } from "react";
import { Field, Form } from "react-final-form";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/solid";
import { OnChange } from "../forms/OnChange";
import PasswordMeter from "../misc/PasswordMeter";
import ModalShell from "./ModalShell";
import {
  ModalErrorNotice,
  ModalField,
  ModalHeader,
  ModalSection,
  ModalSurface,
  modalActionRowClassName,
  modalIconButtonStyle,
  modalInsetStyle,
  modalPrimaryButtonClassName,
  modalPrimaryButtonStyle,
  modalSecondaryButtonClassName,
} from "./modalTheme";

const required = (value) => (value ? undefined : "Required");

const PasswordModalForm = ({
  title,
  description,
  submitLabel,
  pendingLabel,
  initialValues,
  isPending,
  onSubmit,
  onClose,
}) => {
  const [passwordShown, setPasswordShown] = useState(false);
  const [target, setTarget] = useState(initialValues?.sitePassword || "");

  useEffect(() => {
    setTarget(initialValues?.sitePassword || "");
  }, [initialValues?.sitePassword]);

  return (
    <ModalShell onClose={onClose}>
      <div className='p-4 sm:p-6'>
        <ModalHeader
          eyebrow='Vault Entry'
          title={title}
          description={description}
        />

        <ModalSurface>
          <Form
            onSubmit={onSubmit}
            initialValues={initialValues}
            render={({ handleSubmit, submitError }) => (
              <form onSubmit={handleSubmit} className='space-y-8'>
                <ModalSection
                  eyebrow='Primary Fields'
                  title='Core access details'
                  description='Start with the site and login details you will need most often.'>
                  <div className='grid gap-5 sm:grid-cols-2'>
                    <Field
                      name='url'
                      component='input'
                      placeholder='example.com'
                      validate={required}>
                      {({ input, meta, placeholder }) => (
                        <ModalField
                          className='sm:col-span-2'
                          label='Website'
                          htmlFor='password-url'
                          hint='Use the main domain when this login covers multiple pages.'
                          error={meta.touched ? meta.error : undefined}>
                          <div
                            className='flex rounded-[1.25rem] bg-slate-100 transition focus-within:bg-white focus-within:ring-2 focus-within:ring-amber-300'
                            style={modalInsetStyle}>
                            <span className='flex items-center pl-4 pr-3 text-sm font-medium text-slate-500'>
                              https://
                            </span>
                            <input
                              {...input}
                              id='password-url'
                              placeholder={placeholder}
                              className='w-full rounded-r-[1.25rem] border-0 bg-transparent py-3 pr-4 text-[15px] leading-6 text-slate-900 placeholder-slate-400 focus:outline-none'
                            />
                          </div>
                        </ModalField>
                      )}
                    </Field>

                    <Field
                      name='username'
                      component='input'
                      placeholder='Enter username'
                      validate={required}>
                      {({ input, meta, placeholder }) => (
                        <ModalField
                          label='Username'
                          htmlFor='password-username'
                          error={meta.touched ? meta.error : undefined}>
                          <input
                            {...input}
                            id='password-username'
                            type='text'
                            placeholder={placeholder}
                            className='block w-full rounded-[1.25rem] border-0 bg-slate-100 px-4 py-3 text-[15px] leading-6 text-slate-900 placeholder-slate-400 transition focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-300'
                            style={modalInsetStyle}
                          />
                        </ModalField>
                      )}
                    </Field>

                    <Field
                      name='sitePassword'
                      component='input'
                      placeholder='Enter password'
                      validate={required}>
                      {({ input, meta, placeholder }) => (
                        <ModalField
                          label='Password'
                          htmlFor='password-value'
                          error={meta.touched ? meta.error : undefined}>
                          <div
                            className='flex rounded-[1.25rem] bg-slate-100 transition focus-within:bg-white focus-within:ring-2 focus-within:ring-amber-300'
                            style={modalInsetStyle}>
                            <input
                              {...input}
                              id='password-value'
                              type={passwordShown ? "text" : "password"}
                              placeholder={placeholder}
                              className='w-full rounded-l-[1.25rem] border-0 bg-transparent px-4 py-3 text-[15px] leading-6 text-slate-900 placeholder-slate-400 focus:outline-none'
                            />
                            <button
                              type='button'
                              onClick={() =>
                                setPasswordShown((current) => !current)
                              }
                              aria-label={
                                passwordShown ? "Hide password" : "Show password"
                              }
                              className='m-1.5 inline-flex h-10 w-10 items-center justify-center rounded-[1rem] bg-white text-slate-600 transition hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-300'
                              style={modalIconButtonStyle}>
                              {passwordShown ? (
                                <EyeOffIcon className='h-5 w-5' />
                              ) : (
                                <EyeIcon className='h-5 w-5' />
                              )}
                            </button>
                          </div>
                          {target ? <PasswordMeter target={target} /> : null}
                        </ModalField>
                      )}
                    </Field>
                    <OnChange
                      name='sitePassword'
                      onChange={(value) => setTarget(value || "")}
                    />
                  </div>
                </ModalSection>

                <ModalSection
                  eyebrow='Supporting Detail'
                  title='Notes and recovery info'
                  description='Keep backup codes, reminders, or edge-case details here so they are easy to find later.'>
                  <Field
                    name='notes'
                    component='textarea'
                    placeholder='Recovery codes, usage notes, or context for future you'>
                    {({ input, placeholder }) => (
                      <ModalField
                        label='Notes'
                        htmlFor='password-notes'
                        hint='Optional, but useful when this credential has edge cases worth remembering.'>
                        <textarea
                          {...input}
                          id='password-notes'
                          placeholder={placeholder}
                          rows={6}
                          className='block w-full min-h-[11rem] resize-y rounded-[1.25rem] border-0 bg-slate-100 px-4 py-3 text-[15px] leading-6 text-slate-900 placeholder-slate-400 transition focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-300'
                          style={modalInsetStyle}
                        />
                      </ModalField>
                    )}
                  </Field>
                </ModalSection>

                <ModalErrorNotice message={submitError} />

                <div className={modalActionRowClassName}>
                  <button
                    type='button'
                    onClick={onClose}
                    className={modalSecondaryButtonClassName}>
                    Cancel
                  </button>
                  <button
                    type='submit'
                    disabled={isPending}
                    className={modalPrimaryButtonClassName}
                    style={modalPrimaryButtonStyle}>
                    {isPending ? pendingLabel : submitLabel}
                  </button>
                </div>
              </form>
            )}
          />
        </ModalSurface>
      </div>
    </ModalShell>
  );
};

export default PasswordModalForm;
