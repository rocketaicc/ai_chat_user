import {NextRequest} from "next/server";

export const OPENAI_URL = "https://openai.api.ai-rocket.cc";

export async function requestOpenai(req: NextRequest) {
    const body = await req.text()
    const openaiPath = req.headers.get("path");
    return fetch(`${OPENAI_URL}/${openaiPath}`, {
        // @ts-ignore
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${req.headers.get('Authorization')}`,
            "Reduce-Stream": true,
        },
        method: req.method,
        body: body,
    });
}
