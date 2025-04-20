'use client'

import { CONSTANTS } from '@/constants/constants'
import { Button } from './ui/button'
import { useSidebar } from './ui/sidebar'

export default function SidebarTrigger() {
    const { toggleSidebar } = useSidebar()

    return (
        <Button variant={'secondary'} onClick={() => toggleSidebar()}>{CONSTANTS.VOCAB_LIST}</Button>
    )
}