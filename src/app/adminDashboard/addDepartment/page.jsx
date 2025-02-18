import React from 'react'


// componenets
import DashboradHeader from '@/app/components/layouts/DashboradHeader'
import AddDepartmentForm from '@/app/components/adminDashboard/department/AddDepartmentForm'

export default function page() {
  return (
    <section>
        <DashboradHeader currentPage="Add Department" />

        {/* form */}
        <div className='bg-gray-100 h-dvh px-10 py-8' >
          <div className='px-5 py-5 flex flex-col gap-5 bg-white
                  border rounded-lg shadow-gray-400 shadow-md' >
              <AddDepartmentForm />
          </div>
        </div>

    </section>
  )
}
