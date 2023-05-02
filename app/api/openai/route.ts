import { NextRequest, NextResponse } from "next/server";
import {OPENAI_URL, requestOpenai} from "../common";

async function makeRequest(req: NextRequest) {
  try {
    const openaiPath = req.headers.get("path");
    const body = await req.text()
    console.log('req.body=', body)
    const api = await fetch(`${OPENAI_URL}/${openaiPath}`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${req.headers.get('Authorization')}`,
      },
      method: req.method,
      body: body,
    });

    const res = new NextResponse(api.body);
    res.headers.set("Content-Type", "application/json");
    res.headers.set("Cache-Control", "no-cache");
    return res;
  } catch (e) {
    console.error("makeRequest [OpenAI] ", e);
    return NextResponse.json(
      {
        error: true,
        msg: JSON.stringify(e),
      },
      {
        status: 500,
      },
    );
  }
}

export async function POST(req: NextRequest) {
  return makeRequest(req);
}

export async function GET(req: NextRequest) {
  return makeRequest(req);
}
