// "use client";

import React from 'react'

import { AppSidebar } from "@/components/app-sidebar"
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

// redux
import { useDispatch, useSelector } from 'react-redux'
import { setUi } from '../globalRedux/features/ui/uiSlice';

// components
import AddInventoryForm from '../components/adminDashboard/stock/AddInventoryForm';




export default function dasboardLayout({children}) {

  // const dispatch = useDispatch();
  // const showProvideForm = useSelector((state)=> state.ui.showProvideForm);
  // console.log(showProvideForm)

  return (
    (<SidebarProvider>

        <AppSidebar />
        <SidebarInset>
            {children}
        </SidebarInset>

        {/* {showProvideForm && 
        <div className='fixed w-full h-dvh flex justify-center items-center z-50' >
            <AddInventoryForm />

            <div className="fixed w-full h-full z-30 bg-black/90"
              onClick={()=> {dispatch(setUi({key: "showProvideForm", value: false}))}} >
            </div>   


        </div> } */}
        
      </SidebarProvider>)
  )
}
