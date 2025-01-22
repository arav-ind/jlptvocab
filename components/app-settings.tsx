import ApiKeyDialog from './apikey-dialog'
import { ModeToggle } from './mode-toggle'


export default function AppSettings() {
    return (
        <div className='absolute right-0 top-0 p-3 flex gap-4'>
            <ApiKeyDialog />
            <ModeToggle />
        </div>
    )
}