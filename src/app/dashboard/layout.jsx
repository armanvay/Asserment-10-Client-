import DashboardSidebar from '@/components/Dashboard/DashboardSidebar';
import React from 'react';

const DashboardLayout = ({children}) => {
    return (
        <div className='flex  w-full  '>
            {/* sidebar  */}
            <DashboardSidebar/>
            {children}
        </div>
    );
};

export default DashboardLayout;