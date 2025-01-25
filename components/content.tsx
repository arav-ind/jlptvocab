'use client'

import { useEffect, useState } from 'react'
import { AppSidebar } from './app-sidebar'
import OutputText from './output-text'
import SelectedVocabs from './selected-vocabs'
import { Button } from './ui/button'
import { useQuery } from '@tanstack/react-query'
import { fetchParagraph } from '@/api/fetch-paragraph'

export default function Content() {
    const [selectedValues, setSelectedValues] = useState<string[]>([])
    const [buttonText, setButtonText] = useState('Generate using Random')

    const { data, refetch } = useQuery({
        queryKey: ['paragraph'],
        queryFn: () => fetchParagraph(selectedValues),
        enabled: false,
        staleTime: 1000 * 60 * 10,
    })

    useEffect(() => {
        if (selectedValues.length === 0) {
            setButtonText('Generate using Random')
            return
        }
        if (buttonText === 'Generate using Random' && selectedValues.length > 0) {
            setButtonText('Generate using Above')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedValues])

    const handleClick = () => {
        refetch()
    }

    return (
        <>
            <AppSidebar selectedValues={selectedValues} setSelectedValues={setSelectedValues} />
            <div id='main-content' className='py-32 lg:px-32 px-10 flex flex-col gap-5'>
                <h1 className='text-3xl'>JLPT Vocabs!</h1>
                <p className='text-sm'>Select upto 10 words to generate a paragraph.</p>
                <SelectedVocabs vocabs={selectedValues} setSelectedValues={setSelectedValues} />
                <div className='flex gap-4'>
                    <Button className='w-auto' onClick={handleClick}>{buttonText}</Button>
                </div>
                <OutputText text={data} />
            </div>
        </>
    )
}