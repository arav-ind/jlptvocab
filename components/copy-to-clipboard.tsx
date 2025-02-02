import { ClipboardCheck, ClipboardCopy } from 'lucide-react'
import { useState } from 'react'

export default function CopyToClipboard({ text }: { text: string }) {
    const [copySuccess, setCopySuccess] = useState(false)

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(text)
            setCopySuccess(true)
        } catch (err) {
            setCopySuccess(false)
            console.error('Error copying text: ', err)
        }
    }

    return (
        <>
            {
                copySuccess ?
                    <ClipboardCheck className='h-5 w-5 cursor-pointer self-end text-green-500' />
                    : <ClipboardCopy className='h-5 w-5 cursor-pointer self-end text-[#e11d48]' onClick={handleCopy} />
            }
        </>
    )


}