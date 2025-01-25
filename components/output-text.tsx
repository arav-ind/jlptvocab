export default function OutputText({ text }: { text: string }) {
    const sanitizedText = text?.replace(/<p.*?>|<\/p>/g, '')
    return (
        <>
            <p className='leading-loose'>
                {sanitizedText}
            </p>
        </>
    )
}