"use client";

import React from 'react'

// componenents
import DashboradHeader from '@/app/components/layouts/DashboradHeader'
import { ReportsTable } from '@/app/components/adminDashboard/reports/ReportsTable';


export default function page() {
  return (
    <section>
        <DashboradHeader currentPage="Reports" />

        {/* table */}
        <div className='bg-gray-100 h-dvh px-10 py-8' >
          <div className='px-5 py-5 flex flex-col gap-5 
                      border rounded-lg shadow-gray-400 shadow-md bg-white' >
              <ReportsTable />
          </div>
        </div>

    </section>
  )
}
