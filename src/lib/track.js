"use client";

// Fires the same logical event across Meta Pixel (browser), Meta Conversions API
// (server, via /api/capi), and GTM/GA4 dataLayer - the standard triple-tracked
// setup used by real D2C brands so events aren't lost to ad blockers / iOS ATT.

function genEventId() {
  return `evt_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

export function track(eventName, params = {}) {
  const eventId = genEventId();

  // 1) Meta Pixel (browser-side)
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", eventName, params, { eventID: eventId });
  }

  // 2) GTM dataLayer (feeds GA4 + any other tags configured in GTM)
  if (typeof window !== "undefined" && window.dataLayer) {
    window.dataLayer.push({
      event: eventName.toLowerCase(),
      ecommerce: params,
      event_id: eventId,
    });
  }

  // 3) Meta Conversions API (server-side, deduped against the pixel event
  // above via the shared eventId). Fire-and-forget so it never blocks UI.
  fetch("/api/capi", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ eventName, eventId, params, url: window.location.href }),
  }).catch(() => {});

  return eventId;
}
