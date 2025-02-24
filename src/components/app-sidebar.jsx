"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";


import { RxDashboard } from "react-icons/rx";
import { AiOutlineHdd } from "react-icons/ai";
import { MdAddShoppingCart } from "react-icons/md";
import { FaRegAddressBook } from "react-icons/fa6";
import { MdPersonAddAlt1 } from "react-icons/md";
import { MdReportGmailerrorred } from "react-icons/md";
import { MdOutlineSecurity } from "react-icons/md";
import { IoLogOutOutline } from "react-icons/io5";




const data = {
  versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
  navMain: [
    {
      id: 1,
      title: "Dashboard",
      url: "/adminDashboard",
      items: [
        {
          id: 1,
          title: "Dashboard",
          icon: <RxDashboard />,
          url: "/adminDashboard",
        },
      ],
    },
    {
      id: 2,
      title: "Stock Management",
      url: "#",
      items: [
        {
          id: 1,
          title: "Stock",
          icon: <AiOutlineHdd />,
          url: "/adminDashboard/stock",
        },
        {
          id: 2,
          title: "Add Stock",
          icon: <MdAddShoppingCart />,
          url: "/adminDashboard/addStock",
        },
      ],
    },
    {
      id: 3,
      title: "Department",
      url: "#",
      items: [
        {
          id: 1,
          title: "Departments",
          icon: <FaRegAddressBook />,
          url: "/adminDashboard/departments",
        },
        {
          id: 2,
          title: "Add Department",
          icon: <MdPersonAddAlt1 />,
          url: "/adminDashboard/addDepartment",
        },
        {
          id: 3,
          title: "Reports",
          icon: <MdReportGmailerrorred />,
          url: "/adminDashboard/reports",
        },
      ],
    },
    {
      id: 4,
      title: "Account",
      url: "#",
      items: [
        {
          id: 1,
          title: "Security",
          icon: <MdOutlineSecurity />,
          url: "/adminDashboard/security",
        },
        {
          id: 2,
          title: "Logout",
          icon: <IoLogOutOutline />,
          url: "#",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }) {
  const pathname = usePathname(); // Get current page URL

  return (
    <Sidebar {...props} >
      <SidebarHeader >
        <div className="w-full h-14 flex pl-3 items-center gap-3 cursor-pointer">
          <Image
            width={400}
            height={400}
            alt="Algerie Telecom"
            src="/algerieTelecomLogo.png"
            className="w-10"
          />
          <h1 className="font-bold text-xl text-blue-900">
            Algeria <span className="text-green-800">Telecom</span>
          </h1>
        </div>
      </SidebarHeader>
      <SidebarContent className="font-bold" >
        {data.navMain.map((item) => (
          <SidebarGroup key={item.id}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((subItem) => {
                  const isActive = pathname === subItem.url; // Check if current page is active
                  return (
                    <a href={subItem.url} key={subItem.id} >
                      <SidebarMenuItem key={subItem.title}
                            className="flex gap-2 items-center" >                        
                        <SidebarMenuButton asChild isActive={isActive}>
                          <div className="flex gap-2 items-center cursor-pointer" >
                            {subItem.icon}
                            {subItem.title}
                          </div>

                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </a>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
