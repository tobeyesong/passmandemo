/** @format */

import React, { useState } from "react";
import Sidebar from "../navbar/Sidebar";
import SearchBar from "../navbar/SearchBar";

import PasswordContent from "../content/PasswordContent";
import NoteContent from "../content/NoteContent";
// import AddressContent from "../content/AddressContent";

const DashboardScreen = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(true);

  return (
    <div className='relative flex flex-1 h-screen overflow-hidden bg-gray-100'>
      <Sidebar isVisible={isSidebarVisible} />
      <div className='flex flex-col flex-1 w-0 overflow-auto'>
        <SearchBar
          isSidebarVisible={isSidebarVisible}
          onSidebarToggle={() => setSidebarVisible((current) => !current)}
        />

        <PasswordContent title='Passwords' />
        <NoteContent title='Notes' />
        {/* <AddressContent title='Addresses' /> */}
      </div>
    </div>
  );
};

export default DashboardScreen;
