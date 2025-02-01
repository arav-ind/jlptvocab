import { Clipboard } from 'lucide-react'
import { SkeletonCard } from './skeleton-card'
import { Button } from './ui/button'

export default function OutputText({ text, isFetching }: { text: string | null, isFetching: boolean }) {
    const sanitizedText = text?.replace(/<p.*?>|<\/p>/g, '')
    if (isFetching) {
        return <SkeletonCard />
    } else if (!sanitizedText) {
        return null
    }
    return (
        <div className='relative flex flex-col gap-2'>
            <Button variant="outline" size="icon" className='self-end h-5 w-5'>
                <Clipboard />
            </Button>
            <p className='leading-loose'>{sanitizedText}</p>
        </div>
    )
}