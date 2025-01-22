export default function SelectedVocabs({ vocabs }: { vocabs: string[] }) {
    return (
        <div className='flex gap-4 flex-wrap'>
            {vocabs?.map((vocab) => (
                <span key={vocab} className='border-2 border-solid p-2 rounded-lg'>
                    {vocab}
                </span>
            ))}
        </div>
    )
}