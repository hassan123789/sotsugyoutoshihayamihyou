// Service Worker for PWA
const CACHE_NAME = 'gakureki-hayami-v1';
const urlsToCache = ['/', '/manifest.json', '/icon.svg'];

// インストール時にキャッシュ
self.addEventListener('install', (event) => {
	event.waitUntil(
		caches
			.open(CACHE_NAME)
			.then((cache) => cache.addAll(urlsToCache))
			.then(() => self.skipWaiting())
	);
});

// アクティベート時に古いキャッシュを削除
self.addEventListener('activate', (event) => {
	event.waitUntil(
		caches
			.keys()
			.then((cacheNames) => {
				return Promise.all(
					cacheNames.map((cacheName) => {
						if (cacheName !== CACHE_NAME) {
							return caches.delete(cacheName);
						}
					})
				);
			})
			.then(() => self.clients.claim())
	);
});

// フェッチ時にキャッシュを優先（Network falling back to cache）
self.addEventListener('fetch', (event) => {
	// 同一オリジンのリクエストのみ処理
	if (!event.request.url.startsWith(self.location.origin)) {
		return;
	}

	event.respondWith(
		fetch(event.request)
			.then((response) => {
				// 成功したらキャッシュに保存
				if (response.status === 200) {
					const responseClone = response.clone();
					caches.open(CACHE_NAME).then((cache) => {
						cache.put(event.request, responseClone);
					});
				}
				return response;
			})
			.catch(() => {
				// オフライン時はキャッシュから取得
				return caches.match(event.request);
			})
	);
});
