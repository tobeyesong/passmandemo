/** @format */

import React from "react";
import Sidebar from "../navbar/Sidebar";
import SearchBar from "../navbar/SearchBar";
import NoteContent from "../content/NoteContent";
import useDesktopSidebarState from "../../hooks/useDesktopSidebarState";

const DashboardScreen = () => {
  const [isSidebarCollapsed, setSidebarCollapsed] = useDesktopSidebarState();

  return (
    <div className='relative flex flex-1 h-screen overflow-hidden bg-gray-100'>
      <Sidebar isCollapsed={isSidebarCollapsed} />
      <div className='flex flex-col flex-1 w-0 overflow-hidden'>
        <SearchBar
          isSidebarCollapsed={isSidebarCollapsed}
          onSidebarToggle={() => setSidebarCollapsed((current) => !current)}
        />
        <NoteContent title='Notes' />
      </div>
    </div>
  );
};

export default DashboardScreen;
