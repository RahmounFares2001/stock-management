"use client";


import React from 'react'

// components
import { DepartmentReportsTable } from '../components/department/DepartmentReportsTable'

// icons
import { IoLogOutOutline } from "react-icons/io5";
import AddReportForm from '../components/department/AddReportForm';
import { useDispatch, useSelector } from 'react-redux';
import { setUi } from '../globalRedux/features/ui/uiSlice';
import { useLogoutUserMutation } from '../globalRedux/features/api/apiSlice';
import { useRouter } from 'next/navigation';


export default function page() {

    // redux
    const dispatch = useDispatch();

    const showReportForm = useSelector((state)=> state.ui.showReportForm);

    // router
    const router = useRouter();
    
    // logout
    const [logoutUser, { isLoading }] = useLogoutUserMutation(); 

    const handleLogout = async () => {
      try {
        await logoutUser().unwrap(); 
        router.push("/")
      } catch (error) {
        console.error("Logout failed:", error);
        alert("Logout failed. Please try again.");
      }
    };
  return (
    <div className='flex justify-center bg-gray-100 h-dvh
            py-20' >
        
        {/* logout */}
        <div className='fixed top-4 right-4 p-3 border border-black shadow-md shadow-gray-400 rounded-full
                flex gap-3 justify-center items-center bg-black text-gray-200 cursor-pointer
                font-bold hover:bg-gray-200 hover:text-gray-900 hover:border-gray-200'
              onClick={()=> {handleLogout()}} >
            <IoLogOutOutline className='text-xl' />
            Logout
        </div>

        {/* table */}
        <div className='bg-white h-max px-10 py-10 rounded-xl
                shadow-md shadow-gray-400 w-4/5 flex flex-col gap-10' >
            <DepartmentReportsTable />
        </div>


        {showReportForm && 
        <div className='fixed top-0 left-0 w-full h-dvh flex justify-center items-center' >
          <AddReportForm />

          <div className='z-30 bg-black/90 fixed w-full h-dvh'
              onClick={() => 
                dispatch(setUi({key: "showReportForm", value: false}))
              }  
          ></div>
        </div> }
    </div>
  )
}
