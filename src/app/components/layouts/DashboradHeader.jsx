"use client";

import React from 'react'

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb"
  import { Separator } from "@/components/ui/separator"
  import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
  } from "@/components/ui/sidebar"

// icons
import { IoLogOutOutline, IoNotificationsOutline } from 'react-icons/io5';

// redux
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import { setUi } from '@/app/globalRedux/features/ui/uiSlice';
import { useLogoutUserMutation } from '@/app/globalRedux/features/api/apiSlice';
import { useRouter } from 'next/navigation';

export default function DashboradHeader({currentPage}) {
  // router
  const router = useRouter();

  // redux
  const dispatch = useDispatch();
  const dropProfileMenu = useSelector((state) => state.ui.dropProfileMenu);


  // logout
  const [logoutUser, { isLoading }] = useLogoutUserMutation(); // ✅ Correct usage

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
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 
        justify-between">
        <div className='flex items-center' >
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
        <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
            <BreadcrumbLink href="/adminDashboard">
                Admin Dashboard
            </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
            <BreadcrumbPage>{currentPage}</BreadcrumbPage>
            </BreadcrumbItem>
        </BreadcrumbList>
        </Breadcrumb></div>
        
        <div className='flex gap-5 items-center' >
          <div className='px-1 py-1 border rounded-xl' >
          <IoNotificationsOutline className='text-xl text-gray-500 cursor-pointer' /></div>

          <Image width={500} height={500}  alt='profile'
                      src="/userPic.png" 
                      className='w-8 cursor-pointer'
                      onClick={()=> {dispatch(setUi({key: "dropProfileMenu", value: !dropProfileMenu}))}} />
            {/* drop menu */}
            {dropProfileMenu && 
            <div className='absolute top-14 right-3 h-max w-28 bg-white
                  flex flex-col border shadow-lg shadow-gray-400 rounded-xl' >
              <h1 className='text-black text-center py-2' >Admin</h1>
              <hr />

              <button className='flex gap-2 px-3 py-2 cursor-pointer bg-gray-100 hover:bg-gray-200'
                  onClick={()=> {handleLogout()}} >
                <IoLogOutOutline className='text-xl text-gray-800' />
                <h1 className='text-gray-800 text-sm' >Log Out</h1>
              </button>

            </div> }
        </div>
        
  </header>
  )
}
