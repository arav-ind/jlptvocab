'use client'

import { useState } from 'react'
import { AppSidebar } from './app-sidebar'
import OutputText from './output-text'
import SelectedVocabs from './selected-vocabs'
import { Button } from './ui/button'
import { useQuery } from '@tanstack/react-query'
import { fetchParagraph } from '@/api/fetch-paragraph'
import { useLocalStorage } from '@/hooks/use-localstorage'
import { CONSTANTS } from '@/constants/constants'

export default function Content() {
    const [selectedValues, setSelectedValues] = useState<string[]>([])

    const { getLocalStorage } = useLocalStorage()

    const { data, isFetching, refetch, failureReason } = useQuery({
        queryKey: ['paragraph'],
        queryFn: () => fetchParagraph(selectedValues, getLocalStorage('api-key')),
        enabled: false,
    })

    const handleClick = () => {
        if (selectedValues.length === 0) {
            return alert(CONSTANTS.SELECT_WARNING)
        }
        refetch()
    }

    return (
        <>
            <AppSidebar selectedValues={selectedValues} setSelectedValues={setSelectedValues} />
            <div id='main-content' className='py-32 lg:px-32 px-10 flex flex-col gap-5 w-full'>
                <h1 className='text-3xl font-bold'>{CONSTANTS.JLPT_VOCABS}</h1>
                <p className='text-sm'>{CONSTANTS.SELECT_UPTO}</p>
                <SelectedVocabs vocabs={selectedValues} setSelectedValues={setSelectedValues} />
                <div className='flex gap-4'>
                    <Button className='w-auto' onClick={handleClick}>{CONSTANTS.GEN_PARA}</Button>
                </div>
                {failureReason ?
                    <div>
                        {failureReason.message} Please generate one from
                        <a href='https://console.groq.com/keys' target='_blank' className='text-pink-600'>
                            &nbsp;here!
                        </a>
                        &nbsp;It is completely free!
                    </div>
                    :
                    <OutputText text={data} isFetching={isFetching} />
                }
            </div>
        </>
    )
}