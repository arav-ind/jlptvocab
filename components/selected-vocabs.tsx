import { Dispatch, SetStateAction } from 'react'

type SelectedVocabsProps = {
    vocabs: string[]
    setSelectedValues: Dispatch<SetStateAction<string[]>>
}
export default function SelectedVocabs({ vocabs, setSelectedValues }: SelectedVocabsProps) {
    return (
        <div className='flex gap-4 flex-wrap'>
            {vocabs?.map((vocab) => (
                <span
                    key={vocab}
                    className='border-2 border-solid p-2 rounded-lg cursor-pointer'
                    onClick={() => setSelectedValues(vocabs.filter((v) => v !== vocab))}
                >
                    {vocab}
                </span>
            ))}
        </div>
    )
}