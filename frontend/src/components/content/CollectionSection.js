/** @format */

import React from "react";
import { AppPanel, AppSectionHeader } from "../app/appTheme";

const CollectionSection = ({
  eyebrow,
  title,
  description,
  count,
  action,
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
    </AppPanel>
  </section>
);

export default CollectionSection;
