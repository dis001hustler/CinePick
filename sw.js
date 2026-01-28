const CACHE_NAME = 'cinepick-v1';
const RUNTIME_CACHE = 'cinepick-runtime-v1';
const API_CACHE = 'cinepick-api-v1';

// Files to cache on installation
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json'
];

// API endpoints that can be cached
const API_ENDPOINTS = [
  'https://www.omdbapi.com/'
];

// Install event - cache essential assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(ASSETS_TO_CACHE).catch(() => {
          // If some assets fail to cache, continue anyway
          console.log('Some assets failed to cache on install');
        });
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME && name !== RUNTIME_CACHE && name !== API_CACHE)
          .map(name => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event - implement cache strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip chrome extensions and other non-http(s)
  if (!url.protocol.startsWith('http')) {
    return;
  }

  // API requests - Network first, fallback to cache
  if (url.origin === 'https://www.omdbapi.com') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Clone the response
          const clonedResponse = response.clone();
          
          // Cache successful API responses
          if (response.status === 200) {
            caches.open(API_CACHE).then((cache) => {
              cache.put(request, clonedResponse);
            });
          }
          
          return response;
        })
        .catch(() => {
          // Network failed, try cache
          return caches.match(request).then((cachedResponse) => {
            if (cachedResponse) {
              return cachedResponse;
            }
            
            // Return offline response for API failures
            return new Response(
              JSON.stringify({ Response: 'False', Error: 'Offline - cached data unavailable' }),
              { headers: { 'Content-Type': 'application/json' } }
            );
          });
        })
    );
    return;
  }

  // Assets - Cache first, fallback to network
  event.respondWith(
    caches.match(request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        
        return fetch(request).then((response) => {
          // Clone the response
          const clonedResponse = response.clone();
          
          // Cache successful responses
          if (response.status === 200) {
            caches.open(RUNTIME_CACHE).then((cache) => {
              cache.put(request, clonedResponse);
            });
          }
          
          return response;
        });
      })
      .catch(() => {
        // If both cache and network fail, return offline page or cached response
        return caches.match(request)
          .then((cachedResponse) => {
            return cachedResponse || new Response('Offline', {
              status: 503,
              statusText: 'Service Unavailable',
              headers: new Headers({
                'Content-Type': 'text/plain'
              })
            });
          });
      })
  );
});

// Background sync for offline actions (future enhancement)
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-movies') {
    event.waitUntil(syncMovieData());
  }
});

async function syncMovieData() {
  // Placeholder for syncing movie data to server
  console.log('Syncing movie data...');
}

// Push notifications (future enhancement)
self.addEventListener('push', (event) => {
  const data = event.data?.json() ?? {};
  const options = {
    body: data.body || 'New notification from CinePick',
    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192"><rect fill="%23e50914" width="192" height="192"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="100" font-weight="bold" fill="white" font-family="Arial">🎬</text></svg>',
    badge: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96"><rect fill="%23e50914" width="96" height="96"/></svg>'
  };

  event.waitUntil(
    self.registration.showNotification(data.title || 'CinePick', options)
  );
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then((clientList) => {
      for (let client of clientList) {
        if (client.url === '/' && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow('/');
      }
    })
  );
});
