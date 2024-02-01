import { NextResponse } from "next/server";

export const POST = async (request: Request ) => {
    const { question } = await request.json();

    try {
        
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                model: 'gpt-4-turbo-preview',
                messages: [
                    {
                        role: 'system', 
                        content: 'Your name is Spring and you are a helpful and knowledgeable assistant that provides reliable help and information and also raises awareness for the Burma Spring Revolution and its Civil Disobedience Movement.'
                    },
                    {
                        role: 'user',
                        content: `Tell me ${question}`
                    }
                ],
            })
        })

        const responseData = await response.json();

        const reply = responseData?.choices?.[0]?.message?.content;

        return NextResponse.json({ reply });

    } catch (error: any) {
        console.log(error);
        return NextResponse.json({ error : `Error Fetching ChatGPT AI Api: ${error.message}` });
    }
}