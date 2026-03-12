/** @format */

import React from "react";
import Sidebar from "../navbar/Sidebar";
import SearchBar from "../navbar/SearchBar";

import PasswordContent from "../content/PasswordContent";
import NoteContent from "../content/NoteContent";
import useDesktopSidebarState from "../../hooks/useDesktopSidebarState";
import useCollectionDensity from "../../hooks/useCollectionDensity";
import { AppBackdrop, appPageStyle } from "../app/appTheme";
// import AddressContent from "../content/AddressContent";

const DashboardScreen = () => {
  const [isSidebarCollapsed, setSidebarCollapsed] = useDesktopSidebarState();
  const [density, setDensity] = useCollectionDensity(
    "passman.dashboardDensity",
    "comfortable"
  );

  return (
    <div className='relative flex h-screen overflow-hidden' style={appPageStyle}>
      <AppBackdrop />
      <div className='relative z-10 flex flex-1 overflow-hidden'>
        <Sidebar isCollapsed={isSidebarCollapsed} />
        <div className='flex min-w-0 flex-1 flex-col overflow-hidden'>
          <SearchBar
            isSidebarCollapsed={isSidebarCollapsed}
            onSidebarToggle={() => setSidebarCollapsed((current) => !current)}
            density={density}
            onDensityChange={setDensity}
          />

          <PasswordContent title='Passwords' density={density} />
          <NoteContent title='Notes' density={density} />
          {/* <AddressContent title='Addresses' /> */}
        </div>
      </div>
    </div>
  );
};

export default DashboardScreen;
