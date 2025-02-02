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
import { Dispatch, SetStateAction, useState } from 'react'
import { jlptN4Vocabulary, jlptN5Vocabulary, MAX_VOCABS } from '@/constants/constants'
import { toast } from 'sonner'

type AppSidebarProps = {
    selectedValues: string[]
    setSelectedValues: Dispatch<SetStateAction<string[]>>
}

export function AppSidebar({ selectedValues, setSelectedValues }: AppSidebarProps) {
    const [selectedType, setSelectedType] = useState(jlptN5Vocabulary)

    const handleRadioChange = (val: string) => {
        switch (val) {
            case 'n5':
                return setSelectedType(jlptN5Vocabulary)
            case 'n4':
                return setSelectedType(jlptN4Vocabulary)
            default:
                return setSelectedType(jlptN5Vocabulary)
        }
    }

    return (
        <Sidebar>
            <SidebarHeader className='py-5 flex flex-col gap-5'>
                <RadioGroup
                    className='flex items-center justify-evenly'
                    defaultValue="n5"
                    onValueChange={handleRadioChange}
                >
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
                    {selectedType.map((item, indx) => (
                        <SidebarMenuItem key={`${indx}-${item}`} >
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
                                    `border-2 border-solid ${selectedValues.includes(item) ? 'opacity-50 cursor-not-allowed' : ''}`
                                }>
                                    {item}
                                </span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarContent>
        </Sidebar >
    )
}
