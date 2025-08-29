import { AppSidebar } from "@/components/layout/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import {
  SidebarTrigger,
} from "@/components/ui/sidebar"
export default function Page({ children }: React.PropsWithChildren) {
  return (
    <div className="screen max-h-screen max-w-screen overflow-hidden">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset >
          <SidebarTrigger />
          <main className="p-4 overflow-hidden full">
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}
