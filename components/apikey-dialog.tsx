"use client"
import { useLocalStorage } from '@/hooks/use-localstorage'
import { Button } from './ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { useState } from 'react'

export default function ApiKeyDialog() {
    const { setLocalStorage } = useLocalStorage()
    const [open, setOpen] = useState(false)
    const [apiKey, setApiKey] = useState('')
    return (
        <Dialog open={open}>
            <DialogTrigger asChild onClick={() => setOpen(true)}>
                <Button>Add Key</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Groq API Key</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="api-key" className="text-right">
                            API Key
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
                    }}>Save</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}