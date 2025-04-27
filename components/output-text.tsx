import { SkeletonCard } from './skeleton-card'
import CopyToClipboard from './copy-to-clipboard'

export default function OutputText({
    text,
    isFetching,
    selectedValues,
}: {
    text: string | null
    isFetching: boolean
    selectedValues: string[]
}) {
    const sanitizedText = text?.replace(/<p.*?>|<\/p>/g, '')

    if (isFetching) return <SkeletonCard />
    if (!sanitizedText) return null

    // Escape special regex characters in vocab words
    const escapedWords = selectedValues.map((word) =>
        word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    )
    const regex = new RegExp(`(${escapedWords.join('|')})`, 'g')

    const parts = sanitizedText.split(regex)

    return (
        <div className="relative flex flex-col gap-2">
            <CopyToClipboard text={sanitizedText} />
            <p className="leading-loose">
                {parts.map((part, i) =>
                    selectedValues.includes(part) ? (
                        <span key={i} className="text-pink-600 font-semibold">
                            {part}
                        </span>
                    ) : (
                        part
                    )
                )}
            </p>
        </div>
    )
}

