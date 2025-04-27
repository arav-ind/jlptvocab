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
import { Dispatch, SetStateAction, useCallback, useState } from 'react'
import { CONSTANTS, MAX_VOCABS } from '@/constants/constants'
import { toast } from 'sonner'
import { jlptN4Vocabulary, jlptN5Vocabulary } from '@/constants/data'
import { Button } from './ui/button'

type AppSidebarProps = {
    selectedValues: string[]
    setSelectedValues: Dispatch<SetStateAction<string[]>>
    setLevel: Dispatch<SetStateAction<string>>
}

export function AppSidebar({ selectedValues, setSelectedValues, setLevel }: AppSidebarProps) {
    const [selectedType, setSelectedType] = useState(jlptN5Vocabulary)

    const handleRadioChange = (val: string) => {
        switch (val) {
            case 'n5':
                setLevel('n5')
                return setSelectedType(jlptN5Vocabulary)
            case 'n4':
                setLevel('n4')
                return setSelectedType(jlptN4Vocabulary)
            default:
                return setSelectedType(jlptN5Vocabulary)
        }
    }

    const handleSelectRandom = useCallback(() => {
        const randomVocabs = Array.from(
            new Set(
                Array.from({ length: 30 }, () => selectedType[Math.floor(Math.random() * 10000) % selectedType.length])
            )
        ).slice(0, 10)
        setSelectedValues(randomVocabs)
    }, [selectedType, setSelectedValues])

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
                        <Label htmlFor="n5">{CONSTANTS.N5}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="n4" id="n4" />
                        <Label htmlFor="n4">{CONSTANTS.N4}</Label>
                    </div>
                </RadioGroup>
                <div className='text-center text-lg font-bold text-[#e11d48]'>{CONSTANTS.VOCAB_LIST}</div>
                <Input type="search" placeholder="Search" />
                <Button className='w-auto' onClick={handleSelectRandom}>{CONSTANTS.SELECT_RANDOM}</Button>
            </SidebarHeader>
            <SidebarContent className='no-scrollbar px-2'>
                <SidebarMenu>
                    {selectedType.map((item, indx) => (
                        <SidebarMenuItem key={`${indx}-${item}`} >
                            <SidebarMenuButton asChild
                                onClick={() => {
                                    if (selectedValues.length >= MAX_VOCABS) {
                                        return toast(CONSTANTS.TOAST_SELECTED, {
                                            description: CONSTANTS.TOAST_DESCRIPTION
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
