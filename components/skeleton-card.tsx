import { Skeleton } from './ui/skeleton'

export function SkeletonCard() {
    return (
        <div className='flex flex-col gap-3'>
            <Skeleton className='h-4 w-[100%]' />
            <Skeleton className='h-4 w-[100%]' />
            <Skeleton className='h-4 w-[100%]' />
            <Skeleton className='h-4 w-[100%]' />
            <Skeleton className='h-4 w-[80%]' />
        </div>
    )
}
