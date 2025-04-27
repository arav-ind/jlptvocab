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

const INIT_VALUES = [
    '会う',
    '青い',
    '赤い',
    '明るい',
    '秋',
    '開く',
    '開ける'
]

const STATIC_DATA = `
    秋には明るい日曜日は会う友達と公園に行くことにした。私は青い服を着て、赤い帽子をかぶった。
    友達たちは開けるドアをくぐり、公園の入り口に着いた。明るい日曜日は、開くように天気が晴れていた。公園には秋の花が咲いていた。
    友達たちは、青い花を探して歩いた。私は赤い帽子を取って、友達と一緒に写真を撮影した。開けるドアをくぐり、帰ってきた。
    明るい日曜日は、会う友達との楽しい時間になった。
`

export default function Content() {
    const [selectedValues, setSelectedValues] = useState<string[]>(INIT_VALUES)
    const [level, setLevel] = useState<string>('n5')

    const { getLocalStorage } = useLocalStorage()

    const { data, isFetching, refetch, failureReason } = useQuery({
        queryKey: ['paragraph'],
        queryFn: () => fetchParagraph(selectedValues, getLocalStorage('api-key'), level),
        enabled: false,
    })

    const handleGeneratePara = () => {
        if (selectedValues.length === 0) {
            return alert(CONSTANTS.SELECT_WARNING)
        }
        refetch()
    }

    return (
        <>
            <AppSidebar selectedValues={selectedValues} setSelectedValues={setSelectedValues} setLevel={setLevel} />
            <div id='main-content' className='py-32 lg:px-32 px-10 flex flex-col gap-5 w-full'>
                <h1 className='text-3xl font-bold'>{CONSTANTS.JLPT_VOCABS}</h1>
                <p className='text-sm'>{CONSTANTS.SELECT_UPTO}</p>
                <SelectedVocabs vocabs={selectedValues} setSelectedValues={setSelectedValues} />
                <div className='flex gap-4'>
                    <Button className='w-auto' onClick={handleGeneratePara}>{CONSTANTS.GEN_PARA}</Button>
                    <Button className='w-auto' variant={'secondary'} onClick={() => setSelectedValues([])}>{CONSTANTS.CLEAR_SELECTIONS}</Button>
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
                    <OutputText text={data || STATIC_DATA} isFetching={isFetching} selectedValues={selectedValues} />
                }
            </div>
        </>
    )
}