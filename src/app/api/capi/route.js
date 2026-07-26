import { NextResponse } from "next/server";

// Server-side event forwarding to Meta's Conversions API.
// Needs META_PIXEL_ID + META_CAPI_ACCESS_TOKEN set as env vars in Vercel
// (Events Manager -> your pixel -> Settings -> Conversions API -> Generate token).
// Until those are set, this route logs the event instead of sending it, so the
// site still works end-to-end without breaking.

export async function POST(req) {
  const body = await req.json();
  const { eventName, eventId, params, url } = body;

  const pixelId = process.env.META_PIXEL_ID;
  const accessToken = process.env.META_CAPI_ACCESS_TOKEN;

  if (!pixelId || !accessToken) {
    console.log("[CAPI stub - no credentials set]", eventName, eventId, params);
    return NextResponse.json({ status: "logged_only" });
  }

  const payload = {
    data: [
      {
        event_name: eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_id: eventId,
        event_source_url: url,
        action_source: "website",
        user_data: {
          client_ip_address: req.headers.get("x-forwarded-for") || "",
          client_user_agent: req.headers.get("user-agent") || "",
        },
        custom_data: params,
      },
    ],
  };

  try {
    const res = await fetch(
      `https://graph.facebook.com/v20.0/${pixelId}/events?access_token=${accessToken}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("CAPI error", err);
    return NextResponse.json({ error: "capi_failed" }, { status: 500 });
  }
}
