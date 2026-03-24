/* ═══════════════════════════════════════════════
   TRINUM — script.js
   ═══════════════════════════════════════════════

   COLUNAS DA PLANILHA (ordem):
   A: nome | B: subtitulo | C: categoria | D: preco
   E: preco_antigo | F: versiculo | G: tamanhos
   H: badge | I: foto_url | J: foto_url_2 | K: foto_url_3
   L: estoque | M: descricao | N: destaque (1, 2 ou 3)

   ═══════════════════════════════════════════════ */

import {ENV} from './config.js'

const CONFIG = {
  WHATSAPP_NUMBER: ENV.WHATSAPP_NUMBER,
  SHEET_ID:        ENV.SHEET_ID,
  SHEET_TAB:       ENV.SHEET_TAB,
  USE_DEMO_DATA:   ENV.USE_DEMO_DATA,
};

/* ── DEMO DATA ───────────────────────────────── */
const DEMO_PRODUCTS = [
  { nome:'Cruz da Graça',      subtitulo:'Edição Ouro',    categoria:'Fé & Devoção',       preco:'R$ 89,90', preco_antigo:'R$ 119,90', versiculo:'João 3:16',       tamanhos:'PP, P, M, G, GG',    badge:'sale', foto_url:'https://placehold.co/600x750/1C1610/C9A84C?text=Cruz+da+Graça',   foto_url_2:'', foto_url_3:'', estoque:'disponivel', descricao:'Cruz dourada sobre preto carvão. Algodão 100% penteado.',  destaque:'1' },
  { nome:'Salmo 23',           subtitulo:'Areia Clássica', categoria:'Salmos & Versículos', preco:'R$ 79,90', preco_antigo:'',          versiculo:'Salmos 23:1',     tamanhos:'P, M, G, GG, XGG',   badge:'new',  foto_url:'https://placehold.co/600x750/EFE8D8/8C5E20?text=Salmo+23',       foto_url_2:'', foto_url_3:'', estoque:'disponivel', descricao:'Tipografia serifada clássica. Caimento levemente cintado.',  destaque:'2' },
  { nome:'Pomba da Paz',       subtitulo:'Azul Noturno',   categoria:'Espírito Santo',      preco:'R$ 84,90', preco_antigo:'',          versiculo:'Mateus 3:16',     tamanhos:'PP, P, M, G, GG',    badge:'new',  foto_url:'https://placehold.co/600x750/1A2C3D/C9A84C?text=Pomba+da+Paz',  foto_url_2:'', foto_url_3:'', estoque:'disponivel', descricao:'Pomba dourada sobre azul profundo. Algodão mescla premium.',destaque:'3' },
  { nome:'Filipenses 4:13',    subtitulo:'Off-White',      categoria:'Salmos & Versículos', preco:'R$ 79,90', preco_antigo:'',          versiculo:'Filipenses 4:13', tamanhos:'P, M, G, GG',        badge:'',     foto_url:'https://placehold.co/600x750/EEEAE0/8C5E20?text=Fil+4:13',      foto_url_2:'', foto_url_3:'', estoque:'disponivel', descricao:'Tudo posso naquele que me fortalece.',                       destaque:''  },
  { nome:'Ichthys',            subtitulo:'Café Escuro',    categoria:'Símbolos Cristãos',   preco:'R$ 74,90', preco_antigo:'',          versiculo:'Marcos 1:17',     tamanhos:'PP, P, M, G, GG, XGG',badge:'',    foto_url:'https://placehold.co/600x750/2E1F0F/C9A84C?text=Ichthys',       foto_url_2:'', foto_url_3:'', estoque:'disponivel', descricao:'Símbolo do peixe cristão em dourado.',                      destaque:''  },
  { nome:'Videira Verdadeira', subtitulo:'Verde Floresta', categoria:'Vida Cristã',         preco:'R$ 79,90', preco_antigo:'',          versiculo:'João 15:5',       tamanhos:'P, M, G',            badge:'',     foto_url:'https://placehold.co/600x750/1A2E1E/C9A84C?text=Videira',       foto_url_2:'', foto_url_3:'', estoque:'esgotado',   descricao:'Ramos da videira em dourado sobre verde floresta.',          destaque:''  },
  { nome:'Cordeiro de Deus',   subtitulo:'Branca Pura',    categoria:'Fé & Devoção',       preco:'R$ 89,90', preco_antigo:'R$ 109,90', versiculo:'João 1:29',       tamanhos:'PP, P, M, G, GG',    badge:'sale', foto_url:'https://placehold.co/600x750/F5F2EC/8C5E20?text=Cordeiro',      foto_url_2:'', foto_url_3:'', estoque:'disponivel', descricao:'Cordeiro ilustrado com delicadeza.',                        destaque:''  },
  { nome:'Alfa e Ômega',       subtitulo:'Grafite',        categoria:'Símbolos Cristãos',   preco:'R$ 84,90', preco_antigo:'',          versiculo:'Apocalipse 22:13',tamanhos:'P, M, G, GG, XGG',   badge:'',     foto_url:'https://placehold.co/600x750/252525/C9A84C?text=Alfa+Omega',    foto_url_2:'', foto_url_3:'', estoque:'disponivel', descricao:'Letras gregas Α e Ω em dourado sobre grafite.',             destaque:''  },
  { nome:'Shalom',             subtitulo:'Rosa Nude',      categoria:'Paz & Graça',        preco:'R$ 74,90', preco_antigo:'',          versiculo:'Números 6:26',    tamanhos:'PP, P, M, G',        badge:'new',  foto_url:'https://placehold.co/600x750/E8D8D0/8C5E20?text=Shalom',       foto_url_2:'', foto_url_3:'', estoque:'disponivel', descricao:'Paz em hebraico com traço delicado. Tom rose nude.',         destaque:''  },
];

/* ══════════════════════════════════════════════
   WHATSAPP
   ══════════════════════════════════════════════ */
function openWhatsApp(msg) {
  window.open(`https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
}
function whatsappProduct(p) {
  openWhatsApp(`Olá! Tenho interesse na camiseta *${p.nome} — ${p.subtitulo}*.\n\nPoderia me passar mais informações sobre disponibilidade e tamanhos?`);
}

/* ══════════════════════════════════════════════
   GOOGLE SHEETS
   ══════════════════════════════════════════════ */
async function fetchProducts() {
  if (CONFIG.USE_DEMO_DATA || CONFIG.SHEET_ID === 'SEU_SHEET_ID_AQUI') {
    console.info('[Trinum] Modo demo ativo.');
    return DEMO_PRODUCTS;
  }

  const tabEncoded = encodeURIComponent(CONFIG.SHEET_TAB);
  const urls = [
    `https://docs.google.com/spreadsheets/d/${CONFIG.SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${tabEncoded}`,
    `https://docs.google.com/spreadsheets/d/${CONFIG.SHEET_ID}/export?format=csv&sheet=${tabEncoded}`,
  ];

  for (const url of urls) {
    try {
      console.info('[Trinum] Buscando:', url);
      const res = await fetch(url);
      if (!res.ok) { console.warn(`[Trinum] HTTP ${res.status}`); continue; }
      const csv = await res.text();
      if (csv.trim().startsWith('<')) { console.warn('[Trinum] Resposta HTML — planilha não pública?'); continue; }
      const products = parseCSV(csv);
      if (!products.length) { console.warn('[Trinum] CSV vazio.'); continue; }
      console.info(`[Trinum] ${products.length} produtos carregados.`);
      return products;
    } catch (e) {
      console.warn('[Trinum] Erro:', e.message);
    }
  }
  console.error('[Trinum] Falha ao carregar planilha. Usando demo.');
  return DEMO_PRODUCTS;
}

function parseCSV(csv) {
  const lines = csv.trim().split('\n');
  if (lines.length < 2) return [];
  return lines.slice(1).map(line => {
    const c = splitCSVLine(line);
    return {
      nome:        clean(c[0]  ?? ''),
      subtitulo:   clean(c[1]  ?? ''),
      categoria:   clean(c[2]  ?? ''),
      preco:       clean(c[3]  ?? ''),
      preco_antigo:clean(c[4]  ?? ''),
      versiculo:   clean(c[5]  ?? ''),
      tamanhos:    clean(c[6]  ?? ''),
      badge:       clean(c[7]  ?? '').toLowerCase(),
      foto_url:    clean(c[8]  ?? ''),
      foto_url_2:  clean(c[9]  ?? ''),
      foto_url_3:  clean(c[10] ?? ''),
      estoque:     clean(c[11] ?? 'disponivel').toLowerCase(),
      descricao:   clean(c[12] ?? ''),
      destaque:    clean(c[13] ?? ''),
      citacao:     clean(c[14] ?? ''),
    };
  }).filter(p => p.nome);
}

function splitCSVLine(line) {
  const res = []; let cur = '', inQ = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') { inQ = !inQ; continue; }
    if (ch === ',' && !inQ) { res.push(cur); cur = ''; continue; }
    cur += ch;
  }
  res.push(cur);
  return res;
}
function clean(s) { return s.trim().replace(/^"|"$/g,''); }

function getPhotos(p) {
  return [p.foto_url, p.foto_url_2, p.foto_url_3].filter(Boolean);
}

/* ══════════════════════════════════════════════
   FEATURED SECTIONS — dinâmico via planilha
   ══════════════════════════════════════════════ */
function buildFeatured(products) {
  _productRegistry = [];
  const container = document.getElementById('featured-container');
  if (!container) return;

  const slots = [1, 2, 3].map(n =>
    products.find(p => p.destaque === String(n))
  ).filter(Boolean);

  if (!slots.length) {
    container.innerHTML = '';
    return;
  }

  container.innerHTML = slots.map((p, i) => {
    const idx      = i + 1;
    const reversed = i % 2 === 1 ? 'reversed' : '';
    const photos   = getPhotos(p);
    const imgHTML  = photos[0]
      ? `<img src="${photos[0]}" alt="${p.nome}" class="feature-img" loading="lazy" />`
      : `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;color:rgba(201,168,76,.3);font-size:40px;">✝</div>`;
    const badgeHTML = p.badge === 'sale' ? `<div class="feature-img-badge">Promoção</div>`
                    : p.badge === 'new'  ? `<div class="feature-img-badge new">Novo</div>`
                    : '';
    const oldPriceHTML = p.preco_antigo ? `<span class="price-old">${p.preco_antigo}</span>` : '';
    const pIdx = registerProduct(p);

    return `
    <article class="feature-section ${reversed}" id="feat-${idx}">
      <div class="feature-visual">
        <div class="feature-img-wrap">${imgHTML}</div>
        ${badgeHTML}
      </div>
      <div class="feature-info">
        <span class="feature-num">0${idx}</span>
        <p class="feature-eyebrow">Destaque ${idx}</p>
        <h2 class="feature-title">${p.nome}<br><em>${p.subtitulo}</em></h2>
        ${p.citacao ? `<blockquote class="feature-verse">"${p.citacao}" <cite>— ${p.versiculo}</cite></blockquote>` : ''}
        <p class="feature-desc">${p.descricao}</p>
        <p class="feature-price">
          <span class="price-current">${p.preco}</span>
          ${oldPriceHTML}
        </p>
        <div class="feature-actions">
          <button class="btn-primary" onclick="openLightbox(${pIdx})">Ver Produto</button>
          <a href="#catalogo" class="btn-ghost">Ver Catálogo</a>
        </div>
      </div>
    </article>`;
  }).join('');

  initFeaturedObserver();
}

function initFeaturedObserver() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('is-visible');
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.feature-section').forEach(el => obs.observe(el));
}

/* ══════════════════════════════════════════════
   TICKER
   ══════════════════════════════════════════════ */
const TICKER_MSGS = ['Novidades Disponíveis','Estampas Exclusivas','Arte Sacra Contemporânea','Algodão 100% Penteado','Qualidade Premium','Peça pelo WhatsApp'];

function buildTicker() {
  const t = document.getElementById('ticker-track');
  if (!t) return;
  const all = [...TICKER_MSGS, ...TICKER_MSGS, ...TICKER_MSGS];
  t.innerHTML = all.map(m => `<span class="ticker-item">${m}</span>`).join('');
}

/* ══════════════════════════════════════════════
   FILTERS & GRID
   ══════════════════════════════════════════════ */
let allProducts    = [];
let activeCategory = 'Todas';

function buildFilters(products) {
  const cats = ['Todas', ...new Set(products.map(p => p.categoria).filter(Boolean))];
  const el = document.getElementById('cat-filters');
  if (!el) return;
  el.innerHTML = cats.map(cat =>
    `<button class="filter-btn${cat === activeCategory ? ' active' : ''}" onclick="setFilter('${cat}',this)">${cat}</button>`
  ).join('');
}

function setFilter(cat, btn) {
  activeCategory = cat;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderGrid(allProducts);
}

function renderGrid(products) {
  _productRegistry = [];
  const grid = document.getElementById('product-grid');
  if (!grid) return;

  const filtered = activeCategory === 'Todas'
    ? products
    : products.filter(p => p.categoria === activeCategory);

  if (!filtered.length) {
    grid.innerHTML = `<p style="grid-column:1/-1;text-align:center;color:var(--gray);padding:60px 0;font-size:14px;">Nenhum produto nessa categoria ainda.</p>`;
    return;
  }

  grid.innerHTML = filtered.map((p, i) => buildCard(p, i)).join('');

  setTimeout(() => {
    document.querySelectorAll('.prod-card').forEach((card, i) => {
      card.style.transitionDelay = `${Math.min(i * 0.055, 0.5)}s`;
      card.classList.add('in');
    });
  }, 40);
}

function buildCard(p, i) {
  const isEsgotado = p.estoque === 'esgotado';
  const photos     = getPhotos(p);
  const mainImg    = photos[0] || '';
  const hoverImg   = photos[1] || '';
  const pIdx       = registerProduct(p);

  const badgeHTML = isEsgotado
    ? `<div class="prod-badge esgotado">Esgotado</div>`
    : p.badge === 'sale' ? `<div class="prod-badge sale">Promoção</div>`
    : p.badge === 'new'  ? `<div class="prod-badge new">Novo</div>`
    : '';

  const mainImgHTML  = mainImg  ? `<img class="prod-img-main"  src="${mainImg}"  alt="${p.nome}" loading="lazy" />` : '';
  const hoverImgHTML = hoverImg ? `<img class="prod-img-hover" src="${hoverImg}" alt="${p.nome} — costas" loading="lazy" />` : '';
  const countHTML    = photos.length > 1 ? `<span class="prod-photo-count">${photos.length} fotos</span>` : '';

  const ctaBtn = isEsgotado
    ? `<button class="prod-cta-hover" style="background:var(--gray);cursor:default" disabled>Esgotado</button>`
    : `<button class="prod-cta-hover" onclick="event.stopPropagation();openLightbox(${pIdx})">Ver Detalhes</button>`;

  return `
  <article class="prod-card" onclick="openLightbox(${pIdx})">
    <div class="prod-img-wrap ${isEsgotado ? 'esgotado' : ''}">
      ${mainImgHTML}
      ${hoverImgHTML}
      <div class="prod-overlay">${ctaBtn}</div>
      ${badgeHTML}
      ${countHTML}
    </div>
    <div class="prod-meta">
      <p class="prod-cat">${p.categoria}</p>
      <h3 class="prod-name">${p.nome}<br><em style="font-style:italic;font-size:.76em;color:var(--gold)">${p.subtitulo}</em></h3>
      ${p.versiculo ? `<p class="prod-verse">${p.versiculo}</p>` : ''}
      <p class="prod-price">${p.preco}${p.preco_antigo ? ` <del>${p.preco_antigo}</del>` : ''}</p>
      ${p.tamanhos ? `<p class="prod-sizes">Tamanhos: ${p.tamanhos}</p>` : ''}
    </div>
  </article>`;
}

/* ══════════════════════════════════════════════
   LIGHTBOX
   ══════════════════════════════════════════════ */
let _lbProduct = null;
let _lbPhotoIdx = 0;

/* Função interna — nome diferente de window.openLightbox para evitar recursão */
function _openLightbox(p) {
  if (p.estoque === 'esgotado') return;
  _lbProduct  = p;
  _lbPhotoIdx = 0;

  document.getElementById('lb-cat').textContent   = p.categoria;
  document.getElementById('lb-title').innerHTML   = `${p.nome}<br><em style="font-style:italic;color:var(--gold);font-size:.8em">${p.subtitulo}</em>`;
  document.getElementById('lb-verse').textContent = p.versiculo ? `"${p.versiculo}"` : '';
  document.getElementById('lb-desc').textContent  = p.descricao;
  document.getElementById('lb-price').innerHTML   = p.preco + (p.preco_antigo ? ` <del style="font-size:.6em;color:var(--gray-light);font-weight:300">${p.preco_antigo}</del>` : '');
  document.getElementById('lb-sizes').textContent = p.tamanhos ? `Tamanhos: ${p.tamanhos}` : '';

  const wppBtn = document.getElementById('lb-wpp');
  wppBtn.onclick = () => whatsappProduct(p);

  const photos = getPhotos(p);
  lbSetPhoto(0, photos);
  buildLbThumbs(photos);

  const nav = photos.length > 1;
  document.getElementById('lb-prev').style.display = nav ? '' : 'none';
  document.getElementById('lb-next').style.display = nav ? '' : 'none';

  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function lbSetPhoto(idx, photos) {
  const list = photos || getPhotos(_lbProduct);
  _lbPhotoIdx = (idx + list.length) % list.length;
  const img = document.getElementById('lb-img');
  img.style.opacity = '0';
  setTimeout(() => {
    img.src = list[_lbPhotoIdx];
    img.style.opacity = '1';
  }, 150);
  document.querySelectorAll('.lb-thumb').forEach((t, i) => t.classList.toggle('active', i === _lbPhotoIdx));
}

function buildLbThumbs(photos) {
  const wrap = document.getElementById('lb-thumbs');
  if (photos.length <= 1) { wrap.innerHTML = ''; return; }
  wrap.innerHTML = photos.map((url, i) =>
    `<div class="lb-thumb ${i === 0 ? 'active' : ''}" onclick="lbSetPhoto(${i})">
      <img src="${url}" alt="Foto ${i+1}" loading="lazy"/>
    </div>`
  ).join('');
}

function lbNav(dir) {
  lbSetPhoto(_lbPhotoIdx + dir);
}

window.closeLightbox = function(e) {
  if (e && e.target && e.target !== document.getElementById('lightbox')) return;
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
  _lbProduct = null;
};

// Fechar com ESC
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') window.closeLightbox();
  if (e.key === 'ArrowLeft'  && _lbProduct) lbNav(-1);
  if (e.key === 'ArrowRight' && _lbProduct) lbNav(1);
});

/* ══════════════════════════════════════════════
   SCROLL ANIMATIONS
   ══════════════════════════════════════════════ */
function initScrollReveal() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal, .cat-header').forEach(el => obs.observe(el));
}

function initNav() {
  const nav = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    nav.style.boxShadow = window.scrollY > 10 ? '0 2px 20px rgba(0,0,0,.07)' : 'none';
  }, { passive: true });
}

function initMobileMenu() {
  document.getElementById('hamburger')?.addEventListener('click', () => {
    document.getElementById('nav-mobile')?.classList.toggle('open');
  });
}
window.closeMobile = () => document.getElementById('nav-mobile')?.classList.remove('open');

function initScrollHint() {
  const hint = document.querySelector('.hero-scroll-hint');
  if (!hint) return;
  window.addEventListener('scroll', () => {
    hint.style.opacity = window.scrollY > 60 ? '0' : '1';
  }, { passive: true });
}

function initGSAP() {
  if (typeof gsap === 'undefined') return;
  if (typeof ScrollTrigger !== 'undefined') gsap.registerPlugin(ScrollTrigger);

  gsap.from('.hero-eyebrow', { opacity:0, y:28, duration:1,   delay:0.3, ease:'power3.out' });
  gsap.from('.hero-title',   { opacity:0, y:38, duration:1,   delay:0.5, ease:'power3.out' });
  gsap.from('.hero-sub',     { opacity:0, y:22, duration:1,   delay:0.7, ease:'power3.out' });
  gsap.from('.hero-actions', { opacity:0, y:18, duration:1,   delay:0.9, ease:'power3.out' });
  gsap.to('.hero-bg-word',   { yPercent:28, ease:'none', scrollTrigger:{ trigger:'#hero', start:'top top', end:'bottom top', scrub:true }});
}

/* ══════════════════════════════════════════════
   HELPERS
   ══════════════════════════════════════════════ */
let _productRegistry = [];

function registerProduct(obj) {
  const idx = _productRegistry.length;
  _productRegistry.push(obj);
  return idx;
}

/* Exposição global — chama _openLightbox (interna) sem risco de recursão */
window.openWhatsApp  = openWhatsApp;
window.openLightbox  = function(idx) {
  const p = _productRegistry[idx];
  if (!p) { console.warn('[Trinum] Produto não encontrado no registry:', idx); return; }
  _openLightbox(p);
};
window.lbNav        = lbNav;
window.lbSetPhoto   = lbSetPhoto;
window.setFilter    = setFilter;

/* ══════════════════════════════════════════════
   INIT
   ══════════════════════════════════════════════ */
async function init() {
  buildTicker();
  initNav();
  initMobileMenu();
  initScrollHint();
  initScrollReveal();
  window.addEventListener('load', initGSAP);

  const loading = document.getElementById('grid-loading');
  try {
    allProducts = await fetchProducts();
    if (loading) loading.remove();
    buildFeatured(allProducts);
    buildFilters(allProducts);
    renderGrid(allProducts);
  } catch (err) {
    console.error('[Trinum] Erro fatal:', err);
    if (loading) loading.innerHTML = '<p style="color:var(--gray);padding:40px;text-align:center">Erro ao carregar produtos.</p>';
  }
}

document.addEventListener('DOMContentLoaded', init);