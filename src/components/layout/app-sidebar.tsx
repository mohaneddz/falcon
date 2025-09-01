"use client"

import Image from "next/image"
import * as React from "react"
import {
  Map,
  User,
  BadgeQuestionMark,
  MapPin,
} from "lucide-react"

import { NavMain } from "@/components/layout/nav-main"
import { NavTools } from "@/components/layout/nav-projects"
import { NavUser } from "@/components/layout/nav-user"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "lives",
    email: "lives@gmail.com",
    avatar: "/imgs/user.jpg",
  },
  navMain: [
    {
      title: "Requests",
      url: "#",
      icon: BadgeQuestionMark,
      isActive: true,
      items: [
        {
          title: "Verifications",
          url: "/dashboard/verifications",
        },
      ],
    },
    {
      title: "Users",
      url: "#",
      icon: User,
      isActive: true,
      items: [
        {
          title: "Registered",
          url: "/dashboard/registered_users",
        },
        {
          title: "Verified",
          url: "/dashboard/verified_users",
        },
      ],
    },
    {
      title: "Locations",
      url: "#",
      icon: MapPin,
      isActive: true,
      items: [
        {
          title: "Markers",
          url: "/dashboard/markers",
        },
        {
          title: "SOS",
          url: "/dashboard/sos",
        },
      ],
    },
  ],
  tools: [
    {
      name: "Map",
      url: "/dashboard/map",
      icon: Map,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { state } = useSidebar();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-4">
          <Image src="/imgs/bird.png" alt="Logo" width={64} height={64} />
          {state === "expanded" && (
            <Image src="/imgs/title.png" alt="Logo" width={128} height={128} className="max-w-[128px]" />
          )}
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavTools tools={data.tools} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
