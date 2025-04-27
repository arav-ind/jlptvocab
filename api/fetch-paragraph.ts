// 'use server' // TODO: Github pages does not support server actions

export async function fetchParagraph(prompt: string[], apiKey: string, level: string) {
    if (!apiKey) throw new Error('No API Key found!')

    const apiUrl = 'https://api.groq.com/openai/v1/chat/completions'

    const requestBody = {
        model: 'llama3-8b-8192',
        messages: [
            {
                role: 'user',
                content: `
                    <p>
                        Using the following words at JLPT ${level} level — ${prompt.join(', ')} — write a natural 200-word paragraph in Japanese. 
                        Do not include any explanation or translation. 
                        Only output the paragraph, and wrap it in a single <p> tag.
                    </p>
                    `.trim()
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