/** @format */

import React from "react";
import { AppPanel, AppSectionHeader } from "../app/appTheme";

const CollectionSection = ({
  eyebrow,
  title,
  description,
  count,
  action,
  footer,
  children,
}) => (
  <section className='px-4 pb-8 sm:px-6 lg:px-8'>
    <AppPanel className='px-6 py-6 sm:px-8 sm:py-8'>
      <AppSectionHeader
        eyebrow={eyebrow}
        title={title}
        description={description}
        count={count}
        action={action}
      />
      <div className='mt-8'>{children}</div>
      {footer ? (
        <div className='mt-8 border-t border-slate-200/80 pt-8'>{footer}</div>
      ) : null}
    </AppPanel>
  </section>
);

export default CollectionSection;
