/** @format */

import React from "react";
import { SearchIcon } from "@heroicons/react/solid";
import { appInsetStyle, classNames } from "../app/appTheme";

const selectClassName =
  "w-full appearance-none rounded-[1.15rem] border-0 bg-slate-100 px-4 py-3 text-sm font-medium text-slate-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-300";

const CollectionControls = ({
  searchValue,
  onSearchChange,
  searchPlaceholder,
  filterValue,
  onFilterChange,
  filterOptions,
  sortValue,
  onSortChange,
  sortOptions,
  summary,
}) => (
  <div className='grid gap-3 border-t border-slate-200/80 pt-6 xl:grid-cols-[minmax(0,1.4fr)_minmax(12rem,0.8fr)_minmax(12rem,0.8fr)_auto] xl:items-center'>
    <div className='relative'>
      <SearchIcon className='pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400' />
      <input
        type='search'
        value={searchValue}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder={searchPlaceholder}
        className='w-full rounded-[1.15rem] border-0 bg-slate-100 py-3 pl-11 pr-4 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-300'
        style={appInsetStyle}
      />
    </div>
    <select
      value={filterValue}
      onChange={(event) => onFilterChange(event.target.value)}
      className={selectClassName}
      style={appInsetStyle}
      aria-label='Filter results'>
      {filterOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    <select
      value={sortValue}
      onChange={(event) => onSortChange(event.target.value)}
      className={selectClassName}
      style={appInsetStyle}
      aria-label='Sort results'>
      {sortOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    <div
      className={classNames(
        "inline-flex items-center rounded-full bg-slate-100 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600"
      )}
      style={appInsetStyle}>
      {summary}
    </div>
  </div>
);

export default CollectionControls;
