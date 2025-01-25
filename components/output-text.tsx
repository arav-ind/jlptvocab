import { SkeletonCard } from './skeleton-card'

export default function OutputText({ text, isFetching }: { text: string | null, isFetching: boolean }) {
    const sanitizedText = text?.replace(/<p.*?>|<\/p>/g, '')
    if (isFetching) {
        return <SkeletonCard />
    }
    return (
        <>
            <p className='leading-loose'>
                {sanitizedText}
            </p>
        </>
    )
}