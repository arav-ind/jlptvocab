import { Clipboard } from 'lucide-react'
import { Button } from './ui/button'
import { useState } from 'react'

export default function CopyToClipboard({ text }: { text: string }) {
    const [copySuccess, setCopySuccess] = useState('')

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(text)
            setCopySuccess('Copied!')
        } catch (err) {
            setCopySuccess('Failed to copy!')
            console.error('Error copying text: ', err)
        }
    }

    return (
        <div className='flex flex-row-reverse align-middle gap-2'>
            <Button variant="outline" size="icon" className='h-5 w-5 flex' onClick={handleCopy}>
                <Clipboard />
            </Button>
            {copySuccess && <span className='font-thin text-xs'>Copied!</span>}
        </div>
    )

}