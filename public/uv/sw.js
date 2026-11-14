importScripts('/Ultraviolet-Static/uv/uv.bundle.js');
importScripts('/Ultraviolet-Static/uv/uv.config.js');
importScripts(__uv$config.sw || '/Ultraviolet-Static/uv/uv.sw.js');

const uv = new UVServiceWorker();

self.addEventListener('fetch', event => {
    event.respondWith(
        (async ()=>{
            if(uv.route(event)) {
                return await uv.fetch(event);
            }
            return await fetch(event.request);
        })()
    );
});
