import { getAssetFromKV, mapRequestToAsset } from "@cloudflare/kv-asset-handler"
/**
 * The DEBUG flag will do two things that help during development:
 * 1. we will skip caching on the edge, which makes it easier to
 *    debug.
 * 2. we will return an error message on exception in your Response rather
 *    than the default 404.html page.
 */
const DEBUG = false

addEventListener("fetch", event => {
  try {
    event.respondWith(router(event))
  } catch (e) {
    if (DEBUG) {
      return event.respondWith(
        new Response(e.message || e.toString(), {
          status: 500,
        })
      )
    }
    event.respondWith(new Response("Internal Error", { status: 500 }))
  }
})

async function router(event) {
  const url = new URL(event.request.url)
  const params = url.pathname.split("/")
  switch (params[1]) {
    case "api":
      const headers = {
        "x-forwarded-for": event.request.headers.get("cf-connecting-ip"),
        user_agent: event.request.headers.get("user-agent"),
      }
      const resp = await fetch(
        `https://us-central1-analysis-tools-dev.cloudfunctions.net/${params[2]}${url.search}`,
        { headers }
      )
      return new Response(await resp.text())

    default:
      return handleEvent(event)
  }
}

async function handleEvent(event) {
  const url = new URL(event.request.url);
  let options = {}

  try {
    if (DEBUG) {
      // customize caching
      options.cacheControl = {
        bypassCache: true,
      }
    }

    const page = await getAssetFromKV(event, options)

    // allow headers to be altered
    let response = new Response(page.body, page)

    if (/\.avif$/.test(url)) {
      response.headers.set("Content-Type", "image/avif")
      response.headers.set("Content-Disposition", "inline")
    }

    if (
      /\.(avif|bmp|css|gif|jpg|jpeg|js|png|svg|tif|tiff|webp)(\?.*)?$/.test(url)
    ) {
      response.headers.set(
        "Cache-Control",
        "public, max-age=31536000, immutable"
      )
    }

    // Offload stats from the main thread
    const statsRequest = new Request(event.request)
    statsRequest.headers.set("X-Original-Url", url)
    statsRequest.headers.set(
      "X-Original-Ip",
      event.request.headers.get("cf-connecting-ip")
    )
    event.waitUntil(
      fetch("https://analysis-tools-dashflare.mre.workers.dev", statsRequest)
    )

    return response
  } catch (e) {
    // if an error is thrown try to serve the asset at 404.html
    if (!DEBUG) {
      try {
        let notFoundResponse = await getAssetFromKV(event, {
          mapRequestToAsset: req =>
            new Request(`${new URL(req.url).origin}/404.html`, req),
        })

        return new Response(notFoundResponse.body, {
          ...notFoundResponse,
          status: 404,
        })
      } catch (e) {}
    }

    return new Response(e.message || e.toString(), { status: 500 })
  }
}

/**
 * Here's one example of how to modify a request to
 * remove a specific prefix, in this case `/docs` from
 * the url. This can be useful if you are deploying to a
 * route on a zone, or if you only want your static content
 * to exist at a specific path.
 */
function handlePrefix(prefix) {
  return request => {
    // compute the default (e.g. / -> index.html)
    let defaultAssetKey = mapRequestToAsset(request)
    let url = new URL(defaultAssetKey.url)

    // strip the prefix from the path for lookup
    url.pathname = url.pathname.replace(prefix, "/")

    // inherit all other props from the default request
    return new Request(url.toString(), defaultAssetKey)
  }
}
