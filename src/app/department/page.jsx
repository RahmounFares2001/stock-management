import React from 'react'

// components
import { DepartmentReportsTable } from '../components/department/DepartmentReportsTable'

// icons
import { IoLogOutOutline } from "react-icons/io5";


export default function page() {
  return (
    <div className='flex justify-center bg-gray-100 h-dvh
            py-20' >
        
        {/* logout */}
        <div className='fixed top-4 right-4 p-3 border border-black shadow-md shadow-gray-400 rounded-full
                flex gap-3 justify-center items-center bg-black text-gray-200 cursor-pointer
                font-bold hover:bg-gray-200 hover:text-gray-900 hover:border-gray-200' >
            <IoLogOutOutline className='text-xl' />
            Logout
        </div>

        {/* table */}
        <div className='bg-white h-max px-10 py-10 rounded-xl
                shadow-md shadow-gray-400 w-4/5 flex flex-col gap-10' >
            <DepartmentReportsTable />
        </div>
    </div>
  )
}
