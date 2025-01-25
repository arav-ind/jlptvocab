import AppSettings from '@/components/app-settings'
import Content from '@/components/content'
import { SidebarProvider } from '@/components/ui/sidebar'

export default function Home() {
  return (
    <>
      <SidebarProvider>
        <AppSettings />
        <Content />
      </SidebarProvider>
    </>
  )
}
