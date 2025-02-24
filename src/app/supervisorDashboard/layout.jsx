
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


// components
import AddInventoryForm from '../components/adminDashboard/stock/AddInventoryForm';
import { AppSidebarSupervisor } from '@/components/app-sidebar supervisor';




export default function dasboardLayout({children}) {


  return (
    (<SidebarProvider>

        <AppSidebarSupervisor />
        <SidebarInset>
            {children}
        </SidebarInset>


        
      </SidebarProvider>)
  )
}
