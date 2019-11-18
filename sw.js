const version = "891ea1a";
const currentCacheName = `ELCWEB-${version}`;
const filesToCache = [
    "/tag/probability/?v=60fd344",
    "/extra/browserconfig.xml?v=8dbb903",
    "/pages/about/?v=2c06057",
    "/archives/?v=5604bdd",
    "/favicon.ico?v=b758f8a",
    "/feeds/all-en.atom.xml?v=af73dc2",
    "/theme/images/DOC.svg?v=5d41948",
    "/category/hello/?v=d2f86e4",
    "/theme/images/RevealJS.svg?v=eb946c8",
    "/authors/?v=e7b91fa",
    "/blog/images/hello/hola!-thumbnail.jpg?v=b037159",
    "/posts/hello-world/images/hello/hola!-thumbnail.jpg?v=b037159",
    "/posts/hello-world/?v=e9688f3",
    "/?v=96e7c4f",
    "/categories/?v=55211dd",
    "/theme/images/Jupyter.svg?v=056bcc4",
    "/feeds/luis-donet.rss.xml?v=c61b85d",
    "/author/luis-donet/?v=e2d3287",
    "/posts/2019/?v=9f050d7",
    "/localization.ini?v=b958412",
    "/theme/images/PDF.svg?v=872b33e",
    "/posts/2019/Nov/?v=6678bab",
    "/sitemap.xml?v=d6acbc8",
    "/link/github/?v=76c6050",
    "/tags/?v=77e11f0",
    "/safari-pinned-tab.svg?v=4686042",
    "/extra/sw_template.js?v=4cee959",
    "/theme/css/style.css?v=8fffc5c",
    "/site.webmanifest?v=3a6e8ce",
    "/feeds/luis-donet.atom.xml?v=822a737",
    "/theme/js/scripts.js?v=37c7440"
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
