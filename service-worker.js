
const CACHE_NAME = 'card-cache-v2';
const FILES_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './screenshot1.png',
  './bg.jpg',
  './qr_vcard.png',
  './andre_guimaraes.vcf'
];

// Instala e adiciona arquivos ao cache
self.addEventListener('install', (event) => {
  console.log('[ServiceWorker] Instalando...');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[ServiceWorker] Cacheando arquivos');
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Ativa e remove caches antigos
self.addEventListener('activate', (event) => {
  console.log('[ServiceWorker] Ativando');
  event.waitUntil(
    caches.keys().then((keyList) =>
      Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[ServiceWorker] Removendo cache antigo', key);
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

// Intercepta requisições e serve do cache se disponível
self.addEventListener('fetch', (event) => {
  console.log('[ServiceWorker] Buscando', event.request.url);
  event.respondWith(
    caches.match(event.request).then((response) => response || fetch(event.request))
  );
});
