import { SkeletonCard } from './skeleton-card'
import CopyToClipboard from './copy-to-clipboard'

export default function OutputText({ text, isFetching }: { text: string | null, isFetching: boolean }) {
    const sanitizedText = text?.replace(/<p.*?>|<\/p>/g, '')

    if (isFetching) {
        return <SkeletonCard />
    } else if (!sanitizedText) {
        return null
    }

    return (
        <div className='relative flex flex-col gap-2'>
            <CopyToClipboard text={sanitizedText} />
            <p className='leading-loose'>{sanitizedText}</p>
        </div>
    )
}