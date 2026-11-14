/* Service worker da Batalha Matemática: deixa o jogo funcionar sem internet depois da primeira visita.
 * Mude VERSAO sempre que trocar arquivos, para os aparelhos pegarem a atualização. */
const VERSAO = 'batalha-2026-11-14-1';
const CASCA = [
  './', 'index.html', 'css/style.css',
  'js/main.js', 'js/banco.js', 'js/batalha.js', 'js/relatorio.js', 'js/audio.js', 'js/fala.js', 'js/icones.js', 'js/reta.js',
  'js/data/questions/index.js', 'js/data/questions/bloco1.js', 'js/data/questions/bloco2.js',
  'js/data/questions/bloco3.js', 'js/data/questions/bloco4.js', 'js/data/questions/bloco5.js',
  'data/banco/manifesto.json',
  'assets/img/favicon.png', 'assets/img/avatar_estatico.webp'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(VERSAO).then(c => c.addAll(CASCA)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(chaves => Promise.all(chaves.filter(k => k !== VERSAO).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;            // fontes do Google e afins: direto da rede
  if (/\.(mp3|mp4)$/i.test(url.pathname)) return;        // áudio e vídeo: o navegador cuida (pedidos parciais)

  const ehBanco = url.pathname.includes('/data/banco/');
  if (ehBanco) {
    // banco de questões: usa o que está guardado e atualiza em segundo plano
    e.respondWith(caches.open(VERSAO).then(async (c) => {
      const guardado = await c.match(req);
      const rede = fetch(req).then(r => { if (r.ok) c.put(req, r.clone()); return r; }).catch(() => guardado);
      return guardado || rede;
    }));
    return;
  }
  // telas, scripts e estilos: rede primeiro (pega as novidades), cache se estiver sem internet
  e.respondWith(
    fetch(req).then(r => {
      if (r.ok) { const copia = r.clone(); caches.open(VERSAO).then(c => c.put(req, copia)); }
      return r;
    }).catch(() => caches.match(req).then(r => r || caches.match('index.html')))
  );
});
