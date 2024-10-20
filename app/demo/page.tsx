
"use client";

import { useState } from 'react';
import Dashboard from '@/components/Dashboard';
import Profiles from '@/components/Profiles';
import TaskManager from '@/components/TaskManager';
import dynamic from 'next/dynamic';
import Sidebar from '@/components/SidebarDemo';

// const HumeChatComponent = dynamic(() => import('@/components/HumeChatComponent'), {
//   ssr: false,
// });

export default function MainLayout() {
  const [activeLink, setActiveLink] = useState('Dashboard');

  const renderContent = () => {
    switch (activeLink) {
      case 'Dashboard':
        return <Dashboard />;
      case 'Profiles':
        return <Profiles />;
      case 'Task Manager':
        return <TaskManager />;
    //   case 'New Case':
    //     return <HumeChatComponent />;
      default:
        return <div>Select a valid option</div>;
    }
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar activeLink={activeLink} setActiveLink={setActiveLink} />
      {/* Main Content Area */}
      <div
        className="flex-1 p-6"
        // style={{
        //   background: 'linear-gradient(to top, rgba(233, 135, 236, 0.3), rgba(150, 135, 236, 0.5), rgba(217, 217, 217, 0.2))',
        // }}
      >
        {renderContent()}
      </div>
    </div>
  );
}
