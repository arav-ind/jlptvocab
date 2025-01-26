// import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"
'use client'
import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar'
import { Input } from './ui/input'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { Dispatch, SetStateAction } from 'react'
import { jlptN5Vocabulary, MAX_VOCABS } from '@/constants/constants'
import { toast } from 'sonner'

type AppSidebarProps = {
    selectedValues: string[]
    setSelectedValues: Dispatch<SetStateAction<string[]>>
}

export function AppSidebar({ selectedValues, setSelectedValues }: AppSidebarProps) {
    return (
        <Sidebar>
            <SidebarHeader className='py-5 flex flex-col gap-5'>
                <RadioGroup className='flex items-center justify-evenly' defaultValue="n5">
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="n5" id="n5" />
                        <Label htmlFor="n5">N5</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="n4" id="n4" />
                        <Label htmlFor="n4">N4</Label>
                    </div>
                </RadioGroup>
                <div className='text-center text-lg font-bold text-[#e11d48]'>Vocab List</div>
                <Input type="search" placeholder="Search" />
            </SidebarHeader>
            <SidebarContent className='no-scrollbar px-2'>
                <SidebarMenu>
                    {jlptN5Vocabulary.map((item) => (
                        <SidebarMenuItem key={item} >
                            <SidebarMenuButton asChild
                                onClick={() => {
                                    if (selectedValues.length >= MAX_VOCABS) {
                                        return toast('10 words selected! Ready to start generating your sentence!', {
                                            description: 'Click \'Generate using Above\''
                                        })
                                    }
                                    if (!selectedValues.includes(item)) {
                                        setSelectedValues((prev) => [...prev, item])
                                    }
                                }}>
                                <span className={
                                    `border-2 border-solid font-semibold ${selectedValues.includes(item) ? 'opacity-50 cursor-not-allowed' : ''}`
                                }>
                                    {item}
                                </span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarContent>
        </Sidebar>
    )
}
