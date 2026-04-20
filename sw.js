/* キャッチ売上アプリ Service Worker */
var CACHE = 'catch-sales-v2';
var STATIC = [
  '/catch-sales-app/',
  '/catch-sales-app/index.html',
  '/catch-sales-app/manifest.json',
  '/catch-sales-app/icon.svg',
  '/catch-sales-app/icon-192.png',
  '/catch-sales-app/icon-512.png',
  'https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js'
];

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(CACHE).then(function(c) {
      return Promise.allSettled(
        STATIC.map(function(url) { return c.add(url).catch(function(){}); })
      );
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.filter(function(k) { return k !== CACHE; })
            .map(function(k) { return caches.delete(k); })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  var url = e.request.url;

  /* GAS API → ネットワーク優先（オフライン時は空JSON返す） */
  if (url.indexOf('script.google.com') !== -1) {
    e.respondWith(
      fetch(e.request).catch(function() {
        return new Response(JSON.stringify({error:'offline'}),
          {headers:{'Content-Type':'application/json'}});
      })
    );
    return;
  }

  /* 静的ファイル → キャッシュ優先、バックグラウンドで更新 */
  e.respondWith(
    caches.open(CACHE).then(function(cache) {
      return cache.match(e.request).then(function(cached) {
        var network = fetch(e.request).then(function(res) {
          if (res.ok) cache.put(e.request, res.clone());
          return res;
        }).catch(function(){});
        return cached || network;
      });
    })
  );
});
