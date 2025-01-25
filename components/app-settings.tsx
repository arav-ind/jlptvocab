import ApiKeyDialog from './apikey-dialog'
import { ModeToggle } from './mode-toggle'
import SidebarTrigger from './sidebar-trigger'

export default function AppSettings() {
    return (
        <div className='absolute right-0 top-0 p-3 flex gap-4'>
            <SidebarTrigger />
            <ApiKeyDialog />
            <ModeToggle />
        </div>
    )
}