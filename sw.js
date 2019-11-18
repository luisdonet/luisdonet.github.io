const version = "4fe3e0a";
const currentCacheName = `ELCWEB-${version}`;
const filesToCache = [
    "/theme/js/scripts.js?v=37c7440",
    "/authors/?v=e7b91fa",
    "/posts/hello-world/?v=f7362b0",
    "/theme/images/RevealJS.svg?v=eb946c8",
    "/feeds/luis-donet.atom.xml?v=276112a",
    "/theme/images/Jupyter.svg?v=056bcc4",
    "/blog/images/hello/hola!-thumbnail.jpg?v=b037159",
    "/tag/probability/?v=25f2877",
    "/theme/images/DOC.svg?v=5d41948",
    "/feeds/all-en.atom.xml?v=0ec0567",
    "/?v=bc3b61c",
    "/favicon.ico?v=b758f8a",
    "/posts/2019/Nov/?v=6678bab",
    "/link/github/?v=76c6050",
    "/site.webmanifest?v=3a6e8ce",
    "/author/luis-donet/?v=4bd9f3b",
    "/theme/css/style.css?v=8fffc5c",
    "/extra/browserconfig.xml?v=8dbb903",
    "/archives/?v=5604bdd",
    "/categories/?v=55211dd",
    "/pages/about/?v=2c06057",
    "/tags/?v=77e11f0",
    "/posts/hello-world/images/hello/hola!-thumbnail.jpg?v=b037159",
    "/feeds/luis-donet.rss.xml?v=096e088",
    "/localization.ini?v=b958412",
    "/theme/images/PDF.svg?v=872b33e",
    "/sitemap.xml?v=2646fe9",
    "/extra/sw_template.js?v=4cee959",
    "/safari-pinned-tab.svg?v=4686042",
    "/posts/2019/?v=9f050d7",
    "/category/hello/?v=57c7558"
]

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(currentCacheName)
      .then(cache => cache.addAll(filesToCache))
      .then(self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(cacheNames => cacheNames.filter(cacheName => ! currentCacheName.includes(cacheName) ))
      .then(cachesToDelete => Promise.all(cachesToDelete.map(cacheToDelete => caches.delete(cacheToDelete))))
      .then(self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const url = event.request.url;
  const scope = self.registration.scope;
  
	if (!url.startsWith(scope)) {
		return;
  }

  event.respondWith(
    caches.open(currentCacheName)
      .then(cache => cache.match(event.request, {ignoreSearch: true}) )
      .then(response => response || fetch(event.request) )
  );
});
