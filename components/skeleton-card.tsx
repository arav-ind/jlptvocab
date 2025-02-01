import { useIsMobile } from '@/hooks/use-mobile'
import { Skeleton } from './ui/skeleton'

export function SkeletonCard() {
    const isMobile = useIsMobile()
    return (
        <div className='flex flex-col gap-3'>
            <Skeleton className='h-5 w-5 self-end' />
            <Skeleton className='h-4 w-[100%]' />
            <Skeleton className='h-4 w-[100%]' />
            <Skeleton className='h-4 w-[100%]' />
            <Skeleton className='h-4 w-[100%]' />
            {
                isMobile ? (
                    <>
                        <Skeleton className='h-4 w-[100%]' />
                        <Skeleton className='h-4 w-[100%]' />
                        <Skeleton className='h-4 w-[100%]' />
                        <Skeleton className='h-4 w-[100%]' />
                    </>
                ) : null
            }
            <Skeleton className='h-4 w-[80%]' />
        </div>
    )
}
