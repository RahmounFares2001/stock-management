import React from 'react'


// componenets
import DashboradHeader from '@/app/components/layouts/DashboradHeader'
import ChangePasswordForm from '@/app/components/adminDashboard/security/ChangePasswordForm'

export default function page() {
  return (
    <section>
        <DashboradHeader currentPage="Security" />

        {/* form */}
        <div className='bg-gray-100 h-dvh px-10 py-8' >
          <div className='px-5 py-5 flex flex-col gap-5 
                        border rounded-lg shadow-gray-400 shadow-md bg-white' >
              <ChangePasswordForm />
          </div>
        </div>

    </section>
  )
}
