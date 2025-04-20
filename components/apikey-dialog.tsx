'use client'
import { useLocalStorage } from '@/hooks/use-localstorage'
import { Button } from './ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { useState } from 'react'
import { CONSTANTS } from '@/constants/constants'

export default function ApiKeyDialog() {
    const { setLocalStorage } = useLocalStorage()
    const [open, setOpen] = useState(false)
    const [apiKey, setApiKey] = useState('')

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild onClick={() => setOpen(true)}>
                <Button>{CONSTANTS.ADD_API}</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{CONSTANTS.ADD_GROQ}</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="api-key" className="text-right">
                            {CONSTANTS.API_KEY}
                        </Label>
                        <Input
                            id="api-key"
                            className="col-span-3"
                            onChange={(e) => setApiKey(e.target.value)}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={() => {
                        setLocalStorage('api-key', apiKey)
                        setOpen(false)
                    }}>{CONSTANTS.SAVE}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}