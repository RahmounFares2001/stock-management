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

const data = {
  versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
  navMain: [
    {
      title: "Dashboard",
      url: "/adminDashboard",
      items: [
        {
          title: "Dashboard",
          url: "/adminDashboard",
        },
      ],
    },
    {
      title: "Stock Management",
      url: "#",
      items: [
        {
          title: "Stock",
          url: "/adminDashboard/stock",
        },
        {
          title: "Add Stock",
          url: "/adminDashboard/addStock",
        },
      ],
    },
    {
      title: "Department",
      url: "#",
      items: [
        {
          title: "Departments",
          url: "/adminDashboard/departments",
        },
        {
          title: "Add Department",
          url: "/adminDashboard/addDepartment",
        },
        {
          title: "Reports",
          url: "/adminDashboard/reports",
        },
      ],
    },
    {
      title: "Account",
      url: "#",
      items: [
        {
          title: "Security",
          url: "/adminDashboard/security",
        },
        {
          title: "Logout",
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
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((subItem) => {
                  const isActive = pathname === subItem.url; // Check if current page is active
                  return (
                    <SidebarMenuItem key={subItem.title}>
                      <SidebarMenuButton asChild isActive={isActive}>
                        <a href={subItem.url}>{subItem.title}</a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
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
