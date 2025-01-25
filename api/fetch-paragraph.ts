// 'use server' // TODO: Github pages does not support server actions

export async function fetchParagraph(prompt: string[]) {
    const apiUrl = 'https://api.groq.com/openai/v1/chat/completions'
    const apiKey = process.env.NEXT_PUBLIC_API_KEY

    const requestBody = {
        model: 'llama3-8b-8192', // Groq-specific model
        messages: [
            {
                role: 'user',
                content: 
                `
                    Give me a 200 words paragraph in japanese using the following words: 
                    '${prompt.join(', ')}'. Please don't make any extra statements other than the para itself.
                    Just give me the japanese paragraph as response wrapped in <p>
                `
            }
        ],
        temperature: 0.7
    }

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${apiKey}`
            },
            body: JSON.stringify(requestBody)
        })

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`)
        }

        const data = await response.json()
        return data.choices[0].message.content
    } catch (error) {
        console.error('Error fetching categories from Groq API:', error)
        return null
    }
}