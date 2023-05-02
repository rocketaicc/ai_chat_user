import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/api/openai", "/api/chat-stream"],
};

function getIP(req: NextRequest) {
  let ip = req.ip ?? req.headers.get("x-real-ip");
  const forwardedFor = req.headers.get("x-forwarded-for");

  if (!ip && forwardedFor) {
    ip = forwardedFor.split(",").at(0) ?? "";
  }

  return ip;
}

export function middleware(req: NextRequest) {
  const token = req.headers.get("Authorization");
  console.log("[User IP] ", getIP(req));
  console.log("[Time] ", new Date().toLocaleString());

  if (!token) {
    return NextResponse.json(
      {
        error: true,
        needToken: true,
        msg: "Please go settings page and fill your token.",
      },
      {
        status: 401,
      },
    );
  }

  return NextResponse.next({
    request: {
      headers: req.headers,
    },
  });
}
