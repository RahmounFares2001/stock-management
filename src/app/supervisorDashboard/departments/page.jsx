"use client";

import React from 'react'

// componenents
import DashboradHeader from '@/app/components/layouts/DashboradHeader'
import { DepartmentsTable } from '@/app/components/adminDashboard/department/DepartmentsTable';


export default function page() {
  return (
    <section>
        <DashboradHeader currentPage="Departments" />

        {/* table */}
        <div className='bg-gray-100 h-dvh px-10 py-8' >
          <div className='px-5 py-5 flex flex-col gap-5 
                    border rounded-lg shadow-gray-400 shadow-md bg-white' >
              <DepartmentsTable />
          </div>
        </div>

    </section>
  )
}
