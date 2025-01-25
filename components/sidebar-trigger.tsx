'use client'

import { Button } from './ui/button'
import { useSidebar } from './ui/sidebar'

export default function SidebarTrigger() {
    const { toggleSidebar } = useSidebar()

    return (
        <Button variant={'secondary'} onClick={() => toggleSidebar()}>Vocab List</Button>

    )
}