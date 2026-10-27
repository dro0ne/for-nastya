(() => {
  const G = window.GIFT;
  const $ = (id) => document.getElementById(id);

  // ---------- размеры коробки ----------
  const W = 250, D = 200, H = 110;   // основание
  const P = 6, L = 34;               // свес и высота крышки
  const WL = W + 2 * P, DL = D + 2 * P;

  const ICONS = {
    heart: '<svg viewBox="0 0 24 24" width="18" height="18"><path d="M12 21s-8-5.2-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 5.8-8 11-8 11z" fill="#e2337f"/></svg>',
    bow: '<svg viewBox="0 0 32 20" width="24" height="15"><path d="M16 10C11 2 3 1 2 5s3 9 14 5zM16 10c5-8 13-9 14-5s-3 9-14 5z" fill="#f0609f" stroke="#a3134f" stroke-width="1"/><circle cx="16" cy="10" r="3" fill="#c91d68"/></svg>',
    crown: '<svg viewBox="0 0 24 18" width="20" height="15"><path d="M2 15 L3 4 L8 9 L12 2 L16 9 L21 4 L22 15 Z" fill="#f7c948" stroke="#c9952b" stroke-width="1"/><circle cx="12" cy="11" r="1.8" fill="#e2337f"/></svg>',
    star: '<svg viewBox="0 0 24 24" width="14" height="14"><path d="M12 2l2.6 6.9L22 9.3l-5.8 4.6 2 7.1L12 17l-6.2 4 2-7.1L2 9.3l7.4-.4z" fill="#f39bc0"/></svg>'
  };

  function face(parent, w, h, transform, cls, html) {
    const el = document.createElement('div');
    el.className = 'face ' + (cls || '');
    el.style.width = w + 'px';
    el.style.height = h + 'px';
    el.style.marginLeft = -w / 2 + 'px';
    el.style.marginTop = -h / 2 + 'px';
    el.style.transform = transform;
    if (html) el.innerHTML = html;
    parent.appendChild(el);
    return el;
  }

  // Узор из иконок на стенке, мимо ленты по центру
  function sprinkle(w, h, seed) {
    const names = ['heart', 'bow', 'crown', 'star', 'heart', 'star'];
    let out = '';
    let r = seed;
    const rnd = () => (r = (r * 9301 + 49297) % 233280) / 233280;
    const count = Math.round((w * h) / 4200);
    for (let i = 0; i < count; i++) {
      let x = rnd() * (w - 26) + 4;
      if (Math.abs(x + 10 - w / 2) < 26) x = x < w / 2 ? w / 2 - 44 : w / 2 + 20;
      const y = rnd() * (h - 22) + 4;
      const rot = Math.round(rnd() * 40 - 20);
      out += `<span class="deco" style="left:${x}px;top:${y}px;transform:rotate(${rot}deg)">${ICONS[names[i % names.length]]}</span>`;
    }
    return out;
  }

  const base = $('base');
  const lid = $('lid');

  // основание: снаружи
  face(base, W, H, `translateZ(${D / 2}px)`, 'out ribbon-v',
    sprinkle(W, H, 3) + `<div class="tag"><small>${G.boxLabelTop}</small><strong>${G.boxLabel}</strong></div>`);
  face(base, W, H, `rotateY(180deg) translateZ(${D / 2}px)`, 'out ribbon-v shade-1', sprinkle(W, H, 7));
  face(base, D, H, `rotateY(90deg) translateZ(${W / 2}px)`, 'out ribbon-v shade-1', sprinkle(D, H, 11));
  face(base, D, H, `rotateY(-90deg) translateZ(${W / 2}px)`, 'out ribbon-v shade-1', sprinkle(D, H, 13));
  face(base, W, D, `rotateX(-90deg) translateZ(${H / 2}px)`, 'out shade-2');
  // основание: внутри
  face(base, W, H, `rotateY(180deg) translateZ(${-(D / 2 - 1)}px)`, 'in');
  face(base, W, H, `translateZ(${-(D / 2 - 1)}px)`, 'in');
  face(base, D, H, `rotateY(-90deg) translateZ(${-(W / 2 - 1)}px)`, 'in shade-1');
  face(base, D, H, `rotateY(90deg) translateZ(${-(W / 2 - 1)}px)`, 'in shade-1');
  face(base, W, D, `rotateX(90deg) translateZ(${-(H / 2 - 1)}px)`, 'floor');

  // подарки внутри — стоят у задней стенки
  const GH = 66;
  face(base, W - 30, GH, `translate3d(0, ${H / 2 - GH / 2 - 1}px, ${-D / 2 + 12}px)`, 'goodies', `
    <svg viewBox="0 0 206 92" preserveAspectRatio="xMidYMax meet">
      <g transform="translate(14 22)">
        <rect x="0" y="22" width="16" height="48" rx="3" fill="#f2c14e"/><rect x="2" y="2" width="12" height="24" rx="6" fill="#d81b60"/>
      </g>
      <g transform="translate(34 14)">
        <rect x="0" y="28" width="16" height="50" rx="3" fill="#2b2b2b"/><rect x="2" y="4" width="12" height="28" rx="6" fill="#f06292"/>
      </g>
      <g transform="translate(54 26)">
        <rect x="0" y="22" width="16" height="44" rx="3" fill="#f2c14e"/><rect x="2" y="4" width="12" height="22" rx="6" fill="#ad1457"/>
      </g>
      <g transform="translate(82 18)">
        <rect x="0" y="0" width="64" height="74" rx="6" fill="#3a2430"/>
        <rect x="5" y="5" width="54" height="64" rx="4" fill="#f9e5ee"/>
        <rect x="9" y="9" width="14" height="14" rx="3" fill="#f8bbd0"/><rect x="25" y="9" width="14" height="14" rx="3" fill="#e2a37a"/><rect x="41" y="9" width="14" height="14" rx="3" fill="#c97b5a"/>
        <rect x="9" y="25" width="14" height="14" rx="3" fill="#f48fb1"/><rect x="25" y="25" width="14" height="14" rx="3" fill="#8d5b4c"/><rect x="41" y="25" width="14" height="14" rx="3" fill="#ec407a"/>
        <circle cx="32" cy="54" r="10" fill="#f3a6c4"/>
      </g>
      <g transform="translate(152 30)">
        <rect x="8" y="0" width="14" height="10" rx="2" fill="#f2c14e"/>
        <rect x="0" y="10" width="30" height="52" rx="8" fill="#f8bbd0" stroke="#e2337f" stroke-width="2"/>
        <path d="M15 30c-3-4-9-2-8 3 1 4 8 8 8 8s7-4 8-8c1-5-5-7-8-3z" fill="#e2337f"/>
      </g>
      <path d="M0 92c4-22 34-22 38 0z" fill="#f06292"/>
      <path d="M150 92c2-14 26-20 34 0z" fill="#ec407a"/>
      <path d="M180 92c3-18 26-16 26 0z" fill="#f48fb1"/>
    </svg>`);

  // на дне: кассета и разбросанные фото-карточки
  const FLOOR_Y = H / 2 - 1;
  const CASSETTE_SVG = `<svg viewBox="0 0 220 140" aria-hidden="true">
      <defs>
        <linearGradient id="cBody" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff5f9"/><stop offset="1" stop-color="#f7cfe0"/></linearGradient>
        <linearGradient id="cLabel" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#ff8fbf"/><stop offset="1" stop-color="#e2337f"/></linearGradient>
      </defs>
      <rect x="3" y="3" width="214" height="134" rx="14" fill="url(#cBody)" stroke="#e86aa3" stroke-width="3"/>
      <circle cx="16" cy="16" r="3.5" fill="#e86aa3"/><circle cx="204" cy="16" r="3.5" fill="#e86aa3"/>
      <circle cx="16" cy="124" r="3.5" fill="#e86aa3"/><circle cx="204" cy="124" r="3.5" fill="#e86aa3"/>
      <rect x="24" y="14" width="172" height="78" rx="8" fill="url(#cLabel)"/>
      <rect x="30" y="20" width="160" height="16" rx="4" fill="#fff" opacity=".92"/>
      <text class="cassette-text" x="110" y="32.5" text-anchor="middle"></text>
      <rect x="52" y="44" width="116" height="40" rx="20" fill="#3b1a2c"/>
      <rect x="88" y="52" width="44" height="24" rx="3" fill="#6b3a50"/>
      <g class="reel"><circle cx="72" cy="64" r="14" fill="#fff"/><circle cx="72" cy="64" r="5" fill="#3b1a2c"/><path d="M72 52v6M72 70v6M60 64h6M78 64h6" stroke="#3b1a2c" stroke-width="3" stroke-linecap="round"/></g>
      <g class="reel"><circle cx="148" cy="64" r="14" fill="#fff"/><circle cx="148" cy="64" r="5" fill="#3b1a2c"/><path d="M148 52v6M148 70v6M136 64h6M154 64h6" stroke="#3b1a2c" stroke-width="3" stroke-linecap="round"/></g>
      <path d="M46 137 L58 104 H162 L174 137" fill="#f4bcd4" stroke="#e86aa3" stroke-width="3" stroke-linejoin="round"/>
      <circle cx="80" cy="122" r="5" fill="#fff" stroke="#e86aa3" stroke-width="2"/><circle cx="140" cy="122" r="5" fill="#fff" stroke="#e86aa3" stroke-width="2"/>
      <path d="M110 112c-3-4-9-2-8 3 1 4 8 8 8 8s7-4 8-8c1-5-5-7-8-3z" fill="#e2337f"/>
    </svg>`;
  const lying = (x, z, lift, rot) => `translate3d(${x}px, ${FLOOR_Y - lift}px, ${z}px) rotateX(90deg) rotateZ(${rot}deg)`;
  // геометрия предметов на дне — для своего попадания по нажатию:
  // в Safari и Firefox elementFromPoint по 3D-слоям ненадёжен
  const floorItems = [];
  const lay = (el, x, z, lift, rot, w, h) => {
    floorItems.push({ el, x, z, y: FLOOR_Y - lift, rot: rot * Math.PI / 180, w, h, lift });
    return el;
  };
  const cassette3d = lay(face(base, 96, 61, lying(-62, 52, 3, -14), 'cassette3d', CASSETTE_SVG), -62, 52, 3, -14, 96, 61);

  const viewable = G.items.filter((it) => it.src);
  // x, z, наклон — раскладка по дну так, чтобы карточки чуть налезали друг на друга
  const SPOTS = [[30, 58, 12], [84, 22, -10], [-10, 0, 6], [-82, -14, -18], [40, -40, -4], [92, -50, 16], [-50, -52, 10], [0, 70, -6]];
  viewable.forEach((item, i) => {
    const [x, z, r] = SPOTS[i % SPOTS.length];
    const card = face(base, 54, 66, lying(x, z, 4 + i * 1.2, r), 'card3d',
      item.type === 'video'
        ? `<video src="${item.src}#t=0.5" muted playsinline preload="metadata"></video><span class="play">▶</span>`
        : `<img src="${item.src}" alt="" draggable="false">`);
    card.dataset.index = i;
    lay(card, x, z, 4 + i * 1.2, r, 54, 66);
  });

  // крышка
  const cy = -2 + L / 2;
  face(lid, WL, DL, `rotateX(90deg) translateZ(2px)`, 'out ribbon-v ribbon-h shade-top', sprinkle(WL, DL, 21));
  face(lid, WL, DL, `rotateX(-90deg) translateZ(-1px)`, 'lid-inner', `
    <div class="lights"></div>
    <div class="heart-card">
      <svg viewBox="0 0 100 90" preserveAspectRatio="none"><path d="M50 86S4 58 4 28A22 22 0 0 1 50 16a22 22 0 0 1 46 12c0 30-46 58-46 58z" fill="#fff" stroke="#f39bc0" stroke-width="3"/></svg>
      <p>${G.lidMessage}</p>
    </div>`);
  face(lid, WL, L, `translate3d(0, ${cy}px, ${DL / 2}px)`, 'out ribbon-v');
  face(lid, WL, L, `translate3d(0, ${cy}px, ${-DL / 2}px) rotateY(180deg)`, 'out ribbon-v shade-1');
  face(lid, DL, L, `translate3d(${WL / 2}px, ${cy}px, 0) rotateY(90deg)`, 'out ribbon-v shade-1');
  face(lid, DL, L, `translate3d(${-WL / 2}px, ${cy}px, 0) rotateY(-90deg)`, 'out ribbon-v shade-1');
  face(lid, WL, L, `translate3d(0, ${cy}px, ${DL / 2 - 1}px) rotateY(180deg)`, 'in');
  face(lid, WL, L, `translate3d(0, ${cy}px, ${-DL / 2 + 1}px)`, 'in');
  face(lid, DL, L, `translate3d(${WL / 2 - 1}px, ${cy}px, 0) rotateY(-90deg)`, 'in shade-1');
  face(lid, DL, L, `translate3d(${-WL / 2 + 1}px, ${cy}px, 0) rotateY(90deg)`, 'in shade-1');

  // бант — две скрещённые плоскости поверх крышки
  const bowSvg = `<svg viewBox="0 0 140 84" width="140" height="84">
      <path d="M70 52 C50 10 12 0 8 22 C4 42 34 58 70 52Z" fill="#f0609f" stroke="#a3134f" stroke-width="2"/>
      <path d="M70 52 C90 10 128 0 132 22 C136 42 106 58 70 52Z" fill="#f0609f" stroke="#a3134f" stroke-width="2"/>
      <path d="M22 24 C34 22 52 34 64 48" stroke="#c91d68" stroke-width="2" fill="none" opacity=".6"/>
      <path d="M118 24 C106 22 88 34 76 48" stroke="#c91d68" stroke-width="2" fill="none" opacity=".6"/>
      <path d="M64 56 L46 84 L58 80 L64 86 L70 60Z M76 56 L94 84 L82 80 L76 86 L70 60Z" fill="#e2337f" stroke="#a3134f" stroke-width="1.5"/>
      <ellipse cx="70" cy="52" rx="12" ry="11" fill="#e2337f" stroke="#a3134f" stroke-width="2"/>
    </svg>`;
  const bow1 = face(lid, 140, 84, `translate3d(0, ${-2 - 34}px, 0)`, 'bow', bowSvg);
  const bow2 = face(lid, 140, 84, `translate3d(0, ${-2 - 34}px, 0) rotateY(90deg)`, 'bow', bowSvg);
  [bow1, bow2].forEach((b) => { b.style.backfaceVisibility = 'visible'; b.style.webkitBackfaceVisibility = 'visible'; });

  lid.style.transformOrigin = `0 -2px ${-DL / 2}px`;
  const LID_CLOSED = `translateY(${-H / 2}px)`;
  const LID_OPEN = `translateY(${-H / 2}px) rotateX(108deg)`;
  lid.style.transform = LID_CLOSED;

  // ---------- покачивание ----------
  const rig = $('rig');
  const scene = $('scene');
  let state = 'closed';
  let rx = -16, ry = 0, rise = 0;
  let landscape = false;
  // поворот и масштаб, которые задаёт человек мышью или пальцем
  let userRx = 0, userRy = 0, zoom = 1, zoomNow = 1;
  let touched = false, dragging = false;
  let sway = 1;
  const t0 = performance.now();
  function tick(now) {
    const t = (now - t0) / 1000;
    sway += ((touched ? 0.15 : 1) - sway) * 0.02;
    let tx, ty;
    if (state === 'closed') { tx = -16; ty = Math.sin(t * 0.7) * 26 * sway; }
    else { tx = -48; ty = 4 + Math.sin(t * 0.6) * 7 * sway; }
    tx = Math.max(-88, Math.min(30, tx + userRx));
    ty += userRy;
    const k = dragging ? 0.35 : 0.06;
    rx += (tx - rx) * k;
    ry += (ty - ry) * k;
    zoomNow += (zoom - zoomNow) * 0.2;
    // открытая коробка с наклоном уходит вниз — приподнимаем её
    rise += ((state === 'closed' ? 0 : landscape ? 6 : -46) - rise) * 0.06;
    rig.style.transform = `translateY(${rise}px) scale3d(${zoomNow}, ${zoomNow}, ${zoomNow}) rotateX(${rx}deg) rotateY(${ry}deg)`;
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);

  // ---------- вращение и приближение ----------
  const pointers = new Map();
  let moved = false, pinchStart = 0, zoomStart = 1;
  scene.addEventListener('pointerdown', (e) => {
    pointers.set(e.pointerId, { x: e.clientX, y: e.clientY, sx: e.clientX, sy: e.clientY });
    if (pointers.size === 1) { moved = false; dragging = true; }
    if (pointers.size === 2) {
      const [a, b] = [...pointers.values()];
      pinchStart = Math.hypot(a.x - b.x, a.y - b.y);
      zoomStart = zoom;
    }
  });
  scene.addEventListener('pointermove', (e) => {
    const prev = pointers.get(e.pointerId);
    if (!prev) return;
    const cur = { x: e.clientX, y: e.clientY, sx: prev.sx, sy: prev.sy };
    pointers.set(e.pointerId, cur);
    if (pointers.size === 2) {
      const [a, b] = [...pointers.values()];
      zoom = Math.max(0.6, Math.min(2.2, zoomStart * Math.hypot(a.x - b.x, a.y - b.y) / pinchStart));
      moved = true;
      return;
    }
    if (!moved && Math.hypot(cur.x - cur.sx, cur.y - cur.sy) > 6) {
      moved = true;
      touched = true;
      scene.setPointerCapture(e.pointerId);
    }
    if (moved) {
      userRy += (cur.x - prev.x) * 0.45;
      userRx = Math.max(-75, Math.min(45, userRx - (cur.y - prev.y) * 0.35));
    }
  });
  const endPointer = (e) => {
    pointers.delete(e.pointerId);
    if (!pointers.size) dragging = false;
  };
  scene.addEventListener('pointerup', endPointer);
  scene.addEventListener('pointercancel', endPointer);
  scene.addEventListener('wheel', (e) => {
    e.preventDefault();
    zoom = Math.max(0.6, Math.min(2.2, zoom * (e.deltaY < 0 ? 1.1 : 0.9)));
  }, { passive: false });
  scene.addEventListener('dblclick', () => { userRx = 0; userRy = 0; zoom = 1; touched = false; });

  // ---------- фон ----------
  const bokeh = document.querySelector('.bokeh');
  for (let i = 0; i < 22; i++) {
    const el = document.createElement(i % 2 ? 'i' : 'b');
    const size = 8 + Math.random() * 34;
    el.style.left = Math.random() * 100 + 'vw';
    el.style.top = 100 + Math.random() * 10 + 'vh';
    el.style.setProperty('--dx', (Math.random() * 80 - 40) + 'px');
    el.style.animationDuration = 14 + Math.random() * 16 + 's';
    el.style.animationDelay = -Math.random() * 30 + 's';
    if (el.tagName === 'I') { el.style.width = el.style.height = size + 'px'; }
    else { el.textContent = '♥'; el.style.fontSize = size * 0.8 + 'px'; }
    bokeh.appendChild(el);
  }

  // ---------- конфетти ----------
  const cv = $('confetti');
  const ctx = cv.getContext('2d');
  let parts = [];
  let confettiRunning = false;
  function sizeCanvas() {
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    cv.width = innerWidth * dpr; cv.height = innerHeight * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  function confetti(x, y) {
    const colors = ['#e2337f', '#f39bc0', '#f7c948', '#ffffff', '#b39ddb', '#ff80ab', '#80deea'];
    for (let i = 0; i < 170; i++) {
      const a = -Math.PI / 2 + (Math.random() - 0.5) * 1.9;
      const v = 6 + Math.random() * 10;
      parts.push({
        x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v,
        w: 4 + Math.random() * 5, h: 6 + Math.random() * 8,
        r: Math.random() * 6, vr: (Math.random() - 0.5) * 0.4,
        c: colors[i % colors.length], life: 0
      });
    }
    if (!confettiRunning) { confettiRunning = true; requestAnimationFrame(drawConfetti); }
  }
  function drawConfetti() {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    parts = parts.filter((p) => p.y < innerHeight + 30 && p.life < 400);
    for (const p of parts) {
      p.vy += 0.22; p.vx *= 0.985; p.vy *= 0.985;
      p.x += p.vx; p.y += p.vy; p.r += p.vr; p.life++;
      ctx.save();
      ctx.translate(p.x, p.y); ctx.rotate(p.r);
      ctx.scale(1, Math.cos(p.life * 0.15));
      ctx.fillStyle = p.c;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    }
    if (parts.length) requestAnimationFrame(drawConfetti);
    else { confettiRunning = false; ctx.clearRect(0, 0, innerWidth, innerHeight); }
  }

  // ---------- шарики ----------
  const BALLOON_COLORS = ['#e53950', '#f06292', '#f8bbd0', '#ffffff', '#c792ea', '#d4af37', '#ff4f81', '#f48fb1'];
  function balloon(x, y, i) {
    const c = BALLOON_COLORS[i % BALLOON_COLORS.length];
    const heart = i % 3 === 0;
    const s = 52 + Math.random() * 30;
    const el = document.createElement('div');
    el.className = 'balloon';
    const shape = heart
      ? `<path d="M30 66S4 48 4 26A14 14 0 0 1 30 18a14 14 0 0 1 26 8c0 22-26 40-26 40z" fill="${c}"/>`
      : `<ellipse cx="30" cy="34" rx="25" ry="31" fill="${c}"/>`;
    el.innerHTML = `<svg viewBox="0 0 60 130" width="${s}" height="${s * 130 / 60}">
        ${shape}
        <ellipse cx="21" cy="${heart ? 26 : 22}" rx="6" ry="9" fill="#fff" opacity=".45" transform="rotate(-25 21 22)"/>
        <path d="M27 ${heart ? 66 : 64} h6 l-3 5z" fill="${c}"/>
        <path d="M30 70 C24 84 36 96 30 110 S28 124 32 130" stroke="#c9a3b5" stroke-width="1.2" fill="none"/>
      </svg>`;
    if (c === '#ffffff') el.querySelector('svg').style.filter = 'drop-shadow(0 0 1px rgba(160,80,120,.5))';
    el.style.left = x - s / 2 + 'px';
    el.style.top = y - s + 'px';
    document.body.appendChild(el);
    const dx = (Math.random() - 0.5) * innerWidth * 0.7;
    const rise = y + s * 3 + 60;
    const anim = el.animate([
      { transform: 'translate(0,0) scale(.3)', opacity: 0 },
      { transform: `translate(${dx * 0.2}px, -60px) scale(1) rotate(-6deg)`, opacity: 1, offset: 0.12 },
      { transform: `translate(${dx * 0.6}px, ${-rise * 0.55}px) rotate(7deg)`, opacity: 1, offset: 0.6 },
      { transform: `translate(${dx}px, ${-rise}px) rotate(-4deg)`, opacity: 0.9 }
    ], { duration: 4200 + Math.random() * 2400, delay: Math.random() * 700, easing: 'cubic-bezier(.3,.1,.6,1)', fill: 'both' });
    anim.onfinish = () => el.remove();
  }

  // ---------- коробка ----------
  const hint = $('hint');
  const subHint = $('subHint');
  hint.textContent = G.openHint;
  subHint.textContent = G.insideHint;

  function boxTop() {
    const r = scene.getBoundingClientRect();
    return { x: r.left + r.width / 2, y: r.top + r.height * 0.5 };
  }

  function openBox() {
    if (state !== 'closed') return;
    state = 'opening';
    scene.classList.add('open');
    hint.classList.add('off');
    lid.style.transform = LID_OPEN;
    music.autoStart();
    setTimeout(() => {
      const p = boxTop();
      confetti(p.x, p.y);
      for (let i = 0; i < 22; i++) balloon(p.x + (Math.random() - 0.5) * 120, p.y + 20, i);
    }, 450);
    setTimeout(() => {
      state = 'open';
      hint.textContent = G.albumHint;
      hint.classList.remove('off');
      subHint.classList.remove('off');
    }, 2600);
  }

  function closeBox() {
    state = 'closing';
    hint.classList.add('off');
    subHint.classList.add('off');
    lid.style.transform = LID_CLOSED;
    setTimeout(() => scene.classList.remove('open'), 700);
    setTimeout(() => {
      state = 'closed';
      hint.textContent = G.openHint;
      hint.classList.remove('off');
    }, 1300);
  }

  function onSceneActivate() {
    if (state === 'closed') openBox();
    else if (state === 'open') openAlbum();
  }
  // Проекция точки из координат основания коробки на экран — повторяет
  // CSS-цепочку: rig (scale3d · rotateX · rotateY) → perspective сцены → scale(--s).
  function project(px, py, pz) {
    const a = ry * Math.PI / 180, b = rx * Math.PI / 180;
    const x1 = px * Math.cos(a) + pz * Math.sin(a);
    const z1 = -px * Math.sin(a) + pz * Math.cos(a);
    const y2 = py * Math.cos(b) - z1 * Math.sin(b);
    const z2 = py * Math.sin(b) + z1 * Math.cos(b);
    const X = rig.offsetLeft + x1 * zoomNow, Y = rig.offsetTop + rise + y2 * zoomNow, Z = z2 * zoomNow;
    const [ox, oy] = getComputedStyle(scene).perspectiveOrigin.split(' ').map(parseFloat);
    const f = 1100 / (1100 - Z);
    const r = scene.getBoundingClientRect();
    return [r.left + (ox + (X - ox) * f) * (r.width / scene.offsetWidth),
            r.top + (oy + (Y - oy) * f) * (r.height / scene.offsetHeight)];
  }
  function pickFloorItem(cx, cy) {
    const hits = floorItems.filter((it) => {
      const c = Math.cos(it.rot), s = Math.sin(it.rot);
      const q = [[-1, -1], [1, -1], [1, 1], [-1, 1]].map(([u, v]) => {
        u *= it.w / 2; v *= it.h / 2;
        return project(it.x + u * c - v * s, it.y, it.z + u * s + v * c);
      });
      // точка внутри выпуклого четырёхугольника: одинаковый знак всех векторных произведений
      let sign = 0;
      for (let i = 0; i < 4; i++) {
        const [x1, y1] = q[i], [x2, y2] = q[(i + 1) % 4];
        const cr = (x2 - x1) * (cy - y1) - (y2 - y1) * (cx - x1);
        if (cr === 0) continue;
        if (sign && Math.sign(cr) !== sign) return false;
        sign = Math.sign(cr);
      }
      return true;
    });
    hits.sort((p, q) => q.lift - p.lift);
    return hits[0] && hits[0].el;
  }

  scene.addEventListener('click', (e) => {
    if (moved) { moved = false; return; }
    if (state === 'open' || state === 'opening') {
      const el = pickFloorItem(e.clientX, e.clientY) || e.target.closest('.card3d, .cassette3d');
      if (el && el.classList.contains('card3d')) { openViewer(+el.dataset.index, el); return; }
      if (el) { music.toggle(); return; }
    }
    onSceneActivate();
  });
  scene.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSceneActivate(); }
  });
  hint.addEventListener('click', onSceneActivate);

  // ---------- альбом ----------
  const album = $('album');
  const tiles = $('tiles');
  const msg = $('albumMsg');
  $('albumBadge').textContent = G.albumBadge;
  $('albumTitle').textContent = G.albumTitle;
  $('albumSub').textContent = G.albumSubtitle;
  $('rainBtn').textContent = G.rainButton;

  const FRONTS = [
    ['#f6c9d9', '🌸'], ['#ecd3a9', '✨'], ['#7a4a26', '👑'],
    ['#ecdbe3', '🌷'], ['#a8692f', '🧸'], ['#d81b74', '💕']
  ];
  const PH_COLORS = [['#ffd1e3', '#f48fb1'], ['#ffe9c7', '#e9b97a'], ['#f3d9ff', '#c792ea'], ['#ffdde6', '#ef6f97'], ['#e9d3c4', '#b07a55'], ['#ffc4d6', '#e2337f']];

  function placeholder(i) {
    const [a, b] = PH_COLORS[i % PH_COLORS.length];
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 108"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs><rect width="120" height="108" fill="url(#g)"/><path d="M60 78S34 62 34 46a12 12 0 0 1 26-6 12 12 0 0 1 26 6c0 16-26 32-26 32z" fill="#fff" opacity=".85"/><text x="60" y="98" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="700" fill="#fff">Фото ${i + 1}</text></svg>`;
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  }

  function buildTiles() {
    tiles.innerHTML = '';
    G.items.forEach((item, i) => {
      const [bg, icon] = FRONTS[i % FRONTS.length];
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'tile';
      btn.setAttribute('aria-label', 'Открыть карточку ' + (i + 1));
      let back;
      if (item.type === 'video' && item.src) {
        back = `<video src="${item.src}" muted loop playsinline preload="metadata"></video><span class="play">▶</span>`;
      } else {
        back = `<img src="${item.src || placeholder(i)}" alt="" loading="lazy">`;
      }
      btn.innerHTML = `<div class="tile-inner"><div class="tile-front" style="background:${bg}">${icon}</div><div class="tile-back">${back}</div></div>`;
      btn.addEventListener('click', () => onTile(btn, item));
      tiles.appendChild(btn);
    });
  }

  function showMsg(text) {
    msg.classList.add('fade');
    setTimeout(() => { msg.textContent = text; msg.classList.remove('fade'); }, 220);
  }

  function onTile(btn, item) {
    const video = btn.querySelector('video');
    if (!btn.classList.contains('flipped')) {
      btn.classList.add('flipped');
      if (video) video.play().catch(() => {});
      if (item.text) showMsg(item.text);
      return;
    }
    if (item.src) openViewer(viewable.indexOf(item), btn);
    else { btn.classList.remove('flipped'); }
  }

  function openAlbum() {
    if (state !== 'open') return;
    state = 'album';
    buildTiles();
    msg.textContent = G.albumIntro;
    album.hidden = false;
    album.classList.remove('closing');
  }

  function closeAlbum() {
    album.classList.add('closing');
    album.querySelectorAll('video').forEach((v) => v.pause());
    setTimeout(() => { album.hidden = true; album.classList.remove('closing'); closeBox(); }, 300);
  }
  $('albumClose').addEventListener('click', closeAlbum);
  album.addEventListener('click', (e) => { if (e.target === album) closeAlbum(); });

  // ---------- просмотр фото/видео ----------
  const lightbox = $('lightbox');
  const lightboxBody = $('lightboxBody');
  const dots = $('lightboxDots');
  let resumeMusic = false;
  let viewIdx = 0;
  let current = null;   // текущий полароид
  let busy = false;
  const TURN = 'cubic-bezier(.45, .05, .25, 1)';

  function makeSlide(i) {
    const item = viewable[i];
    const el = document.createElement('div');
    el.className = 'slide';
    const media = item.type === 'video'
      ? `<video src="${item.src}" controls playsinline></video>`
      : `<img src="${item.src}" alt="" draggable="false">`;
    el.innerHTML = `<div class="slide-photo">${media}</div>${item.text ? `<p class="slide-text">${item.text}</p>` : ''}<span class="slide-num">${i + 1} / ${viewable.length}</span><i class="slide-shade"></i>`;
    lightboxBody.appendChild(el);
    return el;
  }
  async function ready(el) {
    const img = el.querySelector('img');
    if (img) await img.decode().catch(() => {});
  }
  function onShown(el) {
    const v = el.querySelector('video');
    if (v) {
      if (music.isPlaying()) { resumeMusic = true; music.pause(); }
      v.play().catch(() => {});
    }
  }
  function syncDots() {
    [...dots.children].forEach((d, i) => d.classList.toggle('on', i === viewIdx));
  }

  async function openViewer(i, fromEl) {
    if (!viewable.length || busy) return;
    busy = true;
    viewIdx = i;
    lightboxBody.innerHTML = '';
    dots.innerHTML = viewable.map((_, k) => `<button type="button" aria-label="Фото ${k + 1}"></button>`).join('');
    lightbox.classList.toggle('single', viewable.length < 2);
    lightbox.hidden = false;
    current = makeSlide(i);
    syncDots();
    await ready(current);
    // фото вылетает из того места, где лежала карточка
    const to = current.getBoundingClientRect();
    let from = 'translate(0, 40px) scale(.7) rotate(-6deg)';
    if (fromEl) {
      const r = fromEl.getBoundingClientRect();
      const sx = r.width / to.width;
      from = `translate(${r.left + r.width / 2 - (to.left + to.width / 2)}px, ${r.top + r.height / 2 - (to.top + to.height / 2)}px) scale(${Math.max(sx, 0.08)}) rotate(-12deg)`;
    }
    lightbox.animate([{ backgroundColor: 'rgba(40,6,22,0)' }, { backgroundColor: 'rgba(40,6,22,.82)' }], { duration: 500, easing: 'ease' });
    await current.animate([
      { transform: from, opacity: 0.6 },
      { transform: 'translate(0,-12px) scale(1.03) rotate(2deg)', opacity: 1, offset: 0.7 },
      { transform: 'none', opacity: 1 }
    ], { duration: 750, easing: 'cubic-bezier(.2,.8,.3,1)' }).finished;
    onShown(current);
    busy = false;
  }

  // Листание как страница книги: next — текущая страница уходит, поворачиваясь
  // вокруг левого края; prev — предыдущая возвращается на место тем же путём.
  async function stepViewer(d, fromAngle = 0) {
    if (busy || viewable.length < 2) return;
    busy = true;
    const old = current;
    old.querySelector('video')?.pause();
    viewIdx = (viewIdx + d + viewable.length) % viewable.length;
    const next = makeSlide(viewIdx);
    current = next;
    syncDots();
    await ready(next);
    const dur = 850 * (1 - Math.abs(fromAngle) / 120);
    let anims;
    if (d > 0) {
      old.style.zIndex = 2;
      next.style.zIndex = 1;
      anims = [
        old.animate([
          { transform: `rotateY(${fromAngle}deg)` },
          { transform: 'rotateY(-60deg) translateZ(40px)', offset: 0.5 },
          { transform: 'rotateY(-120deg) translateZ(20px)', opacity: 0 }
        ], { duration: dur, easing: TURN }),
        old.querySelector('.slide-shade').animate([{ opacity: 0 }, { opacity: 0.45 }], { duration: dur, easing: TURN, fill: 'forwards' }),
        next.animate([{ transform: 'scale(.9)', opacity: 0.3 }, { transform: 'none', opacity: 1 }], { duration: dur, easing: TURN })
      ];
    } else {
      old.style.zIndex = 1;
      next.style.zIndex = 2;
      anims = [
        next.animate([
          { transform: `rotateY(${-120 + fromAngle}deg) translateZ(20px)`, opacity: 0 },
          { transform: 'rotateY(-60deg) translateZ(40px)', opacity: 1, offset: 0.5 },
          { transform: 'none', opacity: 1 }
        ], { duration: dur, easing: TURN }),
        next.querySelector('.slide-shade').animate([{ opacity: 0.45 }, { opacity: 0 }], { duration: dur, easing: TURN }),
        old.animate([
          { transform: `rotateY(${fromAngle}deg)` },
          { transform: 'scale(.9)', opacity: 0.2 }
        ], { duration: dur, easing: TURN, fill: 'forwards' })
      ];
    }
    await Promise.all(anims.map((a) => a.finished));
    old.remove();
    next.style.zIndex = '';
    onShown(next);
    busy = false;
  }

  async function closeLightbox() {
    if (busy) return;
    busy = true;
    current?.querySelector('video')?.pause();
    await Promise.all([
      current?.animate([{ transform: 'none', opacity: 1 }, { transform: 'translateY(40px) scale(.8) rotate(4deg)', opacity: 0 }], { duration: 320, easing: 'ease-in', fill: 'forwards' }).finished,
      lightbox.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 340, fill: 'forwards' }).finished
    ]);
    lightbox.getAnimations().forEach((a) => a.cancel());
    lightbox.hidden = true;
    lightboxBody.innerHTML = '';
    current = null;
    busy = false;
    if (resumeMusic) { music.play(); resumeMusic = false; }
  }
  $('lightboxClose').addEventListener('click', closeLightbox);
  $('lightboxPrev').addEventListener('click', () => stepViewer(-1));
  $('lightboxNext').addEventListener('click', () => stepViewer(1));
  dots.addEventListener('click', (e) => {
    const k = [...dots.children].indexOf(e.target);
    if (k >= 0 && k !== viewIdx) stepViewer(k > viewIdx ? 1 : -1);
  });
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });

  // страницу можно тянуть пальцем
  let swipe = null;
  lightboxBody.addEventListener('pointerdown', (e) => {
    if (busy || !current || viewable.length < 2 || e.target.closest('video')) return;
    swipe = { x: e.clientX, w: current.offsetWidth, angle: 0 };
    lightboxBody.setPointerCapture(e.pointerId);
  });
  lightboxBody.addEventListener('pointermove', (e) => {
    if (!swipe) return;
    const dx = e.clientX - swipe.x;
    if (dx < 0) {
      swipe.angle = Math.max(-100, (dx / swipe.w) * 140);
      current.style.transform = `rotateY(${swipe.angle}deg)`;
    } else {
      swipe.angle = 0;
      current.style.transform = `translateX(${dx * 0.35}px) rotate(${dx * 0.02}deg)`;
    }
    swipe.dx = dx;
  });
  const endSwipe = () => {
    if (!swipe) return;
    const { dx = 0, angle } = swipe;
    swipe = null;
    const was = current.style.transform;
    current.style.transform = '';
    if (dx < -50) stepViewer(1, angle);
    else if (dx > 50) stepViewer(-1);
    else if (was) current.animate([{ transform: was }, { transform: 'none' }], { duration: 300, easing: 'cubic-bezier(.3,1.6,.5,1)' });
  };
  lightboxBody.addEventListener('pointerup', endSwipe);
  lightboxBody.addEventListener('pointercancel', endSwipe);
  document.addEventListener('keydown', (e) => {
    if (!lightbox.hidden) {
      if (e.key === 'Escape') closeLightbox();
      else if (e.key === 'ArrowRight') stepViewer(1);
      else if (e.key === 'ArrowLeft') stepViewer(-1);
    } else if (e.key === 'Escape' && !album.hidden) closeAlbum();
  });

  // ---------- дождь из сердец ----------
  const rain = $('heartsRain');
  $('rainBtn').addEventListener('click', () => {
    const glyphs = ['♥', '💗', '💕', '💖', '♥', '💓'];
    for (let i = 0; i < 60; i++) {
      const s = document.createElement('span');
      s.textContent = glyphs[i % glyphs.length];
      s.style.left = Math.random() * 100 + 'vw';
      s.style.fontSize = 14 + Math.random() * 26 + 'px';
      s.style.color = ['#e2337f', '#f06292', '#ff80ab'][i % 3];
      s.style.setProperty('--dx', (Math.random() * 120 - 60) + 'px');
      s.style.setProperty('--rot', (Math.random() * 360 - 180) + 'deg');
      s.style.animationDuration = 2.6 + Math.random() * 2.6 + 's';
      s.style.animationDelay = Math.random() * 1.6 + 's';
      s.addEventListener('animationend', () => s.remove());
      rain.appendChild(s);
    }
  });

  // ---------- кассета ----------
  const music = (() => {
    const tracks = G.music || [];
    const bar = $('musicBar');
    const audio = $('audio');
    const title = $('trackTitle');
    const label = cassette3d.querySelector('.cassette-text');
    let idx = 0;
    let started = false;

    function wiggle() {
      cassette3d.classList.remove('wiggle');
      void cassette3d.offsetWidth;
      cassette3d.classList.add('wiggle');
    }
    if (!tracks.length) {
      label.textContent = G.cassetteLabel || 'Для тебя';
      return { autoStart() {}, pause() {}, play() {}, toggle: wiggle, isPlaying: () => false };
    }

    if (tracks.length === 1) { bar.classList.add('single'); audio.loop = true; }

    function load(i) {
      idx = (i + tracks.length) % tracks.length;
      audio.src = tracks[idx].src;
      title.textContent = tracks[idx].title || 'Наша музыка';
      label.textContent = title.textContent.split(' — ').pop();
    }
    function play() {
      started = true;
      bar.hidden = false;
      audio.play().catch(() => {});
    }
    function pause() { audio.pause(); }
    function sync() {
      const on = !audio.paused;
      cassette3d.classList.toggle('playing', on);
      $('playToggle').textContent = on ? '⏸' : '▶';
      $('playToggle').setAttribute('aria-label', on ? 'Пауза' : 'Играть');
    }
    audio.addEventListener('play', sync);
    audio.addEventListener('pause', sync);
    audio.addEventListener('ended', () => { if (!audio.loop) { load(idx + 1); play(); } });

    const toggle = () => { wiggle(); audio.paused ? play() : pause(); };
    $('playToggle').addEventListener('click', toggle);
    $('prevTrack').addEventListener('click', () => { load(idx - 1); play(); });
    $('nextTrack').addEventListener('click', () => { load(idx + 1); play(); });
    load(0);

    return {
      autoStart() { if (G.musicStartsOnOpen && !started) play(); },
      pause,
      play,
      toggle,
      isPlaying: () => !audio.paused
    };
  })();

  // ---------- масштаб под экран ----------
  function fit() {
    // открытая коробка с поднятой крышкой шире и выше, чем закрытая, — запас по краям
    landscape = innerWidth > innerHeight && innerHeight <= 500;
    const availW = landscape ? innerWidth - 32 - 230 : innerWidth - 24;
    const availH = landscape ? innerHeight - 8 : innerHeight - 24 - 90 - 64;
    const s = Math.max(0.4, Math.min(1.4, availW / 470, availH / (landscape ? 540 : 440)));
    document.documentElement.style.setProperty('--s', s.toFixed(3));
    sizeCanvas();
  }
  addEventListener('resize', fit);
  fit();
})();
