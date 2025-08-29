"use client"

import * as React from "react"
import {
  AudioWaveform,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  User,
  BadgeQuestionMark,
  MapPin,
} from "lucide-react"

import { NavMain } from "@/components/layout/nav-main"
import { NavTools } from "@/components/layout/nav-projects"
import { NavUser } from "@/components/layout/nav-user"
import { TeamSwitcher } from "@/components/layout/team-switcher"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "lives",
    email: "lives@gmail.com",
    avatar: "/imgs/logo.png",
  },
  teams: [
    {
      name: "Lives Inc",
      logo: GalleryVerticalEnd,
      plan: "Moderators",
    },
    {
      name: "Lives Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
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
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
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
