# Aura Skin — test storefront for Meta Ads / pixel practice

Next.js app with 5 products, cart, fake checkout, and a thank-you page.
Fires ViewContent, AddToCart, InitiateCheckout, and Purchase to:
- Meta Pixel (browser)
- Meta Conversions API (server, via /api/capi — deduped with the pixel using a shared event_id)
- GTM dataLayer (which can feed GA4 or any other tag)

## 1. Deploy to Vercel

You already have a Vercel account, so from inside this folder:

```
npm install -g vercel   # if you don't have the CLI yet
vercel login
vercel
```

Follow the prompts (link to a new project, accept defaults). It'll give you a live URL.
For future changes, just run `vercel --prod` again, or connect the folder to a GitHub repo
and let Vercel auto-deploy on push.

## 2. Set up Meta

1. business.facebook.com → create a Business Account (any test name is fine)
2. Events Manager → Connect Data Sources → Web → Meta Pixel → Create → copy the Pixel ID
3. In the same pixel's Settings → Conversions API → Generate access token → copy it

## 3. Add environment variables in Vercel

Project → Settings → Environment Variables, add:
- `NEXT_PUBLIC_META_PIXEL_ID` = your pixel ID
- `META_PIXEL_ID` = same pixel ID
- `META_CAPI_ACCESS_TOKEN` = the token from step 2.3

(GA4 / GTM vars are optional — leave blank if you're not testing those yet.)

Redeploy after adding env vars (`vercel --prod`) so they take effect.

## 4. Verify events are firing

- Install the "Meta Pixel Helper" Chrome extension, browse your live Vercel URL, click through
  product → add to cart → cart → checkout → place order, and confirm each event fires.
- Meta Events Manager → Test Events tab → paste your site URL → watch the live event stream
  (this shows both the Pixel and the Conversions API event side by side, so you can confirm
  dedup is working — you should NOT see duplicate Purchases).

## Notes

- Checkout is fake — no real payment is processed, any input is accepted.
- Cart is stored in sessionStorage, so it resets each new browser session.
- Product images are CSS color blocks (no external image dependency, nothing to break).
