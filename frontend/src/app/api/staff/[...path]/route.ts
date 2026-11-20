import { NextRequest, NextResponse } from "next/server";

const cookieName = "kabulvan_staff";
const sessionAge = 12 * 60 * 60;
export const runtime = "nodejs";
export const maxDuration = 30;

async function forward(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
    const { path } = await context.params;
    if (path.some((part) => !/^[A-Za-z0-9_:-]+$/.test(part))) {
        return NextResponse.json({ detail: "Invalid staff endpoint" }, { status: 404 });
    }
    const endpoint = path.map(encodeURIComponent).join("/");
    const isWrite = request.method !== "GET";
    const origin = request.headers.get("origin");
    const originHost = origin ? URL.parse(origin)?.host : null;
    const requestHost = request.headers.get("host");
    const headers = { "Cache-Control": "no-store" };
    if (isWrite && (!originHost || originHost !== requestHost)) {
        return NextResponse.json({ detail: "Invalid request origin" }, { status: 403, headers });
    }
    const base = process.env.STAFF_API_URL;
    const secret = process.env.STAFF_PROXY_SECRET;
    if (!base || !secret) {
        return NextResponse.json({ detail: "Staff service is unavailable" }, { status: 503, headers });
    }
    const token = request.cookies.get(cookieName)?.value ?? "";
    try {
        const upstream = await fetch(
            new URL("/api/staff/" + endpoint + request.nextUrl.search, base),
            {
                method: request.method,
                headers: {
                    "Content-Type": "application/json",
                    "X-Staff-Proxy-Secret": secret,
                    Authorization: "Bearer " + token,
                },
                body: isWrite ? await request.text() : undefined,
                cache: "no-store",
                redirect: "error",
                signal: request.signal,
            },
        );
        if (upstream.status === 422) {
            return NextResponse.json({ detail: "Check the information and try again." }, { status: 422, headers });
        }
        if (endpoint === "login" && upstream.ok) {
            const { token: session } = await upstream.json();
            const response = NextResponse.json({ ok: true }, { headers });
            response.cookies.set(cookieName, session, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                path: "/api/staff",
                maxAge: sessionAge,
            });
            return response;
        }
        if (endpoint === "logout" && upstream.ok) {
            const response = NextResponse.json({ ok: true }, { headers });
            response.cookies.set(cookieName, "", { path: "/api/staff", maxAge: 0 });
            return response;
        }
        return new NextResponse(upstream.body, {
            status: upstream.status,
            headers: { ...headers, "Content-Type": upstream.headers.get("Content-Type") ?? "application/json" },
        });
    } catch {
        return NextResponse.json({ detail: "Staff service is unavailable" }, { status: 503, headers });
    }
}

export { forward as GET, forward as POST, forward as PATCH, forward as PUT };
