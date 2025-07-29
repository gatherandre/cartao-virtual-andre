self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('card-cache').then((cache) => cache.addAll([
      './',
      './index.html',
      './manifest.json',
      './icon-192.png',
      './icon-512.png',
      './bg.jpg',
      './andre_guimaraes.vcf'
    ]))
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => res || fetch(e.request))
  );
});
