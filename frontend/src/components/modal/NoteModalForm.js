/** @format */

import React from "react";
import { Field, Form } from "react-final-form";
import ModalShell from "./ModalShell";
import {
  ModalErrorNotice,
  ModalField,
  ModalHeader,
  ModalSection,
  ModalSurface,
  modalActionRowClassName,
  modalInsetStyle,
  modalPrimaryButtonClassName,
  modalPrimaryButtonStyle,
  modalSecondaryButtonClassName,
} from "./modalTheme";

const required = (value) => (value ? undefined : "Required");

const NoteModalForm = ({
  title,
  description,
  submitLabel,
  pendingLabel,
  initialValues,
  isPending,
  onSubmit,
  onClose,
}) => {
  return (
    <ModalShell onClose={onClose} maxWidth='max-w-4xl'>
      <div className='p-4 sm:p-6'>
        <ModalHeader
          eyebrow='Secure Note'
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
                  eyebrow='Context'
                  title='Name it so you can find it fast'
                  description='Use a clear title, then keep the full note readable without crowding the writing area.'>
                  <div className='grid gap-5'>
                    <Field
                      name='title'
                      component='input'
                      placeholder='Payroll backup codes'
                      validate={required}>
                      {({ input, meta, placeholder }) => (
                        <ModalField
                          label='Title'
                          htmlFor='note-title'
                          hint='A short, specific name is easier to find later.'
                          error={meta.touched ? meta.error : undefined}>
                          <input
                            {...input}
                            id='note-title'
                            type='text'
                            placeholder={placeholder}
                            className='block w-full rounded-[1.25rem] border-0 bg-slate-100 px-4 py-3 text-[15px] leading-6 text-slate-900 placeholder-slate-400 transition focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-300'
                            style={modalInsetStyle}
                          />
                        </ModalField>
                      )}
                    </Field>

                    <Field
                      name='caption'
                      component='textarea'
                      placeholder='Write the note here'
                      validate={required}>
                      {({ input, meta, placeholder }) => (
                        <ModalField
                          label='Body'
                          htmlFor='note-caption'
                          hint='Use complete sentences if someone else may need to read this later.'
                          error={meta.touched ? meta.error : undefined}>
                          <textarea
                            {...input}
                            id='note-caption'
                            placeholder={placeholder}
                            rows={10}
                            className='block w-full min-h-[18rem] resize-y rounded-[1.25rem] border-0 bg-slate-100 px-4 py-3 text-[15px] leading-6 text-slate-900 placeholder-slate-400 transition focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-300'
                            style={modalInsetStyle}
                          />
                        </ModalField>
                      )}
                    </Field>
                  </div>
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

export default NoteModalForm;
