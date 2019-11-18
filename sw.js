const version = "c2169ce";
const currentCacheName = `ELCWEB-${version}`;
const filesToCache = [
    "/theme/js/scripts.js?v=37c7440",
    "/sitemap.xml?v=c0ae02f",
    "/feeds/all-en.atom.xml?v=fa5fd0f",
    "/?v=96e7c4f",
    "/theme/images/PDF.svg?v=872b33e",
    "/feeds/luis-donet.rss.xml?v=3835f6d",
    "/link/github/?v=76c6050",
    "/tag/probability/?v=60fd344",
    "/author/luis-donet/?v=e2d3287",
    "/favicon.ico?v=b758f8a",
    "/category/hello/?v=d2f86e4",
    "/pages/about/?v=2c06057",
    "/site.webmanifest?v=3a6e8ce",
    "/tags/?v=77e11f0",
    "/authors/?v=e7b91fa",
    "/posts/hello-world/images/hello/hola!-thumbnail.jpg?v=b037159",
    "/categories/?v=55211dd",
    "/safari-pinned-tab.svg?v=4686042",
    "/archives/?v=5604bdd",
    "/extra/sw_template.js?v=4cee959",
    "/posts/hello-world/?v=e77d6dc",
    "/localization.ini?v=b958412",
    "/extra/browserconfig.xml?v=8dbb903",
    "/theme/images/Jupyter.svg?v=056bcc4",
    "/theme/images/DOC.svg?v=5d41948",
    "/theme/css/style.css?v=8fffc5c",
    "/feeds/luis-donet.atom.xml?v=079d47a",
    "/posts/2019/?v=9f050d7",
    "/posts/2019/Nov/?v=6678bab",
    "/blog/images/hello/hola!-thumbnail.jpg?v=b037159",
    "/theme/images/RevealJS.svg?v=eb946c8"
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
